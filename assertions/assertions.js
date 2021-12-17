import { spawn } from 'child_process'
import { parse } from '@simonedelpopolo/json-parse'
import { deepEqual, ok } from 'assert/strict'

const assertion0 = () => {
    
    let expectedObject = { string: 'eJzLSM3JyQcABiwCFQ==' }
    console.log( `\x1b[31m It checks if the returning variable is of type Object and if the exit code is`, 0, '\x1b[0m' )
    
    const deflate64 = spawn( '../executable.js', [
        'encode',
        '--string',
        'hello',
        '--json',
        'true',
    ] )
    
    deflate64.stdout.on( 'data', async chunk => {
        deepEqual( await parse( chunk ), expectedObject )
    } )
    
    deflate64.on( 'exit', exitCode => {
        ok( exitCode === 0 )
    } )
}

const assertion1 = () => {
    
    const expectedBuffer = Buffer.from( 'hello' )
    console.log( `\x1b[31m It checks if the returning variable is of type Buffer is`, Buffer.isBuffer( expectedBuffer ), '\x1b[31mand if the exit code is', 0, '\x1b[0m' )
    
    const deflate64 = spawn( '../executable.js', [
        'decode',
        '--string',
        '{"string":"eJzLSM3JyQcABiwCFQ=="}',
        '--in-object',
        'true',
        '--spawn',
        'true',
    ] )
    
    deflate64.stdout.on( 'data', async chunk => {
        deepEqual( chunk, expectedBuffer )
    } )
    
    deflate64.on( 'exit', exitCode => {
        ok( exitCode === 0 )
    } )
}

assertion0()
assertion1()

