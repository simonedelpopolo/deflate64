import { createWriteStream } from 'fs'
import { exit } from '@cli-blaze/activity'
import json_data from '../json.js'
import option from './option.js'
import { pipeline } from 'node:stream/promises'
import ratio from '../ratio.js'
import remote from '../remote.js'
import { string_ } from 'oftypes'
import toString from '../file.js'
import { base64, utf8 } from './transform/encoding.js'
import { deflate, inflate } from './transform/compression.js'

export const d64_data = { returns: '' }

/**
 * Prints to stdout/transform the data
 *
 * @param {string} data - given
 * @yields
 * @returns {AsyncGenerator<*, void, *>}
 */
async function* string( data ){
    for await ( const chunk of data ) {

        if( option.quiet === false && option.ejected === false ) {
            if ( option.ratio ) {
                console.log( {
                    data: chunk,
                    ratio: ratio.data,
                } )
            } else console.log( `${ chunk }` )
        }

        if( option.ratio ){
            d64_data.returns = JSON.stringify( {
                data: chunk,
                ratio: ratio.data,
            } )
        }
        else d64_data.returns += chunk

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
    for await ( const chunk of data ) json_data.ref[ json_data.ref.map ] += chunk

    if( option.quiet === false && option.ejected === false ) {
        if( option.ratio ) {
            console.log( {
                data: json_data.ref[ json_data.ref.map ],
                ratio: ratio.data,
            } )
        }else console.log( json_data.ref )
    }

    if( option.ratio ){
        d64_data.returns = JSON.stringify( {
            data: json_data.ref,
            ratio: ratio.data,
        } )
    }
    else d64_data.returns = JSON.stringify( json_data.ref )

    yield JSON.stringify( json_data.ref )
}

/**
 * Deflate64 Pipeline
 * - Decode and Decompress data pipeline.
 * - Encode and Compress data pipeline.
 *
 * @param {string} action - decode/encode
 */
export async function d64pipeline( action ){

    // - default set to string
    let type = string
    let data = option.string
    let json_from_file = false

    const { compression, encoding, render } = action === 'encode'
        ? { compression: deflate, encoding: 'utf8', render: base64 }
        : { compression: inflate, encoding: 'base64', render: utf8 }

    if( await string_( option.file ) && option.json === false ) {
        json_from_file = true
        await toString( option.file )
    }

    // - --remote is given string is overridden
    if( option.remote )
        data = await remote( option.remote )

    // - --json is given as string and string is overridden
    if( option.json === false ) {

        data = json_data.ref[ json_data.ref.map ]
        json_data.ref[ json_data.ref.map ] = ''

        if( option.plain ) type = string
        else type = json

        // - --json is given void string is taken and saved in the d64 json default format
    }else if( option.json === true ) {
        json_data.ref = { map: 'data', data: '' }
        type = json
    }

    let buffer
    // - --file is given string is overridden
    if( await string_( option.file ) && ! json_from_file ) buffer = await toString( option.file )
    else buffer = Buffer.from( data, encoding )

    if ( option.ratio )
        ratio.data.in = Buffer.byteLength( buffer )

    await pipeline(
        buffer,
        compression,
        render,
        type,
        await string_( option.save )
            ? createWriteStream( option.save )
            : Promise.resolve( true )
    ).catch( error => exit( error.message ) )

}
