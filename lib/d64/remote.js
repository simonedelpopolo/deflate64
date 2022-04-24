import { error_code } from '@cli-blaze/error'
import { exit } from '@cli-blaze/activity'
import { request } from 'https'

/**
 * Deflate 64 --remote data
 *
 * @param {string} url - to get data from
 * @returns {Promise<String>}
 */
export default function remote( url ) {

    return new Promise( ( resolve, reject ) => {

        let jump = 0
        /**
         * In case of redirect :)
         * ⚠️ default set to max 3 redirects.
         *
         * @param {string} url - to get data from
         */
        function redirect( url ){

            const Outgoing = request(
                url,
                Incoming => {

                    if( Incoming.statusCode === 301 ) {
                        jump ++
                        if( jump > 3 )
                            exit( 'to many redirection', new Error( '♠︎ --remote error' ), error_code.INTERNAL )
                        redirect( Incoming.headers.location )

                        return
                    }

                    let chunks = []
                    Incoming.on( 'data', chunk => {
                        chunks.push( chunk )
                    } )

                    Incoming.on( 'end', () => {
                        resolve( Buffer.concat( chunks ).toString( 'utf8' ) )
                    } )
                } )

            Outgoing.on( 'error', error => reject( error ) )

            Outgoing.end()
        }

        redirect( url )

    } )
}
