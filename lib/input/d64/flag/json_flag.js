import { json_map } from '../../../d64/shared/json_option.js'
import { is_json, parse } from 'json-swiss-knife'
import { OftypesError, resolvers, string_, undefined_ } from 'oftypes'

/**
 * - --json[-j] type check
 *
 * @param {string} arg - value
 * @yields
 * @returns {AsyncGenerator<OftypesError|string, void, OftypesError|string>}
 */
export async function * json_flag( arg ){

    const truthy = () => true
    const falsy = async () => {

        const truthy = async () => {
            if( await is_json( arg ) ) {

                const d64Object = await parse( arg )

                if( ! d64Object.map )
                    return new OftypesError( '--json[-j] required a json string including a map property' )

                if( ! d64Object[ d64Object.map ] )
                    return new OftypesError( '--json[-j] the value of map property is the name where extract or inject de deflate64 job' )

                json_map[ 0 ] = d64Object

                return false
            }

            return new OftypesError( '--json[-j] accepts only json string' )
        }
        const falsy = () => new OftypesError( '--json[-j] accepts only string' )

        return ( await string_( arg, await resolvers( truthy, falsy ) ) )()
    }
    yield await ( await undefined_( arg, await resolvers( truthy, falsy ) ) )()

}
