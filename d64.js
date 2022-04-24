#!/usr/bin/env node --experimental-json-modules
import { d64_process } from './lib/input/d64/d64_process.js'
import { entry_point } from '@cli-blaze/input'
import { selection } from './lib/d64/selection.js'

// It gets the command line arguments splicing out from `process.argv` the paths for node and d64.js
process.argv.splice( 0, 2 )

process.title = 'd64'

/**
 * Entry point to deflate64.
 */
const d64 = await entry_point( process.argv, { d64: d64_process, executable:[ 'd64' ] } )

switch ( Object.keys( d64[ 'command' ] )[ 0 ] ) {

    case 'decode':

        await selection( 'decode', d64.flag )

        break

    case 'encode':

        await selection( 'encode', d64.flag )

        break

    case 'help':

        break

    default:

        break

}
