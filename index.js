import * as Module from 'module'
import { array_ } from 'oftypes'
import decode from './lib/decode.js'
import encode from './lib/encode.js'
import { options } from './lib/options.js'
import { parameters } from './lib/parameters.js'
import help, { version } from './lib/help.js'

/**
 * @private
 */
const argv__ = {

    /**
     * Type checker for the argv argument.
     *
     * @param {any} given_argv - The given argument `argv`.
     * @returns {Promise | PromiseFulfilledResult<true> | PromiseRejectedResult<string>}
     */
    types: async ( given_argv ) => {

        const messageReject = '[d64-TypeError] Only type of array is accepted for argument `argv`.'
        
        const checkArray = await array_( given_argv )
        
        if( checkArray === false ){
            const error = `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof given_argv }}\x1b[0m -> \x1b[31m ${JSON.stringify( given_argv )}\x1b[0m \n\n`
            process.stderr.write( `${error}` )
            process.exit( 1 )
        }
    },
    
    /**
     * Arguments length.
     *
     * @param {string[]} argv - The give argv argument.
     * @returns {Promise<void>}
     */
    length: async ( argv ) => {
        if( argv.length === 0 )
            help()
    }

}
/**
 * @type {Module}
 */
const d64 = Object.create( Module )

/**
 * @type {symbol}
 */
const entryPoint = Symbol( 'Deflate 64 entry point.' )
Object.defineProperty( d64, entryPoint, {
    enumerable: true,
    configurable: false,
    writable: false,
    
    /**
     * Deflate 64 entry point.
     *
     * @public
     * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and executable.js.
     * @returns {Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
     */
    value: async function entryPoint( argv ){

        await argv__.types( argv )
        await argv__.length( argv )
        const { command, flags, command_help } = parameters( argv )
    
        switch ( command ) {
        
            case 'help': {
            
                let flag = undefined
                if ( typeof flags !== 'undefined' )
                    flag = flags === false ? undefined : flags[ 0 ]
            
                help( command_help, flag )
            
                break
            }
        
            case 'encode': {
            
                if ( typeof flags !== 'undefined' && flags.length > 0 ) {
                
                    const flagsObject = await options( flags )
                        .then( object => object )
                        .catch( reason => {
                            help( undefined, 'list-available' )
                            console.error( '\x1b[31m', `  ${ reason.message }\n` )
                            console.error( `  given flags: ${ JSON.stringify( reason.flags ) }\n`, '\x1b[0m' )
                            process.exit( 1 )
                        } )
                
                    await encode( flagsObject )
                
                    break
                }
            
                break
            
            }
        
            case 'decode': {
            
                if ( typeof flags !== 'undefined' && flags.length > 0 ) {
                
                    const flagsObject = await options( flags )
                        .then( object => object )
                        .catch( reason => {
                            help( undefined, 'list-available' )
                            console.error( '\x1b[31m', `  ${ reason.message }\n` )
                            console.error( `  given flags: ${ JSON.stringify( reason.flags ) }\n`, '\x1b[0m' )
                            process.exit( 1 )
                        } )
                
                    await decode( flagsObject )
                
                    break
                }
            
                break
            
            }
        
            case 'version': {
            
                console.log( `${version}` )
            
                break
            }
        
            default: {
            
                let type = command.search( '[^--][a-z]*' ) !== 0 ? 'flag' : 'command'
                let message = type === 'flag' ? ', first parameter to deflate64 must be a command not a flag' : 'not available'
            
                help( 'list-available' )
                console.error( '\x1b[31m', `  ${ type }: ${ command } ${ message }.\n`, '\x1b[0m' )
                process.exit( 1 )
                break
            }
        }
    }
} )

Object.freeze( d64 )

/**
 * Deflate 64 entry point.
 *
 * @public
 * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and executable.js.
 * @returns {Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
 */
export default function deflate64( argv ){

    return  d64[ entryPoint ]( argv )
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
