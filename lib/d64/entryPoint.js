import d64 from '../d64.js'
import { undefined_ } from 'oftypes'
import {
    arguments_,
    decode,
    encode,
    flag,
    help,
    version
} from './../../index.js'
import { d64__, stderr, stdout } from './d64__.js'


/**
 * @type {symbol}
 */
export const entryPointSymbol = Symbol( 'd64 function entryPoint( argv: string[]):any' )
export const entryPoint = Object.defineProperty( d64, entryPointSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,

    /**
     * Deflate 64 entry point.
     *
     * @param {string[]} argv - Process.argv.splice( 0, 2 ) command line arguments splicing out from `process.argv` the paths for node and d64.js.
     * @returns {Promise | PromiseFulfilledResult<any> | PromiseRejectedResult<any>}
     */
    value: async function entryPoint( argv ){

        await d64__.types( argv )
        await d64__.length( argv )

        /**
         * Flag for the command not available.
         *
         * @returns {Promise<>}
         */
        async function noFlag( ){
            return flag( flags )
                .then( object => object )
                .catch( async reason => {
                    await help( undefined, 'list-available' )
                    stderr( '\x1b[31m' )
                    stderr( `command: [ ${ command } ]\n\n` )
                    stderr( `${ reason.message }\n` )
                    stderr( `given flags: ${ JSON.stringify( reason.flags ) }\x1b[0m\n\n` )
                    process.exit( 1 )
                } )
        }

        const { command, flags, command_help } = await arguments_( argv )
        const undefined_flags = await undefined_( flags )

        switch ( command ) {

            case 'help': {

                let flag = undefined
                if ( undefined_flags === false )
                    flag = flags === false ? undefined : flags[ 0 ]

                await help( command_help, flag )

                break
            }

            case 'e':
            case 'encode': {

                if ( undefined_flags === false && flags.length > 0 )
                    return encode( await noFlag( ) )

                break

            }

            case 'd':
            case 'decode': {

                if ( undefined_flags === false && flags.length > 0 )
                    return decode( await noFlag( ) )

                break

            }

            case 'v':
            case 'version': {

                stdout( `${version}` )

                return version
            }

            default: {

                let type = command.search( '[^--][a-z]*' ) !== 0 ? 'flag' : 'command'
                let message = type === 'flag' ? ', first parameter to d64 must be a command not a flag' : 'not available'

                await help( 'list-available' )
                stderr( `\x1b[31m${ type }: ${ command } ${ message }.\x1b[0m\n\n` )
                process.exit( 1 )
                break
            }
        }
    }
} )
