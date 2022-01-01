import d64 from '../d64.js'
import { flagging, input, returning, writing } from './d64__.js'

export const decodeSymbol = Symbol( 'Deflate 64 decode command handler.' )
export const decode = Object.defineProperty( d64, decodeSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    
    /**
     * Decode the given string/file and execute the flags action.
     *
     * @param {{[p:string]: string}} flags - The flags after flagRipper.
     * @returns {Promise<void>}
     */
    value: async function decode( flags ){
        await flagging( flags )
    
        await input( 'decode', 'utf-8' )
    
        await writing()
        
        if( returning !== false )
            return returning
    }
} )
