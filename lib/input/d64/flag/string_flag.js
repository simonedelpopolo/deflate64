import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - checking --string[-s] flag
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * string_flag( arg ){

    const truthy = () => new OftypesError( 'must be provided a string' )
    const falsy = () => arg
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
