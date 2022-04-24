import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - checking --remote[-r] flag
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * remote_flag( arg ){

    const truthy = () => new OftypesError( '--remote="https://must/be/provided/a/https/url"' )
    const falsy = () => arg
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
