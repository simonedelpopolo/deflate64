import { spawn } from 'child_process'
import { parse } from '@simonedelpopolo/json-parse'
import { deepEqual, ok } from 'assert/strict'

const deflate64 = spawn('../deflate64.js', [
    'encode',
    '--string', 'hello',
    '--json', 'true'
])

deflate64.stdout.on('data', async chunk => {
    let obj = await parse(chunk)
    deepEqual(obj, {string:'eJzLSM3JyQcABiwCFQ=='})
    ok(typeof obj === 'object')
})

const deflate642 = spawn('../deflate64.js', [
    'decode',
    '--string', '{"string":"eJzLSM3JyQcABiwCFQ=="}',
    '--in-object', 'true',
    '--spawn', 'true'
])

deflate642.stdout.on('data', async chunk => {
    let string = chunk
    deepEqual(string, Buffer.from('hello'))
    ok(Buffer.isBuffer(string))
})
