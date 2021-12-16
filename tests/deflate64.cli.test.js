import { spawn } from 'child_process'
import { parse } from '@simonedelpopolo/json-parse'

test( 'testing deflate64 cli help command exit code equal to 0', async () => {
    const deflate64 = spawn( './deflate64.js', [
        'help',
        'encode',
    ] )
    
    deflate64.on( 'exit', exitCode => {
        expect( exitCode )
            .toBe( 0 )
    } )
} )

test('testing deflate64 output of json string spawning a process and digest the output', async () => {
    
    const deflate64 = spawn('./deflate64.js', [
        'encode',
        '--string', 'hello',
        '--json', 'true',
    ])
    
    deflate64.stdout.on('data', async chunk => {
        expect(await parse(chunk)).toStrictEqual({string:'eJzLSM3JyQcABiwCFQ=='})
    })
})

test('testing deflate64 decode output the decoded string from json spawning a process and digest the output', async () => {
    
    const deflate64 = spawn('./deflate64.js', [
        'decode',
        '--string', '{"string":"eJzLSM3JyQcABiwCFQ=="}',
        '--in-object', 'true',
        '--spawn', 'true'
    ])
    
    
    deflate64.stdout.on('data', chunk => {
        expect(`${chunk}`).toBe('hello')
    })
})

