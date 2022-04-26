import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - --plain type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|boolean, void, OftypesError|boolean>}
 */
export async function * plain_flag( arg ){

    const truthy = () => true
    const falsy = async () => new OftypesError( '--plain doesn\'t accept any argument' )
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
