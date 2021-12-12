import { createRequire } from 'module'

const require = createRequire( import.meta.url )
export const { version } = require( '../package.json' )

/**
 * Get help for the usage of Deflate 64
 * @param command {string=}
 * @param flag {string=}
 */
export default function help( command, flag ) {
    
    /**
     * Deflate 64 header message
     */
    const helpHeader = () => {
        
        console.info( '    ________________________________________________________________________    ' )
        console.info( `    |\t\t\t\tDeflate64 v${ version }\t\t\t   |` )
        console.info( '    ------------------------------------------------------------------------    ' )
        console.info( 'Command line utility to convert one file/string into compressed base64 encoding.' )
        console.info( 'The file/string can be decompressed and decoded to its original status.' )
        console.info()
    }
    
    /**
     * Deflate 64 commands help
     */
    const helpCommands = () => {
        
        console.info()
        console.info( 'available commands:' )
        console.info()
        console.info( '   encode \t\t\t[ encode and compress a given string or file ]' )
        console.info( '   decode \t\t\t[ decode and decompress a given string or file ]' )
        console.info( '   help \t\t\t[ shows help about the given command or flag ]' )
        console.info( '        \t\t\t[ for commands: `deflate64 help [command-name] ]` ]' )
        console.info( '        \t\t\t[ for flags: `deflate64 help [flag-name] ]` ]' )
        console.info( '   version \t\t\t[ shows the installed version ]' )
        console.info()
    }
    
    /**
     * Deflate 64 flags help
     */
    const helpFlags = () => {
    
        console.info( '         ', '\x1b[47m', '\x1b[32m', 'flags go two by two', '\x1b[0m' )
        console.info( '         ', '\x1b[47m', '\x1b[32m', 'That means that every flag passed to the command line must be followed by another argument.', '\x1b[0m' )
        console.info()
        console.info( 'available flags [ either for encode and decode ]:' )
        console.info()
        console.info( '   --file \t\t\t[ specify the relative or absolute path to the file to encode or decode ]' )
        console.info( '   --string \t\t\t[ the string (JSON or plain text), surrounded by single quotes ( if the string contain single quotes use the --file flag ), to encode or decode ]' )
        console.info( '   --save \t\t\t[ specify the relative or absolute path to the file for saving the encoded or decoded string ]' )
        console.info( '   --stout \t\t\t[ ( options: [ true|false ] ) by default is set to true and will print the encoded or decoded string in the console ]' )
        console.info( '           \t\t\t[ if the stdout flag is call the response will be the encode or decoded string ]' )
        console.info( '   --json \t\t\t[ ( options: [ true|false ] ) by default is set to false, if is set to true will override the --stdout either if this one is set to true ]' )
        console.info( '           \t\t\t[ if the json flag is call the response will be the encode or decoded string in the form of a json string like this {"string":"encodes/decoded string"} ]' )
        console.info( '   --in-object \t\t\t[ ( options: [ true|false ] ) by default is set to false, if is set to true will parse a json input( file/string ) and will extract from the "string" property the encoded/decoded string ]' )
        console.info()
    }
    
    if ( typeof command === 'undefined' && typeof flag === 'undefined' ) {
        
        helpHeader()
        helpCommands()
        helpFlags()
        
        return
        
    }
    
    
    if ( typeof command !== 'undefined' ) {
        
        switch ( command ) {
            
            case 'encode':
                
                helpHeader()
                console.info( ' example on how to use the encode command.' )
                console.info()
                console.info( '   deflate64 encode --file /path/to/file --save /path/to/saved/file [ it prints to stdout the encoded string and save the specified file ]' )
                console.info( '   deflate64 encode --file /path/to/file --stdout true [ it prints to stdout the encoded string ]' )
                console.info( '   deflate64 encode --file /path/to/file --json true [ it prints to stdout a json string {"string":"encoded string"} ]' )
                console.info( '   deflate64 encode --string \'string to encode and compress\' --save /path/to/saved/file [ it prints to stdout the encoded string and save the specified file ]' )
                console.info( '   deflate64 encode --string \'string to encode and compress\' --stdout false [ it doesn\'t print to stdout ]' )
                console.info( '   deflate64 encode --string \'string to encode and compress\' --json true [ it prints to stdout a json string {"string":"encoded string"} ]' )
                console.info()
                break
            case 'decode':
                
                helpHeader()
                console.info( '\n example on how to use the decode command.' )
                console.info()
                console.info( '   deflate64 decode --file /path/to/file --save /path/to/saved/file [ it prints to stdout the decoded string and save the specified file ]' )
                console.info( '   deflate64 decode --file /path/to/file --stdout true [ it prints to stdout the decoded string ]' )
                console.info( '   deflate64 decode --file /path/to/file --json true [ it prints to stdout a json string {"string":"decoded string"} ]' )
                console.info( '   deflate64 decode --string \'string to decode and decompress\' --save /path/to/saved/file [ it prints to stdout the decode string and save the specified file ]' )
                console.info( '   deflate64 decode --string \'string to decode and decompress\' --stdout false [ it doesn\'t print to stdout ]' )
                console.info( '   deflate64 decode --string \'string to decode and decompress\' --json true [ it prints to stdout a json string {"string":"decoded string"} ]' )
                console.info()
                break
            
            case 'help':
                
                help( undefined, undefined )
                
                break
    
    
            case 'version':
    
                helpHeader()
                console.info( '   version \t\t\t[ shows the installed version ]' )
                console.info()
        
                break
            
            case 'list-available':
                
                helpHeader()
                helpCommands()
                
                break
            
            default: {
                
                let message = 'not available'
                help( 'list-available' )
                console.error( '\x1b[31m', `  command ${ command } ${ message }.\n`, '\x1b[0m' )
                
                break
                
            }
        }
    }
    
    if ( typeof flag !== 'undefined' ) {
        switch ( flag ) {
            case '--file':
                
                helpHeader()
                console.info( '   --file \t\t\t[ specify the relative or absolute path to the file to encode or decode ]' )
                console.info()
                console.info( '   usage: deflate64 decode --file ./encoded.string.txt --save ./decoded.string.txt --stdout true' )
                console.info( '   usage: deflate64 decode --file ./encoded.string.txt --save ./decoded.string.txt' )
                console.info( '         ', '\x1b[47m', '\x1b[32m', 'let\'s believe that the file ./encoded.string.txt contain the string "eJzLSM3JyQcABiwCFQ=="', '\x1b[0m' )
                console.info( '  prints:', '\x1b[47m', '\x1b[32m', 'hello', '\x1b[0m' )
                console.info( '   saves:', '\x1b[47m', '\x1b[32m', './decoded.string.txt', '\x1b[0m' )
                console.info()
                break
            
            case '--string':
                
                helpHeader()
                console.info( '   --string \t\t\t[ the string (JSON or plain text), surrounded by single quotes ( if the string contain single quotes use the --file flag ), to encode or decode ]' )
                console.info()
                console.info( '   usage: deflate64 decode --string \'eJzLSM\'3JyQcABiwCFQ==\' --json true' )
                console.info( '  prints:', '\x1b[47m', '\x1b[32m', '{"string":"hello"} ', '\x1b[0m' )
                console.info()
                break
            
            case '--save':
                
                helpHeader()
                console.info( '   --save \t\t\t[ specify the relative or absolute path to the file for saving the encoded or decoded string ]' )
                console.info()
                console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt --stdout true' )
                console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt' )
                console.info( '  prints:', '\x1b[47m', '\x1b[32m', 'hello', '\x1b[0m' )
                console.info( '   saves:', '\x1b[47m', '\x1b[32m', './decoded.string.txt', '\x1b[0m' )
                console.info()
                break
            
            case '--stdout':
                
                helpHeader()
                console.info( '   --stout \t\t\t[ ( options: [ true|false ] ) by default is set to true and will print the encoded or decoded string in the console ]' )
                console.info( '           \t\t\t[ if the stdout flag is call the response will be the encode or decoded string ]' )
                console.info()
                console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt --stdout true' )
                console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt' )
                console.info( '  prints:', '\x1b[47m', '\x1b[32m', 'hello', '\x1b[0m' )
                console.info( '   saves:', '\x1b[47m', '\x1b[32m', './decoded.string.txt', '\x1b[0m' )
                console.info()
                console.info( '   usage: deflate64 encode --string \'eJzLSM3JyQcABiwCFQ==\' --stdout false' )
                console.info( '  throws:', '\x1b[31m', 'why are you doing this to me?', '\x1b[0m' )
                console.info()
                break
            
            case '--json':
                
                helpHeader()
                console.info( '   --json \t\t\t[ ( options: [ true|false ] ) by default is set to false, if is set to true will override the --stdout either if this one is set to true ]' )
                console.info( '           \t\t\t[ if the json flag is call the response will be the encode or decoded string in the form of a json string like this {"string":"encodes/decoded string"} ]' )
                console.info()
                console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --json true' )
                console.info( '  prints:', '\x1b[47m', '\x1b[32m', '{"string":"hello"} ', '\x1b[0m' )
                console.info()
                
                break
            
            case '--in-object':
                
                helpHeader()
                console.info( '   --in-object \t\t\t[ ( options: [ true|false ] ) by default is set to false, if is set to true will parse a json input( file/string ) and will extract from the "string" property the encoded/decoded string ]' )
                console.info()
                console.info( '   usage: deflate64 encode --string \'{"string":"hello"}\' --json true --in-object true' )
                console.info( '  prints:', '\x1b[47m', '\x1b[32m', '{"string":"eJzLSM3JyQcABiwCFQ=="} ', '\x1b[0m' )
                console.info()
                
                break
            
            case 'list-available':
                
                helpHeader()
                helpFlags()
                
                break
            
            default: {
                
                let message = 'not available'
                
                help( undefined, 'list-available' )
                console.error( '\x1b[31m', `  flag ${ flag } ${ message }.\n`, '\x1b[0m' )
                
                break
            }
        }
    }
}
