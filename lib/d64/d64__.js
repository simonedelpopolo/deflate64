import { constants } from 'fs'
import { promisify } from 'util'
import { true_false } from 'boolean-jokes'
import { access, readFile, writeFile } from 'fs/promises'
import { array_, boolean_, null_, undefined_ } from 'oftypes'
import { compression, remote, } from '../../index.js'
import { deflate, inflate } from 'zlib'
import { is_json, parse } from 'json-swiss-knife'

const compress = promisify( deflate )
const decompress = promisify( inflate )

export let returning = false

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
            stderr( `${error}` )
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
        if( argv.length === 0 ) {
            stderr( '\n' )
            stderr( '\x1b[41m         try -> `d64 help`\x1b[0m' )
            stderr( '\n\n' )
            process.exit( 1 )
        }
    },

    stderr: ( message ) => {
        process.stderr.write( message )
    },

    stdout: ( message ) => {
        process.stdout.write( message )
    },

}

/**
 * Wrap to process.stderr.write.
 *
 * @param {string|any} message - The message to the stderr.
 */
export function stderr( message ){
    d64__.stderr( message )
}

/**
 * Wrap to process.stderr.out.
 *
 * @param {string|any} message - The message to the stdout.
 */
export function stdout( message ){
    d64__.stdout( message )
}

/**
 * @type {{input: {string: string, type: string, object: boolean}}, {output: {string: string, type: string, out: {spawn:boolean, print: boolean, write: null|boolean}}, data: null | buffer | string}}
 */
export let command = {
    input: {
        remote: '',
        string: '',
        type: '',
        object: false,
    },
    output: {
        string: '',
        type: 'stdout',
        json_map: null,
        out: {
            quiet: false,
            write: false,
            print: true,
        },
    },
    compression: true,
    ratio: {
        print: false,
        data: {
            in: 0,
            out: 0,
            result: 0
        }
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

    if (
        flagsObjectKeys.includes( '--save' ) === false ||
        flagsObjectKeys.includes( '-o' ) === false
    )
        command.output.out.write = false

    if (
        flagsObjectKeys.includes( '--quiet' ) === false ||
        flagsObjectKeys.includes( '-q' ) === false
    )
        command.output.out.quiet = false

    for ( const flag in flags ) {

        switch ( flag ) {

            case '-f':
            case '--file':

                if (
                    flagsObjectKeys.includes( '--remote' ) === true ||
                    flagsObjectKeys.includes( '-r' ) === true
                )
                    continue

                command.input.string = flags[ flag ]
                command.input.type = 'file'

                continue
            case '-s':
            case '--string':

                if (
                    flagsObjectKeys.includes( '--remote' ) === true ||
                    flagsObjectKeys.includes( '-r' ) === true
                )
                    continue

                command.input.string = flags[ flag ]
                command.input.type = 'string'

                continue
            case '-r':
            case '--remote':

                command.input.remote = flags[ flag ]
                command.input.type = 'remote'

                continue
            case '-o':
            case '--save':

                command.output.string = flags[ flag ]
                command.output.out.write = true

                continue

            case '-j':
            case '--json': {

                const jsonValue = flags[ flag ]
                const jsonCheck = await true_false( jsonValue )

                // A todo going to accept json string as flag value
                if ( boolean_( jsonCheck ) !== true ) {

                    const isJson = await is_json( jsonValue, true )

                    if( isJson !== true ) {
                        stderr( '\n\x1b[31m' )
                        stderr( `check the json string, something doesn't work -> ${jsonValue}\n` )
                        stderr( `json error message -> [ ${isJson} ]` )
                        stderr( '\x1b[0m\n\n' )
                        process.exit( 1 )
                    }

                    command.output.json_map = Object.keys( await parse( jsonValue ) )[ 0 ]
                    command.output.out.print = true
                    command.output.type = 'json'
                    if( flagsObjectKeys.includes( '-n' ) || flagsObjectKeys.includes( '--no-json-out' ) ) {

                        let no_js_out = await true_false( flags[ '-n' ] ) || await true_false( flags[ '-n' ] )
                        if( no_js_out === false )
                            command.output.type = 'json'
                        else
                            command.output.type = 'stdout'
                    }

                    continue
                }
                command.output.out.print = await true_false( flags[ flag ] )
                command.output.type = 'json'

            }
                continue
            case '-i':
            case '--in-object':

                command.input.object = await true_false( flags[ flag ] )

                continue

            case '-n':
            case '--no-json-out':

                if( await true_false( flags[ flag ] ) === true )
                    command.output.type = 'stdout'
                else
                    command.output.type = 'json'

                continue
            case '-a':
            case '--ratio':

                if( flagsObjectKeys.includes( '--ratio' ) || flagsObjectKeys.includes( '-a' ) )
                    command.ratio.print = await true_false( flags[ flag ] )

                continue
            case '-c':
            case '--compression':

                if( flagsObjectKeys.includes( '--compression' ) || flagsObjectKeys.includes( '-c' ) )
                    command.compression = await true_false( flags[ flag ] )

                continue
            case '-q':
            case '--quiet':
            case '--spawn':

                command.output.out.quiet = await true_false( flags[ flag ] )
                continue

            default:

                break
        }
    }
}

let inObjectProperty = 'string'

/**
 * It maps the --json property to the output.
 *
 * @param {string} stringObject - The given stringObject argument.
 */
async function jsonMap( stringObject ){
    if( await null_( command.output.json_map ) === false )
        inObjectProperty = command.output.json_map

    if( await undefined_( stringObject[ inObjectProperty ] ) === true ) {
        stderr( stringObject )
        process.exit( 1 )
    }
}

let buffer
/**
 * It dispatches the correct encoding to the action function.
 *
 * @param {string} parameter - The given parameter argument.
 * @param {string} stringObject - The given stringObject argument.
 * @param {BufferEncoding} encoding - The given encoding argument.
 */
async function dispatch( parameter, stringObject, encoding ){
    // eslint-disable-next-line default-case
    switch ( parameter ) {
        case 'encode':
            buffer = Buffer.from( stringObject, 'utf-8' )
            command.ratio.data.in = Buffer.byteLength( buffer )
            break
        case 'decode':
            buffer = Buffer.from( stringObject, 'base64' )
            command.ratio.data.in = Buffer.byteLength( buffer )
            break
    }

    await action( parameter, buffer, encoding )
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
    else if ( command.input.type === 'string' || command.input.type === 'remote' ) {

        let stringObject

        // eslint-disable-next-line default-case
        switch( command.input.type ){

            case 'string':
                stringObject = command.input.string
                break
            case 'remote':
                stringObject = await remote( command.input.remote )
                break
        }

        if ( command.input.object === true ) {

            stringObject = await inObject( command.input.string )

            await jsonMap( stringObject )

            stringObject = stringObject[ inObjectProperty ]
        }

        await dispatch( parameter, stringObject, encoding )
    }
}

/**
 * The writing process.
 *
 * @returns {Promise | PromiseFulfilledResult<boolean> | PromiseRejectedResult<Error>}
 */
export async function writing( ) {

    let writeProcess = false

    if ( command.output.out.write === true && await null_( command.data ) === false ) {

        writeProcess = await writeFile( command.output.string, command.data )
            .then( () => true )
            .catch( error => error.message )
    }

    switch ( writeProcess ) {

        case true:
            if ( command.output.type === 'stdout' )
                return returning

            if ( command.output.type === 'json' )
                return returning

            break
        case false:

            break
        default:

            stderr( writeProcess )
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

                            if ( command.input.object === true ) {
                                stringObject = await inObject( string )

                                await jsonMap( stringObject )

                                stringObject = stringObject[ inObjectProperty ]
                            }

                            await dispatch( parameter, stringObject, encoding )
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
 * @returns {string | Promise | PromiseFulfilledResult<string>| PromiseRejectedResult<TypeError|SyntaxError>}
 */
async function inObject( string ) {
    return parse( string )
}

/**
 * The commands switcher.
 *
 * @param {string} argv_command - The command to be executed.
 * @param {Buffer} buffer - The buffer.
 * @param {BufferEncoding} encoding - The buffer encoding.
 * @returns {Promise | PromiseRejectedResult<Error>}
 */
async function action( argv_command, buffer, encoding ) {

    // eslint-disable-next-line default-case
    switch ( argv_command ) {

        case 'encode':

            if( command.compression === true ){
                await compress( buffer )
                    .then( async data => {
                        await output( data, encoding )
                    } )
                    .catch( error => {
                        stderr( error )
                        process.exit( 1 )
                    } )
            }else
                await output( buffer, encoding )

            break

        case 'decode':

            if( command.compression === true ){
                await decompress( buffer )
                    .then( async data => {
                        await output( data, encoding )
                    } )
                    .catch( error => {
                        stderr( error )
                        process.exit( 1 )
                    } )
            }else
                await output( buffer, encoding )
            break

    }
}

/**
 * The output process of printing the results and setting the data to be saved in files if selected.
 *
 * @param {Buffer} data - The buffer of data.
 * @param {BufferEncoding} encoding - The buffer encoding.
 * @returns {Promise<string>}
 */
async function output( data, encoding ) {

    command.ratio.data.out = Buffer.byteLength( data )

    compression()

    if ( command.output.type === 'stdout' ) {

        if ( command.output.out.print === true ) {

            if ( command.output.out.quiet === true ){

                if( command.ratio.print === true ) {
                    returning = {
                        data:`${ data.toString( encoding ) }`,
                        ratio: command.ratio.data
                    }
                }
                else
                    returning = `${ data.toString( encoding ) }`
            }

            else if( command.output.out.quiet === false ) {

                if( command.ratio.print === true ) {
                    returning = {
                        data:`${ data.toString( encoding ) }`,
                        ratio: command.ratio.data
                    }
                    console.log( returning )
                }
                else {
                    console.log( `${ data.toString( encoding ) }` )
                    returning = `${ data.toString( encoding ) }`
                }
            }

        }
        if ( command.output.out.write === false )
            return returning

        command.data = data.toString( encoding )
    } else if ( command.output.type === 'json' ) {

        if ( command.output.out.print === true ) {

            if ( command.output.out.quiet === true ) {

                if ( command.ratio.print === true ) {

                    if( await null_( command.output.json_map ) === false ){
                        let json = {}
                        json[ command.output.json_map ] = data.toString( encoding )

                        returning = {
                            data: JSON.stringify( json ),
                            ratio: command.ratio.data,
                        }

                    }else{
                        returning = {
                            data: JSON.stringify( { string: data.toString( encoding ) } ),
                            ratio: command.ratio.data,
                        }
                    }


                } else{
                    if( await null_( command.output.json_map ) === false ){
                        let json = {}
                        json[ command.output.json_map ] = data.toString( encoding )
                        returning = JSON.stringify( json )
                    }else
                        returning = JSON.stringify( { string: data.toString( encoding ) } )
                }


            } else if( command.output.out.quiet === false ) {

                if ( command.ratio.print === true ) {

                    if( await null_( command.output.json_map ) === false ){
                        let json = {}
                        json[ command.output.json_map ] = data.toString( encoding )

                        returning = {
                            data: JSON.stringify( json ),
                            ratio: command.ratio.data,
                        }
                        console.log( returning )

                    }else{
                        returning = {
                            data: JSON.stringify( { string: data.toString( encoding ) } ),
                            ratio: command.ratio.data,
                        }
                        console.log( returning )
                    }

                } else{
                    if( await null_( command.output.json_map ) === false ){
                        let json = {}
                        json[ command.output.json_map ] = data.toString( encoding )

                        returning = JSON.stringify( json )
                        console.log( returning )
                    }else {
                        console.log( `${ JSON.stringify( { string: data.toString( encoding ) } ) }` )
                        returning = `${ JSON.stringify( { string: data.toString( encoding ) } ) }`
                    }
                }
            }
        }

        if ( command.output.out.write === false )
            return returning

        if( await null_( command.output.json_map ) === false ){
            let json = {}
            json[ command.output.json_map ] = data.toString( encoding )

            command.data = JSON.stringify( json )
        }else
            command.data = JSON.stringify( { string: data.toString( encoding ) } )
    }
}

