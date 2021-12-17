import { flagging, input, writing } from './util/encdec.js'

/**
 * Decode the given string/file and execute the flags action.
 *
 * @param {{[p:string]: string}} flags - The flags after flagRipper.
 * @returns {Promise<void>}
 */
export default async function decode( flags ) {
    
    await flagging( flags )
    
    await input( 'decode', 'utf-8' )
    
    await writing()
    
}
