import { command, input, writing } from './util/encdec.js'
import { bool } from '@simonedelpopolo/to-bool'

/**
 * Encode the given string/file and execute the flags action
 * @param flags {Object}
 */
export default async function encode( flags ) {
    
    const flagsObjectKeys = Object.keys( flags )
    
    if(flagsObjectKeys.includes('--save') === false){
        command.output.out.write = false
    }
    
    for ( const flag in flags ) {
        
        switch ( flag ) {
            
            case '--file':
                
                command.input.string = flags[ flag ]
                command.input.type = 'file'
                
                continue
            
            case '--string':
                
                command.input.string = flags[ flag ]
                command.input.type = 'string'
                
                continue
            
            case '--save':
                
                command.output.string = flags[ flag ]
                command.output.out.write = true
                
                continue
            
            case '--stdout':
                
                if ( flagsObjectKeys.includes( '--json' ) ) {
                    continue
                }
    
                if(flagsObjectKeys.includes('--save') === false && await bool( flags[ flag ] ) === false){
    
                    console.error()
                    console.error('\x1b[31m', 'why are you doing this to me?', '\x1b[0m')
                    console.error()
                    process.exit(1)
                }
                
                command.output.out.print = await bool( flags[ flag ] )
                command.output.type = 'stdout'
                
                continue
            
            case '--json':
                
                command.output.out.print = await bool( flags[ flag ] )
                command.output.type = 'json'
                
                continue
            
            case '--in-object':
                
                command.input.object = await bool( flags[ flag ] )
                
                continue
            
            default:
                
                break
        }
    }

    if ( command.output.out.print === true ) {
        
        await input('encode', 'base64')
        
    } else if ( command.output.out.print === false ) {
        
        await input('encode', 'base64')
    }
    
    if ( command.output.out.write === true && command.data !== null ) {
        
        let writeProcess = await writing( command.output.string, command.data )
        
        switch ( writeProcess ) {
            
            case true:
                if ( command.output.type === 'stdout' ) {
                    process.exit( 0 )
                }
                
                if ( command.output.type === 'json' ) {
                    process.exit( 0 )
                }
                break
            default:
                
                console.error( writeProcess )
                process.exit( 1 )
                break
        }
    }
}
