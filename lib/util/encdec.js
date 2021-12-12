import { access, readFile, writeFile } from 'fs/promises'
import { deflate, inflate } from 'zlib'
import { constants } from 'fs'
import { parse } from '@simonedelpopolo/json-parse'
import { promisify } from 'util'

const compress = promisify( deflate )
const decompress = promisify( inflate )

/**
 * @type {{input: {string: string, type: string, object: boolean}}, {output: {string: string, type: string, out: {print: boolean, write: null|boolean}}, data: null | buffer | string}}
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
            write: 'false',
            print: true,
        },
    },
    data: null,
}


/**
 *
 * @param parameter {string}
 * @param encoding {BufferEncoding}
 * @returns {Promise<void>}
 */
export async function input( parameter, encoding ) {
    if ( command.input.type === 'file' ) {
        
        await reading( parameter, encoding )
        /**
         * if the input type is a string,
         */
    } else if ( command.input.type === 'string' ) {
        
        let stringObject = command.input.string
        
        if ( command.input.object === true ) {
            stringObject = await inObject( command.input.string )
        }
        
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
 *
 * @param filename {string}
 * @param data {Buffer}
 * @returns {Promise<boolean> | Promise<string>}
 */
export async function writing( filename, data ) {
    
    return await writeFile( filename, data )
        .then( () => true )
        .catch( error => error.message )
}

/**
 *
 * @param parameter {string}
 * @param encoding {BufferEncoding}
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
                            
                            if ( command.input.object === true ) {
                                stringObject = await inObject( string )
                            }
                            
                            let buffer
                            
                            // eslint-disable-next-line default-case
                            switch (parameter){
                                case 'encode':
                                    buffer = Buffer.from(stringObject, 'utf-8')
                                    break
                                case 'decode':
                                    buffer = Buffer.from(stringObject, 'base64')
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
 * @param filename
 * @returns {Promise<boolean>}
 */
async function accessCheck( filename ) {
    
    return await access( filename, constants.F_OK | constants.R_OK )
        .then( () => true )
        .catch( error => error.message )
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

/**
 *
 * @param command {string}
 * @param buffer {Buffer}
 * @param encoding {BufferEncoding}
 * @returns {Promise<void>}
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
 * @param data {Buffer}
 * @param encoding {BufferEncoding}
 * @returns {Promise<void>}
 */
function output( data, encoding ) {
    
    if ( command.output.type === 'stdout' ) {
        if ( command.output.out.print === true ) {
            console.log( data.toString( encoding ) )
        }
        if ( command.output.out.write === false ) {
            process.exit( 0 )
        }
        command.data = data.toString( encoding )
    } else if ( command.output.type === 'json' ) {
        
        if ( command.output.out.print === true ) {
            console.log( JSON.stringify( { string: data.toString( encoding ) } ) )
        }
        
        if ( command.output.out.write === false ) {
            process.exit( 0 )
        }
        
        command.data = JSON.stringify( { string: data.toString( encoding ) } )
    }
}
