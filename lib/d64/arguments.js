import d64 from '../d64.js'
import { help } from '../../index.js'
import { stderr } from './d64__.js'
import { undefined_ } from 'oftypes'

/**
 * @type {symbol}
 */
export const argumentsSymbol = Symbol( 'd64 function arguments_( argv: string ):{command: string, flags: (string[]|boolean), command_help: string }' )
export const arguments_ = Object.defineProperty( d64, argumentsSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    
    /**
     * It checks if process.argv is valid and not empty and set properly the necessary variable to be dispatched to the right function in the right way.
     *
     * @param {string[]} argv - The give process.argv {string[]}.
     * @returns {Promise|{command: string, flags: (string[]|boolean), command_help: string }}
     */
    value: async function arguments_( argv ){
        
        /**
         * @type {string}
         */
        const command = argv[ 0 ]
    
        /**
         * @type {boolean|string[]}
         */
        let flags
    
        /**
         * @type string
         */
        let command_help
    
        const argv1 = argv[ 1 ]
        const undefined_argv1 = await undefined_( argv1 )
        
        /**
         * Commands must be followed by a flag, exception done for v[version] and help.
         */
        async function mustFlag(){
            let message = 'second argument must be a flag'
    
            await help( undefined, 'list-available' )
            stderr( '\x1b[31m' )
            stderr( `command    : [ ${command} ]\n` )
            stderr( `argument   : [ ${ argv1 } ] -> ${ message }.\x1b[0m\n\n` )
            process.exit( 1 )
        }
        
        if ( undefined_argv1 === false ) {
            
            if ( undefined_argv1 === false && argv1.search( '[^--][a-z]*' ) === 0 ) {
            
                if ( command !== 'help' )
                    await mustFlag()
                
                command_help = argv1
                flags = false
            
            } else if ( undefined_argv1 === false && argv1.search( '[^--][a-z]*' ) > 0 ) {
            
                command_help = undefined
                flags = argv.slice( 1 )
            
            } else {
            
                command_help = undefined
                flags = false
            }
        }else if( command !== 'help' && command !== 'version' && command !== 'v' && undefined_argv1 === true )
            await mustFlag()
        
        return {
            command: command,
            flags: flags,
            command_help: command_help,
        }
    }
} )
