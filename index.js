import { entryPoint, entryPointSymbol  } from './lib/d64/exporter.js'

/**
 * The deflate64 entry point and default exported function.
 *
 * @public
 * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and executable.js.
 * @returns {Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
 */
export default function deflate64( argv ){
    
    return  entryPoint[ entryPointSymbol ]( argv )
}

/**
 * The d64 entry point and exported function.
 *
 * @public
 * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and executable.js.
 * @returns {Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
 */
export function d64( argv ){
    
    return  entryPoint[ entryPointSymbol ]( argv )
}
