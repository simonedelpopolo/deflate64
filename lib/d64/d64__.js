import { array_ } from 'oftypes'
import { help, helpSymbol } from './exporter.js'

export const d64__ = {
    
    /**
     * Type checker for the argv argument.
     *
     * @param {any} given_argv - The given argument `argv`.
     * @returns {Promise | PromiseFulfilledResult<true> | PromiseRejectedResult<string>}
     */
    types: async ( given_argv ) => {
        
        const messageReject = '[d64-TypeError] Only type of array is accepted for argument `argv`.'
        
        const checkArray = await array_( given_argv )
        
        if( checkArray === false ){
            const error = `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof given_argv }}\x1b[0m -> \x1b[31m ${JSON.stringify( given_argv )}\x1b[0m \n\n`
            process.stderr.write( `${error}` )
            process.exit( 1 )
        }
    },
    
    /**
     * Arguments length.
     *
     * @param {string[]} argv - The give argv argument.
     * @returns {Promise<void>}
     */
    length: async ( argv ) => {
        if( argv.length === 0 )
            help[ helpSymbol ]()
    }
    
}

import { constants } from 'fs'
import { parse } from 'json-swiss-knife'
import { promisify } from 'util'
import { true_false } from 'boolean-jokes'
import { access, readFile, writeFile } from 'fs/promises'
import { deflate, inflate } from 'zlib'

const compress = promisify( deflate )
const decompress = promisify( inflate )

/**
 * @type {{input: {string: string, type: string, object: boolean}}, {output: {string: string, type: string, out: {spawn:boolean, print: boolean, write: null|boolean}}, data: null | buffer | string}}
 */
export let command = {
    input: {
        string: '',
        type: '',
        object: false,
    },
    output: {
        string: '',
        type: 'stdout',
        out: {
            spawn: false,
            write: false,
            print: true,
        },
    },
    data: null,
}

/**
 * It goes through the flags dispatching the right command to the right function.
 *
 * @param {{[p:string]: string}} flags - The object coming from flagsRipper.
 * @returns {Promise | PromiseRejectedResult<Error>}
 */
export async function flagging( flags ) {
    
    const flagsObjectKeys = Object.keys( flags )
    
    if ( flagsObjectKeys.includes( '--save' ) === false )
        command.output.out.write = false
    
    
    if ( flagsObjectKeys.includes( '--spawn' ) === false )
        command.output.out.spawn = false
    
    
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
                
                if ( flagsObjectKeys.includes( '--json' ) )
                    continue
                
                
                /**
                 * If you do not save and not stdout the result, why you should use it?
                 */
                if ( flagsObjectKeys.includes( '--save' ) === false && await true_false( flags[ flag ] ) === false ) {
                    
                    console.error()
                    console.error( '\x1b[31m', 'why are you doing this to me?', '\x1b[0m' )
                    console.error()
                    process.exit( 1 )
                }
                
                command.output.out.print = await true_false( flags[ flag ] )
                command.output.type = 'stdout'
                
                continue
            
            case '--json':
                
                command.output.out.print = await true_false( flags[ flag ] )
                command.output.type = 'json'
                
                continue
            
            case '--in-object':
                
                command.input.object = await true_false( flags[ flag ] )
                
                continue
            
            case '--spawn':
                
                command.output.out.spawn = await true_false( flags[ flag ] )
                
                continue
            
            default:
                
                break
        }
    }
}

/**
 * It selects the different types of input selected.
 *
 * @param {string} parameter -.
 * @param {BufferEncoding} encoding -.
 * @returns {Promise}
 */
export async function input( parameter, encoding ) {
    if ( command.input.type === 'file' )
        
        await reading( parameter, encoding )
    /**
     * If the input type is a string.
     */
    else if ( command.input.type === 'string' ) {
        
        let stringObject = command.input.string
        
        if ( command.input.object === true )
            stringObject = await inObject( command.input.string )
        
        
        let buffer
        // eslint-disable-next-line default-case
        switch ( parameter ) {
            case 'encode':
                buffer = Buffer.from( stringObject, 'utf-8' )
                break
            case 'decode':
                buffer = Buffer.from( stringObject, 'base64' )
                break
        }
        await action( parameter, buffer, encoding )
    }
}

/**
 * The writing process.
 *
 * @returns {Promise | PromiseFulfilledResult<boolean> | PromiseRejectedResult<Error>}
 */
export async function writing( ) {
    
    let writeProcess = false
    
    if ( command.output.out.write === true && command.data !== null ) {
        
        writeProcess = await writeFile( command.output.string, command.data )
            .then( () => true )
            .catch( error => error.message )
    }
    
    switch ( writeProcess ) {
        
        case true:
            if ( command.output.type === 'stdout' )
                process.exit( 0 )
            
            
            if ( command.output.type === 'json' )
                process.exit( 0 )
            
            break
        case false:
            
            break
        default:
            
            console.error( writeProcess )
            process.exit( 1 )
            break
    }
    
}

/**
 * The reading process.
 *
 * @param {string} parameter -.
 * @param {BufferEncoding} encoding -.
 * @returns {Promise<void>}
 */
async function reading( parameter, encoding ) {
    const check = await accessCheck( command.input.string )
    
    switch ( check ) {
        
        case true:
            await readFile( command.input.string, { encoding: 'utf-8' } )
                .then(
                    async string => {
                        
                        if ( string.length > 0 ) {
                            
                            let stringObject = string
                            
                            if ( command.input.object === true )
                                stringObject = await inObject( string )
                            
                            
                            let buffer
                            
                            // eslint-disable-next-line default-case
                            switch ( parameter ) {
                                case 'encode':
                                    buffer = Buffer.from( stringObject, 'utf-8' )
                                    break
                                case 'decode':
                                    buffer = Buffer.from( stringObject, 'base64' )
                                    break
                            }
                            
                            await action( parameter, buffer, encoding )
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

/**
 * It checks if the file exists and if the process has permissions in reading. When the flag --file is set.
 *
 * @param {string} filename - The filename specified at the --file flag.
 * @returns {Promise<boolean>}
 */
async function accessCheck( filename ) {
    
    return access( filename, constants.F_OK | constants.R_OK )
        .then( () => true )
        .catch( error => error.message )
}

/**
 * It extracts the encoded or decoded string from JSON string/file.
 *
 * @param {Buffer|string} string - The buffer or the string.
 * @returns {Promise | PromiseFulfilledResult<string>| PromiseRejectedResult<TypeError|SyntaxError>}
 */
async function inObject( string ) {
    return parse( string )
        .then( json => json.string )
        .catch( error => {
            console.error( '\x1b[31m', 'check the provided json file for errors -> ', `[${ error }]`, '\x1b[0m' )
            process.exit( 1 )
        } )
}

/**
 * The commands switcher.
 *
 * @param {string} command - The command to be executed.
 * @param {Buffer} buffer - The buffer.
 * @param {BufferEncoding} encoding - The buffer encoding.
 * @returns {Promise | PromiseRejectedResult<Error>}
 */
async function action( command, buffer, encoding ) {
    
    // eslint-disable-next-line default-case
    switch ( command ) {
        
        case 'encode':
            await compress( buffer )
                .then( async data => {
                    
                    await output( data, encoding )
                    
                } )
                .catch( error => {
                    console.error( error )
                    process.exit( 1 )
                } )
            break
        
        case 'decode':
            await decompress( buffer )
                .then( async data => {
                    
                    await output( data, encoding )
                    
                } )
                .catch( error => {
                    console.error( error )
                    process.exit( 1 )
                } )
            break
        
    }
}

/**
 * The output process of printing the results and setting the data to be saved in files if selected.
 *
 * @param {Buffer} data - The buffer of data.
 * @param {BufferEncoding} encoding - The buffer encoding.
 */
function output( data, encoding ) {
    
    if ( command.output.type === 'stdout' ) {
        if ( command.output.out.print === true ) {
            if ( command.output.out.spawn === true )
                process.stdout.write( `${data.toString( encoding )}` )
            else if( command.output.out.spawn === false )
                console.log( `${data.toString( encoding )}` )
            
        }
        if ( command.output.out.write === false )
            process.exit( 0 )
        
        command.data = data.toString( encoding )
    } else if ( command.output.type === 'json' ) {
        
        if ( command.output.out.print === true ) {
            if ( command.output.out.spawn === true )
                process.stdout.write( `${ JSON.stringify( { string: data.toString( encoding ) } ) }` )
            else if( command.output.out.spawn === false )
                console.log( `${ JSON.stringify( { string: data.toString( encoding ) } ) }` )
            
        }
        
        if ( command.output.out.write === false )
            process.exit( 0 )
        
        command.data = JSON.stringify( { string: data.toString( encoding ) } )
    }
}
