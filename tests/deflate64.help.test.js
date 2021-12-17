import { spawn } from 'child_process'

describe( `\x1b[31m ↓  the help command, always exit with code 2 \x1b[0m
\t{string} command -> \`help\`
`, ()=>{
    test( 'testing deflate64 help', async () => {
        const deflate64 = spawn( './executable.js', [
            'help'
        ] )
        
        deflate64.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 2 )
        } )
    } )
    
    test( 'testing deflate64 help without any argument', async () => {
        const deflate64 = spawn( './executable.js' )
        
        deflate64.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 2 )
        } )
    } )
    
    test( 'testing deflate64 help, command not found', async () => {
        const deflate641 = spawn( './executable.js', [
            'help',
            'command_not_found'
        ] )
        
        deflate641.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 2 )
        } )
    } )
    
    test( 'testing deflate64 help decode', async () => {
        const deflate641 = spawn( './executable.js', [
            'help',
            'decode'
        ] )
        
        deflate641.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 2 )
        } )
    } )
    
    test( 'testing deflate64 help encode', async () => {
        const deflate641 = spawn( './executable.js', [
            'help',
            'encode'
        ] )
        
        deflate641.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 2 )
        } )
    } )
    
    test( 'testing deflate64 help, flag not found', async () => {
        const deflate641 = spawn( './executable.js', [
            'help',
            '--flag_not_found'
        ] )
        
        deflate641.on( 'exit', exitCode => {
            expect( exitCode )
                .toBe( 2 )
        } )
    } )
})

