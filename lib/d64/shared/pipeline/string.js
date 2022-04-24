import { Blaze } from '@cli-blaze/decors'
import { createWriteStream } from 'fs'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { pipeline } from 'node:stream/promises'
import { base64, utf8 } from '../transform/encoding.js'
import { deflate, inflate } from '../transform/compression.js'
import { resolvers, string_ } from 'oftypes'

export const quiet = [ ]

/**
 * Prints to stdout/transform the data
 *
 * @param {string} data - given
 * @yields
 * @returns {AsyncGenerator<*, void, *>}
 */
async function* stdout( data ){
    for await ( const chunk of data ) {
        if( quiet[ 0 ] === false )
            console.log( `${ chunk }` )
        yield chunk
    }
}

/**
 * Deflate64 Pipeline
 * - Decode and Decompress data pipeline.
 * - Encode and Compress data pipeline.
 *
 * @param {string} data - given string
 * @param {string} action - decode/encode
 * @param {string|undefined} save - path/filename
 */
export async function string( data, action, save ){

    /**
     * Pipeline for --string
     *
     * @param {BufferEncoding} encoding - for string to Buffer
     * @param {AsyncGenerator<Promise<CompressCallback>, void, void>} compression - inflate/deflate
     * @param {AsyncGenerator<Promise<string>, void, string>} render - uft8/base64
     * @returns {Promise<void>}
     */
    async function pipe ( encoding, compression, render ){

        const truthy = async () => {

            await pipeline(
                Buffer.from( data, encoding ),
                compression,
                render,
                stdout,
                createWriteStream( save )
            ).catch( error => exit( error.message ) )
        }

        const falsy = async () => {

            await pipeline(
                Buffer.from( data, encoding ),
                compression,
                render,
                stdout
            ).catch( error => exit( error.message ) )
        }

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
