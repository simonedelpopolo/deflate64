/* eslint-disable */
import { spawn } from 'child_process'

test( 'testing deflate64 cli help command exit code equal to 0', async () => {
    const deflate64 = spawn( 'deflate64', [
        'help',
        'encode',
    ] )
    
    deflate64.on( 'exit', exitCode => {
        expect( exitCode )
            .toBe( 0 )
    } )
    
} )
