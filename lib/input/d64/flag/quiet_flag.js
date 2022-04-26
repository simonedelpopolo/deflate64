import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - --quiet type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|boolean, void, OftypesError|boolean>}
 */
export async function * quiet_flag( arg ){

    const truthy = () => true
    const falsy = async () => new OftypesError( '--quiet doesn\'t accept any argument' )
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
