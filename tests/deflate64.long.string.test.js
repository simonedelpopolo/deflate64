import { spawn } from 'child_process'

/**
 * @type {string}
 */
const LONG_STRING = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`

describe( `\x1b[31m ↓ test to compare the buffer coming from process.stdout.write and the incoming string given by the flag --string \x1b[0m
\t{string} from flag \`--string\` -> ${ LONG_STRING }
`, () => {
    test( 'it will return a JSON string', () => {
        
        const deflate64 = spawn( './executable.js', [
            'encode',
            '--string',
            LONG_STRING,
            '--json',
            'true',
            '--spawn',
            'true',
        ] )
        
        deflate64.stdout.on( 'data', chunk => {
            expect( chunk )
                .toStrictEqual( Buffer.from( '{"string":"eJxVkkFu4zAMRa9CdNMWSHOJYhYF2l3RPW3TMSeSKIhUUt9+SCUoOkuL/J+Pn34zYAWEJOUEpIZTYt1ogRVnA9vQvNgIF2pw5ZRgIlhYrXnZu6bde2g0uJJglmJUDGR1WcUTwXWj4u5yZh/gbmwKCXfpdoRPl1bhW3/X6HiXRhneqvYcYAOADTYMyOzFF2kviVShSMuYbjA8dWMpYZPIjJoewBVSq6hTmtzdH17vfBs1OvzQxtfDATIOSB8XvJD4/GuzP+UUyRzhA8sOC+nZpELtI6+QVZzPvrBzlgWuNN3Wp4VNWtBenYH+2w9jP+Lmbiv2ZL7fQgmMvu0wXBCUsM0brNLgMQ0ph/TxdoteZrn4YXIgxUhlcwC1KHK5u3NZscz7Eb6wsXQFl6inpZ7qxQkvki4e0nCKY+4+0/NTyWSc3c+PjPPMi0f1+9nzrr1FwvDE5S+NH2LrWXob9OEVGT4f/wG6rt3A"}' ) )
        } )
        
    } )
} )

