import { createRequire } from 'module'
import d64 from '../d64.js'
import { undefined_ } from 'oftypes'

const require = createRequire( import.meta.url )
export const { version } = require( '../../package.json' )

/**
 * @type {symbol}
 */
export const helpSymbol = Symbol( 'd64 async function help_( command, flag ):void' )
export const help = Object.defineProperty( d64, helpSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    
    /**
     * Get help for the usage of d64.
     *
     * @param {string=} command - The command to get help for.
     * @param {string=} flag - The flag to get help for.
     */
    value: async function help_( command, flag ){
        
        /**
         * The d64 header message.
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
         * The d64 commands help.
         */
        const helpCommands = () => {
            
            console.info()
            console.info( 'available commands:' )
            console.info()
            console.info( '   encode [e] \t\t[ encode and compress a given string or file ]' )
            console.info( '   decode [d] \t\t[ decode and decompress a given string or file ]' )
            console.info( '   help \t\t[ shows help about the given command or flag ]' )
            console.info( '\x1b[32m', '      info \t', 'for commands:\t`c64 help [command-name] ]`', '\x1b[0m' )
            console.info( '\x1b[32m', '       |   \t', 'for flags:\t`d64 help [--flag-name] ]`', '\x1b[0m' )
            console.info( '   version [v] \t\t[ shows the installed version ]' )
            console.info()
            
        }
    
        /**
         * The d64 flags help.
         */
        const helpFlags = () => {
            
            console.info()
            console.info( 'available flags', '\x1b[32m', '\x1b[0m', ':' )
            console.info( '\x1b[32m', '       info \t\t', 'either for encode and decode.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', 'flags go two by two. Each flag must be followed by an argument.', '\x1b[0m' )
            console.info()
            console.info( '  --file [-f] <path> \t\t[ relative or absolute path to the file to load data from. ]' )
            console.info( '  --string [-s] <string>\t[ JSON or plain text. ]' )
            console.info( '\x1b[32m', '       info \t\t', 'for complex string, double and single quotes within: ', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', 'save the string to file and use the flag --file instead.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', 'give hints at https://github.com/simonedelpopolo/deflate64/issues/2', '\x1b[0m' )
            console.info( '  --save [-o] <path> \t\t[ relative or absolute path to the file to save data to. ]' )
            console.info( '  --json [-j] <json|boolean>\t[ it places the data in json ]' )
            console.info( '\x1b[32m', '       info \t\t', 'when set to `true`, it prints or returns {"string":"encoded_string"}.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', 'given json {"personalized-property-name":null} where the value must be null.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', 'it prints or return {"personalized-property-name":"encoded data".} ', '\x1b[0m' )
            console.info( '  --in-object <boolean>\t\t[ if it is set to true will parse a json input( file/string ). ]' )
            console.info( '\x1b[32m', '       info \t\t', 'will extract from the "string" property the data.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', '--json flag is required to extract data from other property than "string." ', '\x1b[0m' )
            console.info( '  --quiet [-q] <boolean> \t\t[ default is set to false and the stdout will be shown. ]' )
            console.info( '\x1b[32m', '       info \t\t', 'set to true it will silence the stdout.', '\x1b[0m' )
            console.info( '  --remote [-r] <string> \t\t[ it will download the data from the given url. ]' )
            console.info( '  --compression [-c] <boolean> \t\t[ default is set to true and the stdout will be shown. ]' )
            console.info( '\x1b[32m', '       info \t\t', 'set to false to do not compress the data.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', 'to decode is required to set it false.', '\x1b[0m' )
            console.info( '  --ratio [-a] <boolean> \t\t[ default is set to false. ]' )
            console.info( '\x1b[32m', '       info \t\t', 'set to true will print return an object.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', '{ data: \'aHR0cHM6Ly9ucG1qcy5jb20=\', ratio: { in: 17, out: 17, result: 0 } }.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', 'data loaded\x1b[37m [in][out]\x1b[0m\x1b[32m size in bytes.\x1b[37m [result]\x1b[0m\x1b[32m percentage compression ratio.', '\x1b[0m' )
            console.info()
            
        }
    
        if ( await undefined_( command ) === true && await undefined_( flag ) === true ) {
            console.log( command )
            helpHeader()
            helpCommands()
            helpFlags()
        
            return
        
        }
    
    
        if ( await undefined_( command ) === false ) {
        
            switch ( command ) {
            
                case 'encode':
                
                    helpHeader()
                    console.info( ' example on how to use the encode command.' )
                    console.info()
                    console.info( '   deflate64 encode --file /path/to/file --save /path/to/saved/file [ it prints to stdout the encoded string and save the specified file ]' )
                    console.info( '   deflate64 encode --file /path/to/file --stdout true [ it prints to stdout the encoded string ]' )
                    console.info( '   deflate64 encode --file /path/to/file --json true [ it prints to stdout a json string {"string":"encoded string"} ]' )
                    console.info( '   deflate64 encode --string \'string to encode and compress\' --save /path/to/saved/file [ it prints to stdout the encoded string and save the specified file ]' )
                    console.info( '   deflate64 encode --string \'string to encode and compress\' --stdout false [ it doesn\'t print to stdout and it throws ]' )
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
                    console.info( '   deflate64 decode --string \'string to decode and decompress\' --stdout false [ it doesn\'t print to stdout and it throws ]' )
                    console.info( '   deflate64 decode --string \'string to decode and decompress\' --json true [ it prints to stdout a json string {"string":"decoded string"} ]' )
                    console.info()
                    
                    break
            
                case 'help':
                
                    help[ helpSymbol ]( undefined, undefined )
                
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
                    help[ helpSymbol ]( 'list-available' )
                    console.error( '\x1b[31m', `  command ${ command } ${ message }.\n`, '\x1b[0m' )
                
                    break
                
                }
            }
        }
    
        if ( await undefined_( flag ) === false ) {
            switch ( flag ) {
                case '--file':
                
                    helpHeader()
                    console.info( '   --file \t\t\t[ specify the relative or absolute path to the file to encode or decode ]' )
                    console.info()
                    console.info( '   usage: deflate64 decode --file ./encoded.string.txt --save ./decoded.string.txt --stdout true' )
                    console.info( '   usage: deflate64 decode --file ./encoded.string.txt --save ./decoded.string.txt' )
                    console.info( '         ', '\x1b[47m', '\x1b[39m', 'let\'s believe that the file ./encoded.string.txt contain the string "eJzLSM3JyQcABiwCFQ=="', '\x1b[0m' )
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', 'hello', '\x1b[0m' )
                    console.info( '   saves:', '\x1b[47m', '\x1b[39m', './decoded.string.txt', '\x1b[0m' )
                    console.info()
                    
                    break
            
                case '--string':
                
                    helpHeader()
                    console.info( '   --string \t\t\t[ the string (JSON or plain text), surrounded by single quotes for JSON and indifferently type of quotes for plain text' )
                    console.info( '       info \t\t\t', '\x1b[47m', '\x1b[39m', 'for more complex string having double and single quotes within read this:', '\x1b[0m' )
                    console.info( '       info \t\t\t', '\x1b[47m', '\x1b[39m', 'the flag --string dilemma https://github.com/simonedelpopolo/deflate64/issues/1#issuecomment-996634336', '\x1b[0m' )
                    console.info( '       info \t\t\t', '\x1b[47m', '\x1b[39m', 'or follow the bug issue here https://github.com/simonedelpopolo/deflate64/issues/1', '\x1b[0m' )
                    console.info( '       info \t\t\t', '\x1b[47m', '\x1b[39m', 'or give hints at the issue here https://github.com/simonedelpopolo/deflate64/issues/2', '\x1b[0m' )
                    console.info( '       info \t\t\t', '\x1b[47m', '\x1b[39m', 'or just save the string on a file and use the flag --file instead', '\x1b[0m' )
                    console.info()
                    console.info( '   usage: deflate64 decode --string \'eJzLSM\'3JyQcABiwCFQ==\' --json true' )
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', '{"string":"hello"} ', '\x1b[0m' )
                    console.info()
                    
                    break
            
                case '--save':
                
                    helpHeader()
                    console.info( '   --save \t\t\t[ specify the relative or absolute path to the file for saving the encoded or decoded string ]' )
                    console.info()
                    console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt --stdout true' )
                    console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt' )
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', 'hello', '\x1b[0m' )
                    console.info( '   saves:', '\x1b[47m', '\x1b[39m', './decoded.string.txt', '\x1b[0m' )
                    console.info()
                    
                    break
            
                case '--stdout':
                
                    helpHeader()
                    console.info( '   --stdout \t\t\t[ ( options: [ true|false ] ) by default is set to true and will print the encoded or decoded string in the console ]' )
                    console.info( '           \t\t\t[ if the stdout flag is call the response will be the encode or decoded string ]' )
                    console.info()
                    console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt --stdout true' )
                    console.info( '   usage: deflate64 decode --string \'eJzLSM3JyQcABiwCFQ==\' --save ./decoded.string.txt' )
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', 'hello', '\x1b[0m' )
                    console.info( '   saves:', '\x1b[47m', '\x1b[39m', './decoded.string.txt', '\x1b[0m' )
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
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', '{"string":"hello"} ', '\x1b[0m' )
                    console.info()
                    
                    break
            
                case '--in-object':
                
                    helpHeader()
                    console.info( '   --in-object \t\t\t[ ( options: [ true|false ] ) by default is set to false, if is set to true will parse a json input( file/string ) and will extract from the "string" property the encoded/decoded string ]' )
                    console.info()
                    console.info( '   usage: deflate64 encode --string \'{"string":"hello"}\' --json true --in-object true' )
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', '{"string":"eJzLSM3JyQcABiwCFQ=="} ', '\x1b[0m' )
                    console.info()
                
                    break
            
                case '--spawn': {
    
                    const spawn_example_as_module = `
    // npm install d64
    import deflate64 from 'deflate64'

    const goodMorningFolks = await deflate64( [ 'decode', '--string', 'eJxLz89PUcjNL8rLzEtXSMvPyS4GAEIjBwM=', '--spawn', 'true' ] )
    const goodMorningBuddies = goodMorningFolks.replace( 'folks', 'buddies' )
    console.log( goodMorningBuddies )`
                    helpHeader()
                    console.info( '   --spawn \t\t\t[ ( options: [ true|false ] ) by default is set to false and it will print to stdout in the shell. If it is set to true will turn off the shell stdout ]' )
                    console.info( '      info \t\t\t[ setting it to true is useful when using d64 as module for your project, to avoid d64 to log help or errors in the console. ]' )
                    console.info()
                    console.info( '   usage: deflate64 encode --string \'{"string":"hello"}\' --json true --in-object true --spawn true' )
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', '{"string":"eJzLSM3JyQcABiwCFQ=="} ', '\x1b[0m' )
                    console.info()
                    console.info( '   usage: d64 as a module in your package' )
                    console.info( '    code:' )
                    console.info( `         ${ spawn_example_as_module }` )
                    console.info( '    info:', '\x1b[47m', '\x1b[39m', 'd64 in this case is decoding and decompressing the string "good morning folks" ', '\x1b[0m' )
                    console.info( '  prints:', '\x1b[47m', '\x1b[39m', 'good morning buddies', '\x1b[0m' )
                    console.info()
    
                    break
                }
                case 'list-available':
                
                    helpHeader()
                    helpFlags()
                
                    break
            
                default: {
                
                    let message = 'not available'
                
                    help[ helpSymbol ]( undefined, 'list-available' )
                    console.error( '\x1b[31m', `  flag ${ flag } ${ message }.\n`, '\x1b[0m' )
                
                    break
                }
            }
        }
    }
} )

Object.freeze( d64 )
