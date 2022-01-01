import d64 from '../d64.js'
import { flagging, input, returning, writing } from './d64__.js'

export const encodeSymbol = Symbol( 'Deflate 64 encode command handler.' )
export const encode = Object.defineProperty( d64, encodeSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    
    /**
     * Decode the given string/file and execute the flags action.
     *
     * @param {{[p:string]: string}} flags - The flags after flagRipper.
     * @returns {Promise<void>}
     */
    value: async function encode( flags ){
        await flagging( flags )
        
        await input( 'encode', 'base64' )
        
        await writing()
        
        if( returning !== false )
            return returning
    }
} )
