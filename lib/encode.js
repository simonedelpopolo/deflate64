import { flagging, input, writing } from './util/encdec.js'

/**
 * Encode the given string/file and execute the flags action.
 *
 * @param {{[p:string]: string}} flags - The resultant from flagsRipper.
 */
export default async function encode( flags ) {
    
    await flagging( flags )
    
    await input( 'encode', 'base64' )
    
    await writing()
}
