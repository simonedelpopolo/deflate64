import {
    arguments__,
    compression__,
    decode__,
    encode__,
    entryPoint__,
    flag__,
    help__,
    remote__,
    version__,
} from './lib/d64/exporter.js'

/**
 * The deflate64 entry point and default exported function.
 *
 * @public
 * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and executable.js.
 * @returns {Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
 */
export default function deflate64( argv ){
    
    return  entryPoint__( argv )
}

/**
 * The d64 entry point and exported function.
 *
 * @public
 * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and executable.js.
 * @returns {any|Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
 */
export function d64( argv ){
    
    return  entryPoint__( argv )
}

/**
 * It checks if process.argv is valid and not empty and set properly the necessary variable to be dispatched to the right function in the right way.
 *
 * @param {string[]} argv - The give process.argv {string[]}.
 * @returns {Promise|{command: string, flags: (string[]|boolean), command_help: string }}
 */
export async function arguments_( argv ){
    return arguments__( argv )
}

/**
 * Decode the given string/file and execute the flags action.
 *
 * @param {{[p:string]: string}} flags - The flags after flagRipper.
 * @returns {Promise<void>}
 */
export async function decode( flags ){
    return decode__( flags )
}

/**
 * Encode the given string/file and execute the flags action.
 *
 * @param {{[p:string]: string}} flags - The flags after flagRipper.
 * @returns {Promise<void>}
 */
export async function encode( flags ){
    return encode__( flags )
}

/**
 * Handles the flags and return an object.
 *
 * @param {string[]} flags - The parsed process.argv.
 * @returns {Promise | PromiseFulfilledResult<{[p: string]: string} | PromiseRejectedResult<{[error:string]:string, [error:string]:string[]}>>}
 */
export async function flag( flags ){
    return flag__( flags )
}

/**
 * Get help for the usage of d64.
 *
 * @param {string=} command - The command to get help for.
 * @param {string=} flag - The flag to get help for.
 * @returns {Promise<void>}
 */
export async function help( command, flag ){
    return help__( command, flag )
}

/**
 * The compression property defines if the compression should be applied, and it shows the compression ratio if requested.
 *
 * @returns {object}
 */
export function compression(){
    return compression__()
}

/**
 * It will handle the connection for the remote flag.
 *
 * @param {string} url - The gives options argument.
 * @returns {string | Promise<string>}
 */
export async function remote( url ){
    return remote__( url )
}

export const version = version__
