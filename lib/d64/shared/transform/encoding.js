/**
 * Convert the zlib data to base64
 *
 * @param {Buffer} data - given
 * @yields
 * @returns {AsyncGenerator<string, void, void>}
 */
export async function* base64( data ){

    for await ( const chunk of data )
        yield chunk.toString( 'base64' )
}

/**
 * Convert the zlib data to utf8
 *
 * @param {Buffer} data - given
 * @yields
 * @returns {AsyncGenerator<string, void, void>}
 */
export async function* utf8( data ){

    for await ( const chunk of data )
        yield chunk.toString( 'utf8' )
}
