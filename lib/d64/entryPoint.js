import d64 from '../d64.js'
import { d64__ } from './d64__.js'
import {
    arguments_, argumentsSymbol,
    decode, decodeSymbol,
    encode, encodeSymbol,
    flag, flagSymbol,
    help, helpSymbol,
    version
} from './exporter.js'

/**
 * @type {symbol}
 */
export const entryPointSymbol = Symbol( 'Deflate 64 entry point.' )
export const entryPoint = Object.defineProperty( d64, entryPointSymbol, {
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
        
        await d64__.types( argv )
        await d64__.length( argv )

        const { command, flags, command_help } = await arguments_[ argumentsSymbol ]( argv )
        
        switch ( command ) {
            
            case 'help': {
                
                let flag = undefined
                if ( typeof flags !== 'undefined' )
                    flag = flags === false ? undefined : flags[ 0 ]
                
                help[ helpSymbol ]( command_help, flag )
                
                break
            }
            
            case 'encode': {
                
                if ( typeof flags !== 'undefined' && flags.length > 0 ) {
                    
                    const flagsObject = await flag[ flagSymbol ]( flags )
                        .then( object => object )
                        .catch( reason => {
                            help[ helpSymbol ]( undefined, 'list-available' )
                            console.error( '\x1b[31m', `  ${ reason.message }\n` )
                            console.error( `  given flags: ${ JSON.stringify( reason.flags ) }\n`, '\x1b[0m' )
                            process.exit( 1 )
                        } )
                    
                    await encode[ encodeSymbol ]( flagsObject )
                    
                    break
                }
                
                break
                
            }
            
            case 'decode': {
                
                if ( typeof flags !== 'undefined' && flags.length > 0 ) {
                    
                    const flagsObject = await flag[ flagSymbol ]( flags )
                        .then( object => object )
                        .catch( reason => {
                            help[ helpSymbol ]( undefined, 'list-available' )
                            console.error( '\x1b[31m', `  ${ reason.message }\n` )
                            console.error( `  given flags: ${ JSON.stringify( reason.flags ) }\n`, '\x1b[0m' )
                            process.exit( 1 )
                        } )
                    
                    await decode[ decodeSymbol ]( flagsObject )
                    
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
                
                help[ helpSymbol ]( 'list-available' )
                console.error( '\x1b[31m', `  ${ type }: ${ command } ${ message }.\n`, '\x1b[0m' )
                process.exit( 1 )
                break
            }
        }
    }
} )
