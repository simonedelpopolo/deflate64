import { OftypesError } from 'oftypes'

/**
 * Flags that shadow other Flags
 * Illogical operations.
 *
 * @param {string[]} keys - process.argv parsed keys
 * @yields
 * @returns {AsyncGenerator<OftypesError, void, *>}
 */
export async function* shadowing( keys ){

    if( keys.includes( 'string' ) && keys.includes( 'file' ) )
        yield new OftypesError( '"--string" and "--file" cannot be used together.' )

    if( keys.includes( 'string' ) && keys.includes( 'remote' ) )
        yield new OftypesError( '"--string" and "--remote" cannot be used together.' )

    if( keys.includes( 'file' ) && keys.includes( 'remote' ) )
        yield new OftypesError( '"--file" and "--remote" cannot be used together.' )

    if( ! ( keys.includes( 'save' ) ) && keys.includes( 'quiet' ) )
        yield new OftypesError( 'illogical operation {--quiet[set]/--save[not-set]} -> give "--save=path/to/file" OR remove --quiet' )
}
