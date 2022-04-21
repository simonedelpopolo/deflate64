// A todo tests and statements.
// eslint-disable-next-line capitalized-comments
// noinspection DuplicatedCode
import * as tttt from 'trythistrythat'
import { d64 }  from '../index.js'
import { EventEmitter } from 'events'
import { ok } from 'assert/strict'
import { string_ } from 'oftypes'

export default async ( id ) => {
    const consoleTimeMessage = '|               \x1b[33massertion finished\x1b[0m                           |'
    console.time( consoleTimeMessage )


    const AssertionEvent = new EventEmitter()
    console.log( ' --------------------------------------------------------------------------' )
    console.log( '|               \x1b[33massertion started\x1b[0m', new Date(), '                |' )
    console.log( ' --------------------------------------------------------------------------' )
    AssertionEvent.on( 'end', () => {

        console.log( '___________________________________________________________________________' )
        console.log()
        console.log( ' --------------------------------------------------------------------------' )
        console.timeEnd( consoleTimeMessage )
        console.log( ' --------------------------------------------------------------------------' )

        console.log()
        console.log( '---------------------------------------------------------------------------' )
        if( status === 'failed' )
            process.exit( 1 )
    } )

    let status

    const Assertions = {

        // The testing unit for function is_json
        assertion0: async () => {

            let test_results
            let failed = false

            console.log( '__________________________________________________________________________' )

            console.log( '\x1b[32mflag --string and -s output & return.', '\x1b[31massertion ->', 0, '\x1b[0m' )
            console.log( '  \x1b[32mlisting statements', '\x1b[0m' )
            console.log( '    \x1b[32mthe --string flag output and return', '\x1b[31mstatement ->', 0, '\x1b[0m' )
            console.log( '    \x1b[32mthe -s flag output and return', '\x1b[31mstatement ->', 1, '\x1b[0m' )
            console.log( '    \x1b[32mthe --string flag return', '\x1b[31mstatement ->', 2, '\x1b[0m' )
            console.log( '    \x1b[32mthe -s flag return', '\x1b[31mstatement ->', 3, '\x1b[0m' )

            Assertions.assertion0.statement = {

                // St. execute the d64 returning and printing
                '0': async () => {
                    console.log( '    \x1b[31m executing statement -> ', 0, '\x1b[0m\n' )

                    const string = 'hello folks'

                    const encodedString = await d64( [ 'encode', '--string', string ] )

                    try {
                        ok( await string_( encodedString ) === true, 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    try {
                        ok(  encodedString === 'eJzLSM3JyVdIy8/JLgYAGbEEVA==', 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    status = failed === true ? 'failed' : 'concluded'
                    Assertions.assertion0.statement[ '0' ].message = `test ${status} -> the --string flag output and return`

                    return test_results
                },

                // St. execute the d64 returning and printing
                '1': async () => {
                    console.log( '    \x1b[31m executing statement -> ', 1, '\x1b[0m\n' )

                    const string = 'hello folks'

                    const encodedString = await d64( [ 'encode', '-s', string ] )

                    try {
                        ok( await string_( encodedString ) === true, 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    try {
                        ok(  encodedString === 'eJzLSM3JyVdIy8/JLgYAGbEEVA==', 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    status = failed === true ? 'failed' : 'concluded'
                    Assertions.assertion0.statement[ '1' ].message = `test ${status} -> the -s flag output and return`

                    return test_results
                },


                // St. execute the d64 returning
                '2': async () => {
                    console.log( '    \x1b[31m executing statement -> ', 0, '\x1b[0m\n' )

                    const string = 'hello folks'

                    const encodedString = await d64( [ 'encode', '--string', string, '--quiet', 'true' ] )

                    try {
                        ok( await string_( encodedString ) === true, 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    try {
                        ok(  encodedString === 'eJzLSM3JyVdIy8/JLgYAGbEEVA==', 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    status = failed === true ? 'failed' : 'concluded'
                    Assertions.assertion0.statement[ '2' ].message = `test ${status} -> the --string flag return`

                    return test_results
                },

                // St. execute the d64 returning
                '3': async () => {
                    console.log( '    \x1b[31m executing statement -> ', 1, '\x1b[0m\n' )

                    const string = 'hello folks'

                    const encodedString = await d64( [ 'encode', '-s', string, '-q', 'true' ] )

                    try {
                        ok( await string_( encodedString ) === true, 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    try {
                        ok(  encodedString === 'eJzLSM3JyVdIy8/JLgYAGbEEVA==', 'something went wrong' )
                        test_results = encodedString
                    }catch ( error ) {
                        test_results = error
                        failed = true
                    }

                    status = failed === true ? 'failed' : 'concluded'
                    Assertions.assertion0.statement[ '3' ].message = `test ${status} -> the -s flag return`

                    return test_results
                },

            }

            console.log( '---------------------------------------------------------------------------' )
            const response0 = await Assertions.assertion0.statement[ '0' ]()
            console.log( '\x1b[32m\nprint ⬆ return ⬇︎', '\x1b[0m\n' )
            console.log( 'returned response -> ', response0 )
            console.log( Assertions.assertion0.statement[ '0' ].message )

            console.log( '---------------------------------------------------------------------------' )
            const response1 = await Assertions.assertion0.statement[ '1' ]()
            console.log( '\x1b[32m\nprint ⬆ return ⬇︎', '\x1b[0m\n' )
            console.log( 'returned response -> ', response1 )
            console.log( Assertions.assertion0.statement[ '1' ].message )

            console.log( '---------------------------------------------------------------------------' )
            const response2 = await Assertions.assertion0.statement[ '2' ]()
            console.log( '\x1b[32m\nreturn ⬇︎', '\x1b[0m\n' )
            console.log( 'returned response -> ', response2 )
            console.log( Assertions.assertion0.statement[ '2' ].message )

            console.log( '---------------------------------------------------------------------------' )
            const response3 = await Assertions.assertion0.statement[ '3' ]()
            console.log( '\x1b[32m\nreturn ⬇︎', '\x1b[0m\n' )
            console.log( 'returned response -> ', response3 )
            console.log( Assertions.assertion0.statement[ '3' ].message )

        },

        assertion1 : async () => {
            console.log( '__________________________________________________________________________' )

            console.log( '\x1b[31m Assertions --quiet && -q flag', 1, '\x1b[0m' )
            console.log( '    \x1b[31m the --quiet flag is true', 0, '\x1b[0m' )
            console.log( '    \x1b[31m the -q flag is false', 1, '\x1b[0m' )

            let response

            Assertions.assertion1.statement = {


                '0' : async ( ) => {

                    console.log( '    \x1b[31m executing d64 when the --quiet flag is true', 0, '\x1b[0m\n' )
                    const GMF = 'good morning folks'

                    // At first, we encode the string
                    const encodedGMF = await d64( [ 'encode', '--string', GMF, '--quiet', 'true' ] )

                    // At second, decode the string
                    const goodMorningFolks = await d64( [ 'decode', '--string', encodedGMF, '-q', 'true' ] )

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

                    Assertions.assertion1.statement[ '0' ].message = 'test concluded'

                    return response
                },

                '1' : async ( ) => {
                    console.log( '    \x1b[31m executing d64 when the --quiet flag is false', 1, '\x1b[0m\n' )
                    const GMF = 'good morning folks'

                    // At first, we encode the string
                    const encodedGMF = await d64( [ 'encode', '--string', GMF, '--quiet', 'false' ] )

                    // At second, decode the string
                    const goodMorningFolks = await d64( [ 'decode', '--string', encodedGMF, '-q', 'false' ] )

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

                    Assertions.assertion1.statement[ '1' ].message = 'test concluded'

                    return response
                }

            }

            console.log( '---------------------------------------------------------------------------' )
            const response0 = await Assertions.assertion1.statement[ '0' ]()
            console.log( Assertions.assertion1.statement[ '0' ].message )
            console.log( 'returned response -> ', await  response0 )


            console.log( '---------------------------------------------------------------------------' )
            const response1 = await Assertions.assertion1.statement[ '1' ]()
            console.log( '    \x1b[31m ⬆︎︎ IT PRINTS TO STDOUT FIRST THE ENCODED STRING AND THEN THE DECODED ONE', 1, '\x1b[0m\n' )

            console.log( '---------------------------------------------------------------------------' )
            console.log( Assertions.assertion1.statement[ '1' ].message )
            console.log( 'returned response -> ', response1 )

        },

        // The on development try out assertion
        assertionOnGoing : async () => {
            const longString = 'I\'m actually working on a series of distributed microservice with nodejs. One of this microservice has a feature to compile a small PHP website, and it uses yaml file to make this happens.'

            // At first, encodes the remote string
            const encoded_longString = await d64( [
                'encode',
                '--string',
                longString,
                /* Let's silence the stdout */
                '--quiet',
                'true',
                /* Let's request the stats */
                '--ratio',
                'true'
            ] )
            console.table( encoded_longString )
        }
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

    tttt.end_test( id )
}

