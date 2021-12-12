/**
 * Handles the flags and return the output
 * @param flags {string[]}
 */
export async function flags( flags ) {
    
    return new Promise( ( resolve, reject ) => {
    
        /**
         * @type {number}
         */
        const evenFlags = flags.length % 2
        if ( evenFlags > 0 ) {
            
            flags.push( 'empty' )
            reject( {
                message: new Error( 'flags go two by two' ).message,
                flags: flagsRipper( flags ),
            } )
            
        } else {
    
            /**
             * @type {{[p: string]: *}}
             */
            const flagsRipped = flagsRipper( flags )
            
            /**
             * @type {{error: boolean}|{flag: string, error: boolean, type: string}|{flags: string, error: boolean, type: string}}
             */
            const flagsCheckerResult = flagsChecker( flagsRipped )
            
            /**
             * to check if a property of an object is not 'undefined' it's possible to use a conditional 'if'
             * example:
             * if( object.error ) // this check both things, if object.error is not undefined and also if the value stored in object.error is true
             *      so here it comes the necessity to be cocky
             * if(object.error === true) // we know that object.error is set to false by default, in the function flagsChecker
             *      so, we know that object.error will be never 'undefined' but we need to be sure that object.error is true
             * fixed and committed
             */
            if ( flagsCheckerResult.error === true ) {
                
                switch ( flagsCheckerResult.type ) {
                    case 'twins':
                        reject( {
                            message: new Error( `flags ${ flagsCheckerResult.flags } are twins and they don't like to be together` ).message,
                            flags: flagsRipped,
                        } )
                        break
                    
                    case 'not-available':
                        reject( {
                            message: new Error( `flag ${ flagsCheckerResult.flag } not available` ).message,
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
     * @param flagsRipped {object}
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
     * @param flags {string[]}
     * @returns {{[p: string]: any}}
     */
    function flagsRipper( flags ) {
        
        switch ( flags.length ) {
            
            case 2:
                
                return Object.fromEntries( [ flags ] )
            
            case 4: {
                
                let flag_a = flags.splice( 0, flags.length / 2 )
                
                return Object.fromEntries( [
                    flag_a,
                    flags,
                ] )
                
            }
            
            case 6: {
                
                let flag_a = flags.splice( 0, flags.length / 3 )
                let flag_b = flags.splice( 0, flags.length / 2 )
                
                return Object.fromEntries( [
                    flag_a,
                    flag_b,
                    flags,
                ] )
            }
            
            case 8: {
                
                let flag_a = flags.splice( 0, flags.length / 4 )
                let flag_b = flags.splice( 0, flags.length / 3 )
                let flag_c = flags.splice( 0, flags.length / 2 )
                
                return Object.fromEntries( [
                    flag_a,
                    flag_b,
                    flag_c,
                    flags,
                ] )
            }
            
            case 10: {
                
                let flag_a = flags.splice( 0, flags.length / 5 )
                let flag_b = flags.splice( 0, flags.length / 4 )
                let flag_c = flags.splice( 0, flags.length / 3 )
                let flag_d = flags.splice( 0, flags.length / 2 )
                
                return Object.fromEntries( [
                    flag_a,
                    flag_b,
                    flag_c,
                    flag_d,
                    flags,
                ] )
            }
            
            // todo necessary to add more case as many the available flags are excluded the ones that exclude each other like the 'twins'
            default:
                return Object.fromEntries( [
                    [
                        'to many flags!',
                        'codedamn!',
                    ],
                ] )
        }
    }
}
