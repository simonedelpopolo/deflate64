import { access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - --file[-f] type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * file_flag( arg ){

    const truthy = () => new OftypesError( 'must be provided a path to a file' )
    const falsy = async () => {
        const error = await access( arg, constants.F_OK | constants.R_OK ).catch( error => error )
        if( error instanceof Error ) {
            await exit( error.code === 'ENOENT'
                ?`file ${arg} not found`
                :`file ${arg} permission not satisfied`,
            new ReferenceError( '♠ --file error︎' ),
            error_code.FLAG )
        }

        return arg
    }
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
