import { entryPoint, entryPointSymbol  } from './lib/d64/exporter.js'

//Object.freeze( d64 )

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

/**
 * The entry point to deflate64.
 *
 * @param {string[]} argv - The process.argv.splice( 0, 2 ).
 * @returns {Promise<void>}
 */
/* An
export default async function deflate64( argv ) {


}*/
