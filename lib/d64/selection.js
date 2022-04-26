import { d64pipeline } from './shared/d64pipeline.js'
import option from './shared/option.js'

/**
 * Deflate64 job action
 *
 * @param {string} action - encode/decode
 * @param {d64Options} options - given flag
 * @returns {Promise<void>}
 */
export async function selection ( action, options ){

    Object.assign( option, options )
    await d64pipeline( action )
}
