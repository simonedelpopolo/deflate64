#!/usr/bin/node
import * as Module from 'module'
import { createServer } from 'http'
import { extname } from 'path'
import { readFileSync } from 'fs'

/**
 * @type {Module}
 */
const serve = Object.create( Module )

/**
 * @type {symbol}
 */
const server_Symbol = Symbol( 'Lightweight server for react-dang app' )
const server = Object.defineProperty( serve, server_Symbol, {
    configurable: false,
    enumerable: true,
    writable: false,
    
    value: async function server() {
        
        // The server configuration
        const server = createServer( async ( Incoming, Outgoing ) => {
            
            response[ response_Symbol ] = Outgoing
            
            const filename = `${ publicDir[ publicDir_Symbol ] }${ Incoming.url }`
            
            filesRequested[ filesRequested_Symbol ] = filename
            imageExtensionsRequestedQueue[ imageExtensionsRequestedQueue_Symbol ] = extname( filename )
            
            console.log( filename )
            if ( Incoming.url !== '/' && Incoming.method === 'GET' )
                await file[ file_Symbol ]()
                
            else
                await index[ index_Symbol ]()
        } )
        
        server.listen( 3001, '0.0.0.0', null,
            () => {
                console.log( server.address() )
                console.log( `http://${ server.address().address }:${ server.address().port }` )
            } )
    },
} )

const response_Symbol = Symbol( 'ServerResponse' )
const response = Object.defineProperty( serve, response_Symbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: null,
} )

const publicDir_Symbol = Symbol( 'public static file directory' )
const publicDir = Object.defineProperty( serve, publicDir_Symbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: `${ process.cwd() }/public`,
} )

const indexHTML_Symbol = Symbol( 'path to index.html file to serve react-dang' )
const indexHTML = Object.defineProperty( serve, indexHTML_Symbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: `${ publicDir[ publicDir_Symbol ] }/index.html`,
} )

const filesRequested_Symbol = Symbol( 'file requested by the browser' )
const filesRequested = Object.defineProperty( serve, filesRequested_Symbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: null,
} )

const imageExtensionsList_Symbol = Symbol( 'a list of image extensions to set the correct response header for' )
const imageExtensionsList = Object.defineProperty( serve, imageExtensionsList_Symbol, {
    enumerable: true,
    writable: false,
    configurable: false,
    value: [
        '.png',
        '.webp',
        '.jpeg',
        '.ico',
        '.bmp',
        '.svg',
    ],
} )

const imageExtensionsRequestedQueue_Symbol = Symbol( 'image extensions requested by the browser queue' )
const imageExtensionsRequestedQueue = Object.defineProperty( serve, imageExtensionsRequestedQueue_Symbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: null,
} )

const found_Symbol = Symbol( 'found code: 200' )
const found = Object.defineProperty( serve, found_Symbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: 200,
} )

const not_found_Symbol = Symbol( 'not found code: 400' )
const not_found = Object.defineProperty( serve, not_found_Symbol, {
    enumerable: true,
    writable: true,
    configurable: true,
    value: 404,
} )

/**
 * @type {symbol}
 */
const file_Symbol = Symbol( 'responds with the file to browser requests' )
const file = Object.defineProperty( serve, file_Symbol, {
    configurable: false,
    enumerable: true,
    writable: false,
    
    value: async function file( ) {
        if ( filesRequested[ filesRequested_Symbol ] !== process.cwd() + '/public/' ) {
            let buffer
            try{
                buffer = readFileSync( filesRequested[ filesRequested_Symbol ] )
            }catch ( error ) {
                console.log( error.message )
                notFound[ notFound_Symbol ]()
                
                return
            }
            const imageExt = imageExtensionsRequestedQueue[ imageExtensionsRequestedQueue_Symbol ]
            if ( imageExtensionsList[ imageExtensionsList_Symbol ].includes( imageExt ) ) {
        
                const imageContentType = imageExt.replace( '.', '' )
        
                if ( imageContentType === 'svg' ) {
                    response[ response_Symbol ].setHeader(
                        'content-type',
                        `image/${ imageContentType }+xml` )
            
                } else {
                    response[ response_Symbol ].setHeader(
                        'content-type',
                        `image/${ imageContentType }` )
                }
            }
            
            response[ response_Symbol ].statusCode = found[ found_Symbol ]
            response[ response_Symbol ].write( buffer )
            response[ response_Symbol ].end()
        }
        
    },
} )

/**
 * @type {symbol}
 */
const notFound_Symbol = Symbol( 'responds with the not found code 400 to browser requests' )
const notFound = Object.defineProperty( serve, notFound_Symbol, {
    configurable: false,
    enumerable: true,
    writable: false,
    
    value: async function notFound() {
        response[ response_Symbol ].setHeader( 'react-serve-files', 'false' )
        response[ response_Symbol ].statusCode = not_found[ not_found_Symbol ]
        response[ response_Symbol ].end()
    },
} )

/**
 * @type {symbol}
 */
const index_Symbol = Symbol( 'handle the response of the index.html' )
const index = Object.defineProperty( serve, index_Symbol, {
    configurable: false,
    enumerable: true,
    writable: false,
    
    value: function index() {
        
        let buffer
        try {
            buffer = readFileSync( indexHTML[ indexHTML_Symbol ] )
        }catch ( error ) {
            console.log( error.message, 'index' )
            response[ response_Symbol ].setHeader( 'react-serve-index', 'false' )
            response[ response_Symbol ].statusCode = not_found[ not_found_Symbol ]
            response[ response_Symbol ].end()
            
            return
        }
    
        response[ response_Symbol ].setHeader( 'react-serve-index', 'true' )
        response[ response_Symbol ].setHeader( 'content-type', 'text/html' )
        response[ response_Symbol ].statusCode = found[ found_Symbol ]
        response[ response_Symbol ].write( buffer )
        response[ response_Symbol ].end()
    },
} )

process.argv.splice( 0, 2 )
process.title = 'r-dang-serve'
server[ server_Symbol ]( process.argv )
