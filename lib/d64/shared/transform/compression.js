import * as zlib from 'node:zlib'
import { default as calculate_ratio } from './calculate_ratio.js'
import option from '../option.js'
import { promisify } from 'node:util'
import { default as ratio } from '../../ratio.js'

/**
 * Compress the given data
 *
 * @param {Buffer} data - to compress
 * @yields
 * @returns {Promise<CompressCallback>|Promise<Buffer>}
 */
export async function* deflate( data ){

    const resultant = option.no_compression
        ? data
        : await promisify( zlib.deflate )( data )

    if( option.ratio ) {
        ratio.data.out = Buffer.byteLength( resultant )
        calculate_ratio()
    }
    yield resultant
}

/**
 * Decompress the given data
 *
 * @param {Buffer} data - to decompress
 * @yields
 * @returns {Promise<CompressCallback>|Promise<Buffer>}
 */
export async function* inflate( data ){

    const resultant = option.no_compression
        ? data
        : await promisify( zlib.inflate )( data )

    if( option.ratio ) {
        ratio.data.out = Buffer.byteLength( resultant )
        calculate_ratio()
    }

    yield resultant
}
