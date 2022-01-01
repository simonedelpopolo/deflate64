import { entryPoint, entryPointSymbol  } from './lib/d64/exporter.js'

/**
 * Deflate 64 entry point.
 *
 * @public
 * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and executable.js.
 * @returns {Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
 */
export default function deflate64( argv ){
    
    return  entryPoint[ entryPointSymbol ]( argv )
}
