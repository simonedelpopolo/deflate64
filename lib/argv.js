import help from './help.js'

/**
 *
 * @param argv {string[]}
 * @returns Object<{command: string, flags: (string[]|boolean), command_help: string }>
 */
export function argv( argv ) {
    if ( argv.length === 0 ) {
        
        help()
        process.exit( 0 )
    }
    
    /**
     *
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
    }
    
    return {
        command: command,
        flags: flags,
        command_help: command_help,
    }
}
