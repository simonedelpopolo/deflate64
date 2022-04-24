import { d64line } from './shared/d64line.js'
import { default as json_option } from './shared/json_option.js'
import { default as no_compression_option } from './shared/no_compression_option.js'
import { default as quiet_option } from './shared/quiet_option.js'
import remote_option from './shared/remote_option.js'
import { default as string_option  } from './shared/string_option.js'

/**
 * Deflate64 job action
 *
 * @param {string} action - encode/decode
 * @param {object} options - given flag
 * @returns {Promise<void>}
 */
export async function selection ( action, options ){

    no_compression_option[ 0 ] = options.no_compression
    quiet_option[ 0 ] = options.quiet
    json_option[ 0 ] = options.json
    remote_option[ 0 ] = options.remote
    string_option[ 0 ] = options.string

    await d64line( action, options.save )
}
