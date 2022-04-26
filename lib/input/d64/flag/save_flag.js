import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - --save[-o] type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * save_flag( arg ){

    const truthy = () => new OftypesError( 'must be provided a string' )
    const falsy = () => arg
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
