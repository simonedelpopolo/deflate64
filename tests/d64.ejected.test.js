import * as tttt from 'trythistrythat'
import { d64 } from '../index.js'

/**
 * Module filename - /Volumes/code/deflate64/tests/d64.ejected.test.js
 *
 * @param {string} id - UNIT-test
 * @returns {Promise<void> | void}
 */
export default async ( id ) => {

    tttt.describe( '# ' )
    await tttt.separator( 240, 75, '~' )
    await tttt.line()

    const options = {
        remote:'https://github.com/simonedelpopolo/koorie',
        ratio: undefined
    }

    tttt.describe( await d64( 'encode', options ).catch( error => error ) )

    tttt.end_test( id )
}
