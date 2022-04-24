import { OftypesError, resolvers, undefined_ } from 'oftypes'

/**
 * - --no-compression type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|boolean, void, OftypesError|boolean>}
 */
export async function * no_compression_flag( arg ){

    const truthy = () => true
    const falsy = async () => new OftypesError( '--no-compression doesn\'t accept any argument' )
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
