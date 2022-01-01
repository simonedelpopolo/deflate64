#!/usr/bin/env node
import deflate64 from './index.js'

// It gets the command line arguments splicing out from `process.argv` the paths for node and executable.js
process.argv.splice( 0, 2 )

/**
 * Entry point to deflate64.
 */
await deflate64( process.argv )

process.exit( 0 )
