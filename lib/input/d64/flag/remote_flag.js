import Blaze from '@cli-blaze/decors/lib/decors/blaze.js'
import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - --remote[-r] type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * remote_flag( arg ){

    const truthy = () => new OftypesError( '--remote="https://must/be/provided/a/https/url"' )
    const falsy = async () => {
        try{
            const parsed_url = new URL( arg )
            if ( parsed_url.protocol !== 'https:' )
                await exit( `url ${Blaze.red( arg )} is valid but protocol required to be https`, new SyntaxError( '♠︎ --remote' ), error_code.FLAG )
        }catch ( error ) {
            await exit( `${error.message} -> ${Blaze.red( arg )}`, new OftypesError( '♠︎ --remote [ERR_INVALID_URL]' ), error_code.FLAG )
        }

        return arg
    }
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
