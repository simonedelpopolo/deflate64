import { default as no_compression_options } from '../no_compression_option.js'
import { promisify } from 'node:util'
import { deflate as deflate_, inflate as inflate_ } from 'node:zlib'

/**
 * Compress the given data
 *
 * @param {Buffer} data - to compress
 * @yields
 * @returns {Promise<CompressCallback>|Promise<Buffer>}
 */
export async function* deflate( data ){
    if( no_compression_options[ 0 ] === false )
        yield promisify( deflate_ )( data )
    else
        yield data
}

/**
 * Decompress the given data
 *
 * @param {Buffer} data - to decompress
 * @yields
 * @returns {Promise<CompressCallback>|Promise<Buffer>}
 */
export async function* inflate( data ){
    if( no_compression_options[ 0 ] === false )
        yield promisify( inflate_ )( data )
    else
        yield data
}
