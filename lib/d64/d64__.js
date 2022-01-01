import { array_ } from 'oftypes'
import { help, helpSymbol } from './exporter.js'

export const d64__ = {
    
    /**
     * Type checker for the argv argument.
     *
     * @param {any} given_argv - The given argument `argv`.
     * @returns {Promise | PromiseFulfilledResult<true> | PromiseRejectedResult<string>}
     */
    types: async ( given_argv ) => {
        
        const messageReject = '[d64-TypeError] Only type of array is accepted for argument `argv`.'
        
        const checkArray = await array_( given_argv )
        
        if( checkArray === false ){
            const error = `\n ${messageReject}\n\t Given argument: \x1b[32m{${ typeof given_argv }}\x1b[0m -> \x1b[31m ${JSON.stringify( given_argv )}\x1b[0m \n\n`
            process.stderr.write( `${error}` )
            process.exit( 1 )
        }
    },
    
    /**
     * Arguments length.
     *
     * @param {string[]} argv - The give argv argument.
     * @returns {Promise<void>}
     */
    length: async ( argv ) => {
        if( argv.length === 0 )
            help[ helpSymbol ]()
    }
    
}
