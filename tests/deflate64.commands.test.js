import { parse } from '@simonedelpopolo/json-parse'
import { spawn } from 'child_process'

describe( `\x1b[31m ↓  the encoding/decoding commands returning values using --spawn flag, always exit with code 0 \x1b[0m
\t{string} command -> \`encode\` | \`decode\`
`, () => {
    
    test( 'testing deflate64 output of json string spawning a process and digest the output', async () => {
        
        const deflate64 = spawn( './executable.js', [
            'encode',
            '--string',
            'hello',
            '--json',
            'true',
            '--spawn',
            'true'
        ] )
        
        deflate64.stdout.on( 'data', async chunk => {
            expect( await parse( chunk ) )
                .toStrictEqual( { string: 'eJzLSM3JyQcABiwCFQ==' } )
        } )
    
        deflate64.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 0 )
        } )
    } )
    
    test( 'testing deflate64 decode output the decoded string from json spawning a process and digest the output', async () => {
        
        const deflate64 = spawn( './executable.js', [
            'decode',
            '--string',
            '{"string":"eJzLSM3JyQcABiwCFQ=="}',
            '--in-object',
            'true',
            '--spawn',
            'true',
        ] )
        
        deflate64.stdout.on( 'data', chunk => {
            expect( `${ chunk }` )
                .toBe( 'hello' )
        } )
        
        deflate64.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 0 )
        } )
    } )
} )
