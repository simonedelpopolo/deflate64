#!/usr/bin/env node
import { d64 } from './index.js'

// It gets the command line arguments splicing out from `process.argv` the paths for node and d64.js
process.argv.splice( 0, 2 )

/**
 * Entry point to deflate64.
 */
await d64( process.argv )

process.exit( 0 )
