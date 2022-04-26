import Blaze from '@cli-blaze/decors/lib/decors/blaze.js'
import { d64_data } from './d64/shared/d64pipeline.js'
import { d64_process } from './input/d64/d64_process.js'
import { entry_point } from '@cli-blaze/input'
import option from './d64/shared/option.js'
import { parse } from 'json-swiss-knife'
import { selection } from './d64/selection.js'
import { null_, oftype_, undefined_ } from 'oftypes'

/**
 * Module interface deflate64
 *
 * @param {string} action - chose decode/deflate
 * @param {d64Options} initializer - given
 * @returns {Promise<string|object>}
 */
export default async function deflate64( action, initializer ){

    option.ejected = true
    let rejection = false
    let resolution

    const action_list = [ 'decode', 'encode' ]

    if( ! ( action_list.includes( action ) ) ) {
        rejection = true
        resolution = `given action not recognized -> '${Blaze.red( action )}'`
    }else{
        if( await undefined_( initializer ) || await null_( initializer ) ) {
            rejection = true
            resolution = `given initializer is empty -> '${await oftype_( initializer )}'`
        }
    }

    return new Promise( ( resolve, reject ) => {

        if( rejection ) reject( resolution )
        else {
            resolve( ( async() => {
                const ejected_argv = [ action ]
                let argv = ''

                for ( const option in initializer ) {
                    argv = `--${ option.replace( /_/g, '-' ) }${ typeof initializer[ option ] === 'undefined' ? '' : '=' + initializer[ option ]  }`
                    ejected_argv.push( argv )
                }

                /**
                 * Entry point to deflate64.
                 */
                const d64 = await entry_point(
                    ejected_argv,
                    {
                        d64: d64_process,
                        executable:[ 'd64' ]
                    },
                    'd64'
                )

                const command = Object.keys( d64[ 'command' ] )[ 0 ]

                await selection( command, d64.flag )

                if( option.json !== false && option.json !== null ) return parse( d64_data.returns )
                else return d64_data.returns
            } )() )

        }
    } )
}
