import { command } from './d64__.js'
import d64 from '../d64.js'

/**
 * @type {symbol}
 */
export const compressionSymbol = Symbol( 'd64 compression ratio calculator.' )
export const compression = Object.defineProperty( d64, compressionSymbol, {
    enumerable: true,
    configurable: false,
    writable: false,
    
    /**
     * The compression property defines if the compression should be applied, and it shows the compression ratio if requested.
     *
     * @returns {object}
     */
    value: function compression(  ) {
        // Calculate the ratio
        if( command.ratio.data.out > command.ratio.data.in )
            command.ratio.data.result = ( command.ratio.data.out - command.ratio.data.in ) / command.ratio.data.out * 100
        else
            command.ratio.data.result = ( command.ratio.data.out - command.ratio.data.in ) / command.ratio.data.in * 100
        
        return command.ratio
    }
} )
