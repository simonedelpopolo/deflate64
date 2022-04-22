import d64 from '../d64.js'
import { request } from 'https'

export const remoteSymbol = Symbol( 'Deflate 64 remote handler.' )
export const remote = Object.defineProperty( d64, remoteSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,

    /**
     * It will handle the connection for the remote flag.
     *
     * @param {string} url - The gives options argument.
     * @returns {string | Promise<string>}
     */
    value: async function remote( url ) {

        return new Promise( ( ( resolve, reject ) => {

            /**
             * In case of redirect :).
             *
             * @param {string} url - The url argument.
             */
            function requestHandler( url ){

                const outgoing = request(
                    url,
                    {
                        method: 'GET',
                    },
                    incoming => {

                        if( incoming.statusCode === 301 ) {
                            requestHandler( incoming.headers.location )

                            return
                        }

                        let chunks = []
                        incoming.on( 'data', chunk => {
                            chunks.push( chunk )
                        } )

                        incoming.on( 'end', () => {
                            resolve( Buffer.concat( chunks ).toString( 'utf8' ) )
                        } )
                    } )

                outgoing.on( 'error', error => reject( error ) )

                outgoing.end()
            }

            requestHandler( url )

        } ) )
    }
} )
