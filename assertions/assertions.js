console.time( 'assertions finished ' )
import deflate64 from '../index.js'
import { EventEmitter } from 'events'
import { ok } from 'assert'

const AssertionEvent = new EventEmitter()

AssertionEvent.on( 'end', () => {
    console.timeEnd( 'assertions finished ' )
} )

const Assertions = {
    
    assertion0 : async () => {
        console.log( '__________________________________________________________________________' )
    
        console.log( '\x1b[31m Assertions --spawn flag', 0, '\x1b[0m' )
        console.log( '    \x1b[31m the spawn flag is true', 0, '\x1b[0m' )
        console.log( '    \x1b[31m the spawn flag is false', 1, '\x1b[0m' )
    
        let response
        
        Assertions.assertion0.statement = {
            
            
            '0' : async ( ) => {
                
                console.log( '    \x1b[31m executing 64 when the spwan flag is true', 0, '\x1b[0m\n' )
                const GMF = 'good morning folks'
                
                // At first, we encode the string
                const encodedGMF = await deflate64( [ 'encode', '--string', GMF, '--spawn', 'true' ] )
                
                // At second, decode the string
                const goodMorningFolks = await deflate64( [ 'decode', '--string', encodedGMF, '--spawn', 'true' ] )
                
                // At third, we replace the word folks with buddies
                const goodMorningBuddies = goodMorningFolks.replace( 'folks', 'buddies' )
                
            
                try{
                    ok( typeof goodMorningFolks === 'object' )
                    response = goodMorningBuddies
                }catch ( error ) {
                    response = error
                }
    
                try{
                    ok( goodMorningFolks === GMF )
                    response = goodMorningBuddies
                }catch ( error ) {
                    response = error
                }
    
                try{
                    ok( goodMorningBuddies === 'good morning buddies' )
                    response = goodMorningBuddies
                }catch ( error ) {
                    response = error
                }
                
                Assertions.assertion0.statement[ '0' ].message = 'test concluded'
            
                return response
            },
        
            '1' : async ( ) => {
                console.log( '    \x1b[31m executing 64 when the spwan flag is false', 1, '\x1b[0m\n' )
                const GMF = 'good morning folks'
    
                // At first, we encode the string
                const encodedGMF = await deflate64( [ 'encode', '--string', GMF, '--spawn', 'false' ] )
    
                // At second, decode the string
                const goodMorningFolks = await deflate64( [ 'decode', '--string', encodedGMF, '--spawn', 'false' ] )
    
                // At third, we replace the word folks with buddies
                const goodMorningBuddies = goodMorningFolks.replace( 'folks', 'buddies' )
                
                try{
                    ok( typeof goodMorningFolks === 'object' )
                    response = goodMorningBuddies
                }catch ( error ) {
                    response = error
                }
    
                try{
                    ok( goodMorningFolks === GMF )
                    response = goodMorningBuddies
                }catch ( error ) {
                    response = error
                }
    
                try{
                    ok( goodMorningBuddies === 'good morning buddies' )
                    response = goodMorningBuddies
                }catch ( error ) {
                    response = error
                }
    
                Assertions.assertion0.statement[ '1' ].message = 'test concluded'
    
                return response
            }
        
        }
    
        console.log( '---------------------------------------------------------------------------' )
        const response0 = await Assertions.assertion0.statement[ '0' ]()
        console.log( Assertions.assertion0.statement[ '0' ].message )
        console.log( 'returned response -> ', await  response0 )
    
    
        console.log( '---------------------------------------------------------------------------' )
        const response1 = await Assertions.assertion0.statement[ '1' ]()
        console.log( '    \x1b[31m ⬆︎︎ IT PRINTS TO STDOUT FIRST THE ENCODED STRING AND THEN THE DECODED ONE', 1, '\x1b[0m\n' )
    
        console.log( '---------------------------------------------------------------------------' )
        console.log( Assertions.assertion0.statement[ '1' ].message )
        console.log( 'returned response -> ', response1 )
    
    },
}

process.argv.splice( 0, 2 )

if(  process.argv.length > 0 ){
    
    await Assertions[ process.argv ]()
    AssertionEvent.emit( 'end' )
    
}else {
    
    for( const assertion in Assertions )
        await Assertions[ assertion ]()
    
    AssertionEvent.emit( 'end' )
}
