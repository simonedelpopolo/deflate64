import * as Module from 'module'
import { array_ } from 'oftypes'
import help from './lib/help.js'

/**
 * @private
 */
const argv__ = {
    
    /**
     * @type {null|string[]}
     */
    argv: null,
    
    /**
     * Type checker for the argv argument.
     *
     * @param {any} given_argv - The given argument `argv`.
     * @returns {Promise | PromiseFulfilledResult<true> | PromiseRejectedResult<string>}
     */
    types: async function types( given_argv ){
        const messageReject = '[d64-TypeError] Only type of array is accepted for argument `argv`.'
        const argvResolvers = {
            true: ( async () => true ),
            false: ( async ( given ) => {
            
                return new Promise( ( resolve, reject ) => {
                    reject( `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof given_argv }}\x1b[0m -> \x1b[31m ${JSON.stringify( given )}\x1b[0m \n\n` )
                } )
            } )
        }
    
        const checkObject = await array_( given_argv, argvResolvers, true )
    
        await checkObject[ 0 ]( checkObject[ 1 ] ).catch( error => {
            process.stderr.write( `${error}` )
            process.exit( 1 )
        } )
        this.argv = given_argv
    },
    
    length: function length(){
        console.log( this.argv )
        this.argv.length === 0 ? help() : null
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
        argv__.length()
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
}*/
