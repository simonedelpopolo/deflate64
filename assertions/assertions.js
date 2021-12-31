console.time( 'assertions finished ' )
import deflate64 from '../index.js'
import { EventEmitter } from 'events'
import { parse } from 'json-swiss-knife'
import { deepEqual, ok } from 'assert/strict'

const AssertionEvent = new EventEmitter()

AssertionEvent.on( 'end', () => {
    console.timeEnd( 'assertions finished ' )
} )

const Assertions = {
    
    assertion0 : async () => {
        console.log( '\x1b[31m assertions tests', 0, '\x1b[0m' )
        
        deflate64( [] )
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
