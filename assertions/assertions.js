console.time( 'assertions finished ' )
import { EventEmitter } from 'events'
import { parse } from '@simonedelpopolo/json-parse'
import { deepEqual, ok } from 'assert/strict'
import deflate64 from '../index.js'

const AssertionEvent = new EventEmitter()

AssertionEvent.on( 'end', () => {
    console.timeEnd( 'assertions finished ' )
} )

const Assertions = {
    
    assertion0 : async () => {
        let expectedObject = { string: 'eJzLSM3JyQcABiwCFQ==' }
        console.log( `\x1b[31m It checks if the returning variable is of type Object and if the exit code is`, 0, '\x1b[0m' )
        
        deflate64( null )
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
