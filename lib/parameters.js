import help from './help.js'

/**
 * It checks if process.argv is valid and not empty and set properly the necessary variable to be dispatched to the right function in the right way.
 *
 * @param {string[]} argv - The give process.argv {string[]}.
 * @returns {{command: string, flags: (string[]|boolean), command_help: string }}
 */
export function parameters( argv ) {
    if ( argv.length === 0 ) {
        
        help()
        process.exit( 0 )
    }
    
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
    
    if ( typeof argv[ 1 ] !== 'undefined' ) {
        
        if ( argv[ 1 ] !== 'undefined' && argv[ 1 ].search( '[^--][a-z]*' ) === 0 ) {
            
            if ( command !== 'help' ) {
                
                let message = ', second parameter to deflate64 must be a flag'
    
                help( 'list-available' )
                console.error( '\x1b[31m', ` flag: ${ argv[1] } ${ message }.\n`, '\x1b[0m' )
                process.exit( 1 )
                
            }
    
            command_help = argv[ 1 ]
            flags = false
            
        } else if ( argv[ 1 ] !== 'undefined' && argv[ 1 ].search( '[^--][a-z]*' ) > 0 ) {
            
            command_help = undefined
            flags = argv.slice( 1 )
            
        } else {
            
            command_help = undefined
            flags = false
        }
    }else if( command !== 'help' && command !== 'version' && typeof argv[1] === 'undefined' ){
    
        let message = `command: ${command} must be followed by a flag`
    
        help( undefined, 'list-available' )
        console.error( '\x1b[31m', `${ message }.\n`, '\x1b[0m' )
        process.exit( 1 )
    }
    
    return {
        command: command,
        flags: flags,
        command_help: command_help,
    }
}
