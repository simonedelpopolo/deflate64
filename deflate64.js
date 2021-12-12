#!/usr/bin/env node
import deflate64 from './index.js'

// get the command line arguments slicing out nodejs path and deflate64.js path from process.argv
const argv = process.argv.slice( 2 )

await deflate64( argv )

