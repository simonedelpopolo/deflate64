import d64 from '../d64.js'

export const flagSymbol = Symbol( 'Deflate 64 flags handler.' )
export const flag = Object.defineProperty( d64, flagSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    
    /**
     * Handles the flags and return an object.
     *
     * @param {string[]} flags - The parsed process.argv.
     * @returns {Promise | PromiseFulfilledResult<{[p: string]: string} | PromiseRejectedResult<{[error:string]:string, [error:string]:string[]}>>}
     */
    value: async function flag( flags ){
        
        return new Promise( ( resolve, reject ) => {
        
            /**
             * @type {number}
             */
            const evenFlags = flags.length % 2
            if ( evenFlags > 0 ) {
            
                emptyFinder( flags )
            
                flags.push( 'empty' )
                reject( {
                    message: new Error( 'flags go two by two.' ).message,
                    flags: flagsRipper( flags ),
                } )
            
            } else {
            
                // Checks if a flag is followed by another flag in the argument passed to deflate64
                if ( flagsFollower( flags ) === true ) {
                    reject( {
                        message: new Error( 'flag that follow another flag? how about to choose a value instead?' ).message,
                        flags: flagsRipper( flags ),
                    } )
                }
            
                /**
                 * @type {{[p: string]: *}}
                 */
                const flagsRipped = flagsRipper( flags )
            
                /**
                 * @type {{error: boolean}|{flag: string, error: boolean, type: string}|{flags: string, error: boolean, type: string}}
                 */
                const flagsCheckerResult = flagsChecker( flagsRipped )
            
                /**
                 * To check if a property of an object is not 'undefined' it's possible to use a conditional 'if'.
                 * Example:
                 * if( object.error ) // this check both things, if object.error is not undefined and also if the value stored in object.error is true
                 *      so here it comes the necessity to be cocky.
                 * If(object.error === true) // we know that object.error is set to false by default, in the function flagsChecker
                 *      so, we know that object.error will be never 'undefined' but we need to be sure that object.error is true
                 * fixed and committed.
                 */
                if ( flagsCheckerResult.error === true ) {
                
                    switch ( flagsCheckerResult.type ) {
                        case 'twins':
                            reject( {
                                message: new Error( `flags ${ flagsCheckerResult.flags } are twins and they don't like to be together.` ).message,
                                flags: flagsRipped,
                            } )
                            break
                    
                        case 'not-available':
                            reject( {
                                message: new Error( `flag ${ flagsCheckerResult.flag } not available.` ).message,
                                flags: flagsRipped,
                            } )
                            break
                        default:
                            break
                    }
                
                }
                resolve( flagsRipped )
            
            }
        } )
    
        /**
         * It checks the given {object} into an object.
         *
         * @param {object} flagsRipped - The object that comes from flagsRipper.
         * @returns {{error: boolean}|{flag: string, error: boolean, type: string}|{flags: string, error: boolean, type: string}}
         */
        function flagsChecker( flagsRipped ) {
        
            let checker = false
        
            let objKeys = Object.keys( flagsRipped )
        
            if ( objKeys.includes( '--file' ) && objKeys.includes( '--string' ) ) {
            
                checker = true
            
                return {
                    error: checker,
                    type: 'twins',
                    flags: '--file & --string',
                }
            }
        
            if ( objKeys.includes( '--json' ) && objKeys.includes( '--stdout' ) ) {
            
                checker = true
            
                return {
                    error: checker,
                    type: 'twins',
                    flags: '--json & --stdout',
                }
            }
        
        
            for ( const flag in flagsRipped ) {
            
                switch ( flag ) {
                
                    case '--file':
                        checker = false
                        continue
                    case '--string':
                        checker = false
                        continue
                    case'--save':
                        checker = false
                        continue
                    case '--stdout':
                        checker = false
                        continue
                    case '--json':
                        checker = false
                        continue
                    case '--in-object':
                        checker = false
                        continue
                    case '--spawn':
                        checker = false
                        break
                    default:
                        checker = true
                    
                        return {
                            error: checker,
                            type: 'not-available',
                            flag: flag,
                        }
                }
            }
        
            return { error: checker }
        }
    
        /**
         * It rips the given flags {string[]} and return an object.
         *
         * @param {string[]} flags - The given flags {string[]}.
         * @returns {{[p: string]: string}}
         */
        function flagsRipper( flags ) {
        
            if ( flags.length < 12 ) {
            
                /**
                 * @type {number}
                 */
                let number = 0
            
                /**
                 * @type {*[]}
                 */
                let rippedFlags = []
            
                for ( const key in flags ) {
                
                    if ( number + parseInt( key ) % 2 === 0 )
                        rippedFlags.push( Array.of( flags[ key ], flags[ parseInt( key ) + 1 ] ) )
                
                }
            
                return Object.fromEntries( rippedFlags )
            
            }
        
            return Object.fromEntries( [
                [
                    'to many flags!',
                    'codedamn!',
                ],
            ] )
        }
    
        /**
         * It checks if a flag is followed by another flag.
         *
         * @param {string[]} flags - The given flags {string[]}.
         * @returns {boolean}
         */
        function flagsFollower( flags ) {
        
            for ( const key in flags ) {
                if ( flags[ key ].search( '[^--][a-z]*' ) !== 0 && flags[ parseInt( key ) + 1 ].search( '[^--][a-z]*' ) !== 0 )
                    return true
            
            }
        
            return false
        }
    
        /**
         * It will find the index of the empty flag, the one that isn't followed by a parameter.
         *
         * @param {string[]} flags - The given flags {string[]}.
         * @returns {string[]}
         */
        function emptyFinder( flags ) {
        
            for ( const key in flags ) {
                if ( typeof flags[ parseInt( key ) + 1 ] !== 'undefined' ) {
                    if ( flags[ key ].search( '[^--][a-z]*' ) !== 0 && flags[ parseInt( key ) + 1 ].search( '[^--][a-z]*' ) !== 0 )
                        flags.splice( parseInt( key ) + 1, 0, 'empty' )
                
                }
            
            }
        
            return flags
        }
    }
} )
