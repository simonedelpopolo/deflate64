import { exit } from '@cli-blaze/activity'
import json from './json.js'
import option from './shared/option.js'
import { readFile } from 'fs/promises'
import { is_json, parse } from 'json-swiss-knife'

/**
 * Read the file and return a Buffer
 *
 * @param {string} path - to filename
 * @returns {Buffer|object}
 */
export default async function toString( path ){

    if( option.json === false ) {

        const data = await readFile( path, { encoding:'utf8' } ).catch( error => exit( error.message ) )
        if( await is_json( data ) ) {

            json.ref = await parse( data )

            return false
        }

        await exit( 'no json data found in file' )
    }

    return readFile( path ).catch( error => exit( error.message ) )
}
