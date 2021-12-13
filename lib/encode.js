import { flagging, input, writing } from './util/encdec.js'

/**
 * Encode the given string/file and execute the flags action
 * @param flags {{[p:string]: string}}
 */
export default async function encode( flags ) {
    
    await flagging( flags )
    
    await input( 'encode', 'base64' )
    
    await writing()
}
