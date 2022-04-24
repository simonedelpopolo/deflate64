import { no_compression } from './shared/transform/compression.js'
import remote from './remote.js'
import { quiet, string } from './shared/pipeline/string.js'

/**
 * - ok
 *
 * @param {Object}options - given
 */
export async function decode( options ){
    no_compression[ 0 ] = options.no_compression
    quiet[ 0 ] = options.quiet
    if( options.remote )
        options.string = await remote( options.remote )
    await string( options.string, 'decode', options.save )
}
