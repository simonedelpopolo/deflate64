import decode from './lib/decode.js'
import encode from './lib/encode.js'
import { options } from './lib/options.js'
import { parameters } from './lib/parameters.js'
import help, {version} from './lib/help.js'

/**
 * The entry point to deflate64.
 *
 * @param {string[]} argv - The process.argv.splice( 0, 2 ).
 * @returns {Promise<void>}
 */
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
}
