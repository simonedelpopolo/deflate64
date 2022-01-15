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
            console.info( '\x1b[32m', '        |   \t\t', 'it prints or return {"personalized-property-name":"encoded data"}. ', '\x1b[0m' )
            console.info( '  --in-object [-i] <boolean>\t\t[ if it is set to true will parse a json input( file/string ). ]' )
            console.info( '\x1b[32m', '       info \t\t', 'will extract from the "string" property the data.', '\x1b[0m' )
            console.info( '\x1b[32m', '        |   \t\t', '--json flag is required to extract data from other property than "string". ', '\x1b[0m' )
            console.info( '  --no-json-out [-n] <boolean>\t\t[ default set to false. ]' )
            console.info( '\x1b[32m', '       info \t\t', 'when just the extracted data from json string needs to be returned, encode or decoded set it to false. ', '\x1b[0m' )
            console.info( '  --quiet [-q] <boolean> \t\t[ default set to false and the stdout will be shown. ]' )
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
            
            helpHeader()
            helpCommands()
            helpFlags()
        
            return
        
        }
    
    
        if ( await undefined_( command ) === false ) {
        
            switch ( command ) {
                
                case 'e':
                case 'encode': {
    
                    console.info()
                    console.info( '\x1b[42m d64 command encode \x1b[0m' )
                    const encodeObject = {
                        synopsis: {
                            'encode [e]': '[flags]',
                        },
                        'usage 0': {
                            shell: 'd64 e -s \'hello folks\'',
                            prints: 'eJzLSM3JyVdIy8/JLgYAGbEEVA==',
                            returns: '<string: eJzLSM3JyVdIy8/JLgYAGbEEVA==>',
                        },
                        'usage 1': {
                            shell: 'd64 e -i true -s \'{"string":"hello folks"}\'',
                            prints: 'eJzLSM3JyVdIy8/JLgYAGbEEVA==',
                            returns: '<string: eJzLSM3JyVdIy8/JLgYAGbEEVA==>',
                        }
                    }
    
                    console.info( '    return & print the encoded string' )
                    console.table( encodeObject )
                    console.info()
    
                    break
                }
                
                case 'd':
                case 'decode': {
    
                    console.info()
                    console.info( '\x1b[42m d64 command decode \x1b[0m' )
                    const decodeObject = {
                        synopsis: {
                            'decode [d]': '[flags]',
                        },
                        'usage 0': {
                            shell: 'd64 d -s \'eJzLSM3JyVdIy8/JLgYAGbEEVA==\'',
                            prints: 'hello folks',
                            returns: '<string: hello folks>',
                        },
                        'usage 1': {
                            shell: 'd64 d -i true -s \'{"string":"eJzLSM3JyVdIy8/JLgYAGbEEVA=="}\'',
                            prints: 'hello folks',
                            returns: '<string: hello folks>',
                        }
                    }
    
                    console.info( '    return & print the decoded string' )
                    console.table( decodeObject )
                    console.info()
    
                    break
                }
            
                case 'v':
                case 'version': {
    
                    console.info()
                    console.info( '\x1b[42m d64 command version \x1b[0m' )
                    const versionObject = {
                        synopsis: {
                            'version [v]': null,
                        },
                        usage: {
                            shell: 'd64 v',
                            prints: 'data',
                            returns: '<string: semVer>',
                        }
                    }
    
                    console.info( '    return & print the installed version' )
                    console.table( versionObject )
                    console.info()
    
                    break
                }
    
                case 'help':
        
                    await help[ helpSymbol ]( undefined, undefined )
        
                    break
            
                case 'list-available':
                    
                    helpCommands()
                
                    break
            
                default: {
                
                    let message = 'not available'
                    await help[ helpSymbol ]( 'list-available' )
                    console.error( '\x1b[31m', `  command ${ command } ${ message }.\n`, '\x1b[0m' )
                
                    break
                
                }
            }
        }
    
        if ( await undefined_( flag ) === false ) {
            switch ( flag ) {
                case '-f':
                case '--file': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag file \x1b[0m' )
                    const fileObject = {
                        synopsis: {
                            '--file [-f]': '<path: string>',
                        },
                        usage: {
                            shell: 'd64 e -f \'string.txt\'',
                            prints: 'data',
                            returns: '<string>',
                        }
                    }
    
                    console.info( '    relative or absolute path to the file to load data from.' )
                    console.table( fileObject )
                    console.info()
    
                    break
                }
                
                case '-s':
                case '--string': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag string \x1b[0m' )
                    const stringObject = {
                        synopsis: {
                            '--string [-s]': '<string|json>',
                        },
                        usage: {
                            shell: 'd64 e -s \'hello folks\'',
                            prints: 'data',
                            returns: '<string>',
                        }
                    }
    
                    console.info( '    for complex string, double and single quotes within: ' )
                    console.info( '    save the string to file and use the flag --file instead.' )
                    console.info( '    give hints at https://github.com/simonedelpopolo/deflate64/issues/2' )
                    console.table( stringObject )
                    console.info()
    
                    break
                }
                
                case '-o':
                case '--save': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag save \x1b[0m' )
                    const saveObject = {
                        synopsis: {
                            '--save [-o]': '<path: string>',
                        },
                        usage: {
                            shell: 'd64 e -o \'./enc.txt\' -s \'hello folks\'',
                            prints: 'data',
                            returns: '<string>',
                        }
                    }
    
                    console.info( '    relative or absolute path to the file to save data to.',  )
                    console.table( saveObject )
                    console.info()
    
                    break
                }
    
                case '-j':
                case '--json': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag json \x1b[0m' )
                    const jsonObject = {
                        synopsis: {
                            '--json [-j]': '<boolean: false>|<json>',
                        },
                        usage: {
                            shell: 'd64 e -j \'{"data":null}\' -s \'hello folks\'',
                            prints: '<json>',
                            returns: '<json>',
                        }
                    }
    
                    console.info( '    when set to `true`, it prints or returns {"string":"encoded_string"}.',  )
                    console.info( '    given json {"data":null} where the value must be null.'  )
                    console.info( '    it prints or return {"data":"encoded data"}.'  )
                    console.table( jsonObject )
                    console.info()
    
                    break
                }
            
                case '-i':
                case '--in-object': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag in-object \x1b[0m' )
                    const in_objectObject = {
                        synopsis: {
                            '--in-object [-i]': '<boolean: false>',
                        },
                        usage: {
                            shell: 'd64 e -i true -j \'{"data":null}\' -s \'{"data":"hello folks"}\'',
                            prints: '<json>',
                            returns: '<json>',
                        }
                    }
    
                    console.info( '    if it is set to true will parse a json input( file/string ).',  )
                    console.info( '    will extract from the "string" property the data.'  )
                    console.info( '    --json flag is required to extract data from other property than "string.'  )
                    console.table( in_objectObject )
                    console.info()
    
                    break
                }
    
                case '-n':
                case '--no-json-out': {
        
                    console.info()
                    console.info( '\x1b[42m d64 flag no-json-out \x1b[0m' )
                    const no_json_outObject = {
                        synopsis: {
                            '--no-json-out [-n]': '<boolean: false>',
                        },
                        'usage 0': {
                            shell: 'd64 e --no-json-out true -i true -j \'{"data":null}\' -s \'{"data":"hello folks"}\'',
                            prints: 'eJzLSM3JyVdIy8/JLgYAGbEEVA==',
                            returns: '<string: eJzLSM3JyVdIy8/JLgYAGbEEVA==>',
                        },
                        'usage 1': {
                            shell: 'd64 d -n false -i true -j \'{"data":null}\' -s \'{"data":"eJzLSM3JyVdIy8/JLgYAGbEEVA=="}\'',
                            prints: '{"data":"hello folks"}',
                            returns: '<json: {"data":"hello folks"}>',
                        }
                    }
        
                    console.info( '    default set to false.',  )
                    console.info( '    when the --json flag is invoked it pretends to return json string anyway.'  )
                    console.info( '    to extract the data from json property and return it clear, set it to false.'  )
                    console.table( no_json_outObject )
                    console.info()
        
                    break
                }
            
                case '-q':
                case '--quiet': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag quiet \x1b[0m' )
                    const quietObject = {
                        synopsis: {
                            '--quiet [-q]': '<boolean: false>',
                        },
                        usage: {
                            shell: 'd64 e -s \'hello folks\' -q true',
                            prints: 'nothing',
                            returns: '<string>',
                        }
                    }
    
                    console.info( '    default set to false, the stdout will be shown.',  )
                    console.info( '    set to true it will silence the stdout.'  )
                    console.table( quietObject )
                    console.info()
    
                    break
                }
                
                case '-r':
                case '--remote': {
                    
                    console.info()
                    console.info( '\x1b[42m d64 flag remote \x1b[0m' )
                    const remoteObject = {
                        synopsis: {
                            '--remote [-r]': '<url: string>',
                        },
                        usage: {
                            shell: 'd64 e -r https://npmjs.com',
                            prints: 'data',
                            returns: '<string>',
                        }
                    }
                    
                    
                    console.info( '    it will download the data from the given url.',  )
                    console.table( remoteObject )
                    console.info()
                    
                    break
                }
                
                case '-c':
                case '--compression': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag compression \x1b[0m' )
                    const compressionObject = {
                        synopsis: {
                            '--compression [-c]': '<boolean: true>',
                        },
                        usage: {
                            shell: 'd64 e -c false -s \'hello folks\'',
                            prints: 'data',
                            returns: '<string>',
                        }
                    }
                    
                    console.info( '    default set to true, set to false disable the compression.',  )
                    console.info( '    when decoding, the --compression flag must be set to false.',  )
                    console.table( compressionObject )
                    console.info()
    
                    break
                }
    
                case '-a':
                case '--ratio': {
    
                    console.info()
                    console.info( '\x1b[42m d64 flag ratio \x1b[0m' )
                    const ratioObject = {
                        synopsis: {
                            '--ratio [-r]': '<boolean: false>',
                        },
                        usage: {
                            shell: 'd64 e -r true -s \'hello folks\'',
                            prints: '<object>',
                            returns: '<object>',
                        }
                    }
    
                    console.info( '    default set to false, set to true returns & prints object.',  )
                    console.info( '    signature { data:<string>, ratio:{ in:<int>, out:<int>, result:<signed-int> } }'  )
                    console.table( ratioObject )
                    console.info()
    
                    break
                }
                
                case 'list-available':
                    
                    helpFlags()
                
                    break
            
                default: {
                
                    let message = 'not available'
                
                    await help[ helpSymbol ]( undefined, 'list-available' )
                    console.error( '\x1b[31m', `  flag ${ flag } ${ message }.\n`, '\x1b[0m' )
                
                    break
                }
            }
        }
    }
} )

Object.freeze( d64 )
