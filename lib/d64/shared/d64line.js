import { Blaze } from '@cli-blaze/decors'
import { createWriteStream } from 'fs'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { pipeline } from 'node:stream/promises'
import { default as quiet_option } from './quiet_option.js'
import remote from '../remote.js'
import remote_option from './remote_option.js'
import string_option from './string_option.js'
import { base64, utf8 } from './transform/encoding.js'
import { deflate, inflate } from './transform/compression.js'
import { json_map, default as json_option } from './json_option.js'
import { resolvers, string_ } from 'oftypes'

/**
 * Prints to stdout/transform the data
 *
 * @param {string} data - given
 * @yields
 * @returns {AsyncGenerator<*, void, *>}
 */
async function* string( data ){
    for await ( const chunk of data ) {
        if( quiet_option[ 0 ] === false )
            console.log( `${ chunk }` )
        yield chunk
    }
}

/**
 * Prints to stdout/transform the data
 *
 * @param {string} data - given
 * @yields
 * @returns {AsyncGenerator<*, void, *>}
 */
async function* json( data ){
    for await ( const chunk of data ) json_map[ 0 ][ json_map[ 0 ].map ] += chunk
    if( quiet_option[ 0 ] === false )
        console.log( json_map[ 0 ] )

    yield JSON.stringify( json_map[ 0 ] )
}

/**
 * Deflate64 Pipeline
 * - Decode and Decompress data pipeline.
 * - Encode and Compress data pipeline.
 *
 * @param {string} action - decode/encode
 * @param {string|undefined} save - path/filename
 */
export async function d64line( action, save ){

    /**
     * Pipeline
     *
     * @param {BufferEncoding} encoding - for string to Buffer
     * @param {AsyncGenerator<Promise<CompressCallback>, void, void>} compression - inflate/deflate
     * @param {AsyncGenerator<Promise<string>, void, string>} render - uft8/base64
     * @returns {Promise<void>}
     */
    async function pipe ( encoding, compression, render ){

        // - default set to string
        let type = string
        let data = string_option[ 0 ]

        // - --remote is given string is overridden
        if( remote_option[ 0 ] )
            data = await remote( remote_option[ 0 ] )

        // - --json is given as string and string is overridden
        if( json_option[ 0 ] === false ) {
            data = json_map[ 0 ][ json_map[ 0 ].map ]
            json_map[ 0 ][ json_map[ 0 ].map ] = ''
            type = json
        // - --json is given void string is taken and saved in the d64 json default format
        }else if( json_option[ 0 ] === true ) {
            json_map[ 0 ] = { map: 'data', data: '' }
            type = json
        }

        const truthy = async () => {

            await pipeline(
                Buffer.from( data, encoding ),
                compression,
                render,
                type,
                createWriteStream( save )
            ).catch( error => exit( error.message ) )
        }

        const falsy = async () => {

            await pipeline(
                Buffer.from( data, encoding ),
                compression,
                render,
                type
            ).catch( error => exit( error.message ) )
        }

        // - is --save is set will save the file else will just output the result
        await ( await ( string_( save, await resolvers( truthy, falsy ) ) ) )()
    }

    switch ( action ) {

        case 'encode': {
            await pipe( 'utf8', deflate, base64 )
        }
            break
        case 'decode':
            await pipe( 'base64', inflate, utf8 )
            break
        default:
            exit( `unknown action -> ${Blaze.red( action )}`, new ReferenceError( 'string pipeline error ♠︎' ), error_code.UNKNOWN )
    }
}
