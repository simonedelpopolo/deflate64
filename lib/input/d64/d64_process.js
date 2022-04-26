import { Blaze } from '@cli-blaze/decors'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { file_flag } from './flag/file_flag.js'
import { json_flag } from './flag/json_flag.js'
import { no_compression_flag } from './flag/no_compression_flag.js'
import { plain_flag } from './flag/plain_flag.js'
import { quiet_flag } from './flag/quiet_flag.js'
import { ratio_flag } from './flag/ratio_flag.js'
import { remote_flag } from './flag/remote_flag.js'
import { save_flag } from './flag/save_flag.js'
import { shadowing } from './shadowing.js'
import { string_flag } from './flag/string_flag.js'
import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - d64 process
 *
 * @param {Object<{[unknown:string]: any}>} parsed - process.argv
 * @returns {Promise<{}>}
 */
export async function d64_process( parsed ) {

    let break_for_loop = false
    const d64 = {
        command:{
            decode: null,
            encode: null,
            help: null
        },
        flag:{
            file: null,
            json: null,
            no_compression: false,
            plain: null,
            quiet: false,
            ratio: null,
            remote: undefined,
            save: undefined,
            string: null,
        }
    }

    for await ( const shadow of await shadowing( parsed.keys ) ){
        if( shadow instanceof Error )
            await exit( shadow.message, new OftypesError( '♠︎' ), error_code.FLAG )
    }

    const d64_commandKeys = Object.keys( d64.command )
    for ( const selected_command in d64_commandKeys ) {

        if ( !( parsed.keys.includes( d64_commandKeys[ selected_command ] ) ) )
            delete d64.command[ d64_commandKeys[ selected_command ] ]
    }

    for ( const flag in parsed.keys ) {

        if ( break_for_loop )
            break

        switch ( parsed.keys[ flag ] ) {

            case 'decode': {

                const truthy = () => {
                    delete parsed.object.decode
                    parsed.keys.splice( 0, 1 )
                }
                const falsy = async () => exit( 'decode command doesn\'t accept any argument', new SyntaxError( '♠︎' ), error_code.COMMAND )
                await ( await undefined_( parsed.object.encode, await resolvers( truthy, falsy ) ) )()

                d64.command.decode = true
            }
                break_for_loop = true
                break

            case 'encode': {

                const truthy = () => {
                    delete parsed.object.encode
                    parsed.keys.splice( 0, 1 )
                }
                const falsy = async() => exit( 'encode command doesn\'t accept any argument', new SyntaxError( '♠︎' ), error_code.COMMAND )
                await ( await undefined_( parsed.object.encode, await resolvers( truthy, falsy ) ) )()

                d64.command.encode = true
            }
                break_for_loop = true
                break

            case 'v':
            case 'version':

                console.log( await ( await import( '../../../package.json', { assert: { type: 'json' } } ) ).default.version )
                process.exit( 0 )
                break

            default: {

                let error = `        command '${ Blaze.red( parsed.keys[ flag ] ) }' not recognize
        run -> ${ Blaze.blue( process.title ) } help        `

                await exit( error, new SyntaxError( `${ process.title } ♠︎` ), error_code.COMMAND )
            }
        }
    }

    const d64Flags = Object.keys( parsed.object )

    for ( const flag in d64Flags ) {

        switch ( d64Flags[ flag ] ) {

            case 'f':
            case 'file':

                for await ( const type of await file_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.file = type
                }

                delete d64.flag.string
                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )

                continue

            case 'j':
            case 'json': {

                let file = false
                if ( d64.flag.file !== null )
                    file = true

                for await ( const type of await json_flag( parsed.object[ d64Flags[ flag ] ], file ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )


                    d64.flag.json = type
                }


                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )
            }

                continue

            case 'no_compression':

                for await ( const type of await no_compression_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.no_compression = type
                }

                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )

                continue

            case 'p':
            case 'plain':

                for await ( const type of await plain_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.plain = type
                }

                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )

                continue

            case 'q':
            case 'quiet':

                for await ( const type of await quiet_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.quiet = type
                }

                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )

                continue

            case 'a':
            case 'ratio':

                for await ( const type of await ratio_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.ratio = type
                }

                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )

                continue

            case 'r':
            case 'remote':

                for await ( const type of await remote_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.remote = type
                }

                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )

                continue

            case 'o':
            case 'save':

                for await ( const type of await save_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.save = type
                }

                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )

                continue

            case 's':
            case 'string': {

                for await ( const type of await string_flag( parsed.object[ d64Flags[ flag ] ] ) ) {
                    if ( type instanceof Error )
                        await exit( type.message, new OftypesError( '♠︎' ), error_code.FLAG )

                    d64.flag.string = type
                }

                delete d64.flag.file
                delete parsed.object[ d64Flags[ flag ] ]
                parsed.keys.splice( 0, 1 )
            }
                break

            default: {
                let error = `        flag '${ Blaze.red( d64Flags[ flag ] ) }' not recognize
        run -> ${ Blaze.blue( process.title ) } help        `

                await exit( error, new SyntaxError( `${ process.title } ♠︎` ), error_code.FLAG )
            }
        }
    }

    return d64
}
