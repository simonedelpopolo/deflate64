import { access, readFile, writeFile } from 'fs/promises'
import { bool } from '@simonedelpopolo/to-bool'
import { constants } from 'fs'
import { deflate } from 'zlib'
import { parse } from '@simonedelpopolo/json-parse'
import { promisify } from 'util'

const compress = promisify( deflate )

/**
 * Encode the given string/file and execute the flags action
 * @param flags {Object}
 */
export default async function encode( flags ) {
    
    /**
     *
     * @type {{input: {string: null |string, type: null|string, object: boolean}}, {output: {string: null|string, type: null|string, out: {print: boolean, write: null|boolean}}, data: null | buffer | string}}
     */
    let command = {
        input: {
            string: null,
            type: null,
            object: false,
        },
        output: {
            string: null,
            type: 'stdout',
            out: {
                write: 'false',
                print: true,
            },
        },
        data: null,
    }
    
    const flagsObjectKeys = Object.keys( flags )
    
    if(flagsObjectKeys.includes('--save') === false){
        command.output.out.write = false
    }
    
    for ( const flag in flags ) {
        
        switch ( flag ) {
            
            case '--file':
                
                command.input.string = flags[ flag ]
                command.input.type = 'file'
                
                continue
            
            case '--string':
                
                command.input.string = flags[ flag ]
                command.input.type = 'string'
                
                continue
            
            case '--save':
                
                command.output.string = flags[ flag ]
                command.output.out.write = true
                
                continue
            
            case '--stdout':
                
                if ( flagsObjectKeys.includes( '--json' ) ) {
                    continue
                }
    
                if(flagsObjectKeys.includes('--save') === false && await bool( flags[ flag ] ) === false){
    
                    console.error()
                    console.error('\x1b[31m', 'why are you doing this to me?', '\x1b[0m')
                    console.error()
                    process.exit(1)
                }
                
                command.output.out.print = await bool( flags[ flag ] )
                command.output.type = 'stdout'
                
                continue
            
            case '--json':
                
                command.output.out.print = await bool( flags[ flag ] )
                command.output.type = 'json'
                
                continue
            
            case '--in-object':
                
                command.input.object = await bool( flags[ flag ] )
                
                continue
            
            default:
                
                break
        }
    }

    if ( command.output.out.print === true ) {
        
        await inputType()
        
    } else if ( command.output.out.print === false ) {
        
        await inputType()
    }
    
    if ( command.output.out.write === true && command.data !== null ) {
        
        let writeProcess = await writeFileType( command.output.string, command.data )
        
        switch ( writeProcess ) {
            
            case true:
                if ( command.output.type === 'stdout' ) {
                    process.exit( 0 )
                }
                
                if ( command.output.type === 'json' ) {
                    process.exit( 0 )
                }
                break
            default:
                
                console.error( writeProcess )
                process.exit( 1 )
                break
        }
    }
    
    
    /**
     *
     * @param filename {string}
     * @returns {Promise<boolean> | Promise<string>}
     */
    async function accessCheck( filename ) {
        
        return await access( filename, constants.F_OK | constants.R_OK )
            .then( () => true )
            .catch( error => error.message )
    }
    
    /**
     *
     * @param filename {string}
     * @param data {Buffer}
     * @returns {Promise<boolean> | Promise<string>}
     */
    async function writeFileType( filename, data ) {
        
        return await writeFile( filename, data )
            .then( () => true )
            .catch( error => error.message )
    }
    
    async function readInputFile() {
        const check = await accessCheck( command.input.string )
        
        switch ( check ) {
            
            case true:
                await readFile( command.input.string )
                    .then(
                        async string => {
                            if ( string.length > 0 ) {
                                
                                let stringObject = string
                                
                                if ( command.input.object === true ) {
                                    stringObject = await inObject( string )
                                }
                                
                                await encoded( Buffer.from( stringObject ) )
                            }
                        } )
                    .catch( reason => {
                        console.error( reason )
                        process.exit( 1 )
                    } )
                break
            default:
                console.error( check )
                process.exit( 1 )
                break
        }
    }
    
    async function inputType() {
        if ( command.input.type === 'file' ) {
            
            await readInputFile()
            /**
             * if the input type is a string,
             */
        } else if ( command.input.type === 'string' ) {
            
            let stringObject = command.input.string
            
            if ( command.input.object === true ) {
                stringObject = await inObject( command.input.string )
            }
            
            const buffer = Buffer.from( stringObject )
            await encoded( buffer )
        }
    }
    
    /**
     *
     * @param data {Buffer | string}
     * @returns {Promise<void>}
     */
    async function output( data ) {
        
        if ( command.output.type === 'stdout' ) {
            if ( command.output.out.print === true ) {
                console.log( data.toString( 'base64' ) )
            }
            if ( command.output.out.write === false ) {
                process.exit( 0 )
            }
            command.data = data.toString( 'base64' )
        } else if ( command.output.type === 'json' ) {
            
            if ( command.output.out.print === true ) {
                console.log( JSON.stringify( { string: data.toString( 'base64' ) } ) )
            }
            
            if ( command.output.out.write === false ) {
                process.exit( 0 )
            }
            
            command.data = JSON.stringify( { string: data.toString( 'base64' ) } )
        }
    }
    
    /**
     *
     * @param buffer {Buffer}
     * @returns {Promise<void>}
     */
    async function encoded( buffer ) {
        await compress( buffer )
            .then( async data => {
                
                await output( data )
                
            } )
            .catch( error => {
                console.error( error )
                process.exit( 1 )
            } )
    }
    
    /**
     *
     * @param string {Buffer|string}
     * @returns {Promise | PromiseFulfilledResult<string>| PromiseRejectedResult<TypeError|SyntaxError>}
     */
    async function inObject( string ) {
        return await parse( string )
            .then( json => json.string )
            .catch( error => {
                console.error( '\x1b[31m', 'check the provided json file for errors -> ', `[${ error }]`, '\x1b[0m' )
                process.exit( 1 )
            } )
    }
}
