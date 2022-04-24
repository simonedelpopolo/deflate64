#!/usr/bin/env node --experimental-json-modules
import { d64_process } from './lib/input/d64/d64_process.js'
import { decode } from './lib/d64/decode.js'
import { encode } from './lib/d64/encode.js'
import { entry_point } from '@cli-blaze/input'

// It gets the command line arguments splicing out from `process.argv` the paths for node and d64.js
process.argv.splice( 0, 2 )

process.title = 'd64'

/**
 * Entry point to deflate64.
 */
const d64 = await entry_point( process.argv, { d64: d64_process, executable:[ 'd64' ] } )

switch ( Object.keys( d64[ 'command' ] )[ 0 ] ) {

    case 'decode':

        await decode( d64.flag )

        break

    case 'encode':

        await encode( d64.flag )

        break

    case 'help':

        break

    default:

        break

}
