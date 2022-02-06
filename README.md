# deflate64

###### Command line utility to convert one file/string into compressed base64 encoding. the file/string can be decompressed and decoded to its original status.
___

## Index of Contents

- [Install d64](#install-d64)
    - [npm-installation](#npm-installation)
    - [Docker | Podman](#docker--podman)
- [Usage](#usage)
    - [Use it as module](#use-it-as-module)
- [Why I built this small utility](#why-i-built-this-small-utility)
- [Road Map](#road-map)
- [Dedicated website and manual](#dedicated-website-and-manual)

___

### Install d64

> ℹ️ Once installed use `deflate64` or `d64` to run it.

- #### npm installation

`npm i -g deflate64`

___

- #### Docker | Podman

pull the image  
`docker pull simonedelpopolo/defalte64:latest`  
`podman pull docker.io/simonedelpopolo/deflate64:latest`

> ℹ️ replace `docker` with `podman` to use podman in the commands below

run the container  
`docker run -d -t --name d64 simonedelpopolo/deflate64:latest`

encode npmjs.com home page and save it to file  
`docker exec d64 d64 encode --remote https://www.npmjs.com --save encoded.npmjs.txt`

decode npmjs.com home page from file  
`docker exec d64 d64 decode --file encoded.npmjs.txt`

> ℹ️ Containerized works the same way as locally installed.
___

### Usage

```bash
deflate64 help # it shows the available commands and flags
```

___

### Use it as module

d64 imported as a module in your project? It got you covered. Let's see two simple examples to implement this use case.

```shell
npm i deflate64
```

`ESM encode->decode->replace->console.log`

```javascript
import { d64 } from 'deflate64'

const GMF = 'good morning folks'

// At first, encodes the string
const encodedGMF = await d64( [
    'encode',
    '--string',
    GMF, /* let's silence the stdout */
    '--quiet',
    'true'
] )

// At second, decodes the string
const goodMorningFolks = await d64( [
    'decode',
    '--string',
    encodedGMF, /* let's silence the stdout */
    '--quiet',
    'true'
] )

// At third, replaces the word folks with buddies
const goodMorningBuddies = goodMorningFolks.replace( 'folks', 'buddies' )

console.log( goodMorningBuddies )

// it prints good morning buddies
```

`ESM encode->stats`

```javascript
import { d64 } from 'deflate64'

const longString = 'I\'m actually working on a series of distributed microservice with nodejs. One of this microservice has a feature to compile a small PHP website, and it uses yaml file to make this happens.'

// At first, encodes the remote string
const encoded_longString = await d64( [
  'encode',
  '--string',
  longString,
  /* Let's silence the stdout */
  '--quiet',
  'true',
  /* Let's request the stats */
  '--ratio',
  'true'
] )

// the ratio flag returns an object similar to this one below
/**
 * {
 *    data: 'Z29vZCBtb3JuaW5nIGZvbGtz', // the encoded string
 *    ratio: { in: 18, out: 18, result: 0 }
 * }
 * 
 * ratio property explained:
 * 
 * [in] size of the input string in bytes
 * 
 * [out] size of the output string in bytes
 * 
 * [result] percentage of the compression ratio
 * minus when the size of the output is smaller than the input.
 * unsigned (plus) when the size of the output is bigger than the input.
 * in the example above the --compression flag was set to false
 */

// now we format the returned stats with console.table
// enlarge the shell very much ;)

console.table( encoded_longString )

// down below the returned table
```
```shell
┌─────────┬─────┬─────┬─────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ (index) │ in  │ out │       result        │                                                                                           Values                                                                                           │
├─────────┼─────┼─────┼─────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│  data   │     │     │                     │ 'eJxVjTESwjAMBL9yHQ2Td0BFvqDYChaxrYwlk+H3OENFfXu790sBBe+U8weHtk3qE1pBMG7CBl0RxbzJ0p0jioSmY3pLYBziCVUjv2zCo/IJexL7pxLZ0K1M3hvDFUHLLpnPRhldzLcZBy8mzldQjRBHt9H+UMlYT3S8Cm38syfad642fQFSS0QA' │
│  ratio  │ 188 │ 138 │ -26.595744680851062 │                                                                                                                                                                                            │
└─────────┴─────┴─────┴─────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

```
___

### Why I built this small utility

I'm actually working on a series of distributed microservice with nodejs. One of this microservice has a feature to
compile a small PHP website, and it uses yaml file to make this happens.  
Some files ( html, png, jpeg, javascript, css and also servers configuration for apache2 and nginx ) are stored as
compressed base64 string in yaml configuration file. So instead of doing it manually I wanted to automate this task
building this small utility.  
I found out, while building it, that is useful as hell, and it can be extended in many ways.  
I'll show some use cases related to the main project, so you'll get the point.

___

### Road Map

> fell free to propose some challenges 😎

- [x] `--remote flag` to get content remotely
- [ ] `--call-back flag` to import external javascript module to run personalized tasks after encoding/decoding
- [ ] `--pre-call flag` to import external javascript module to run personalized tasks before encoding/decoding
- [x] `--json flag` add option of type string to specify the property name which will store the encoded/decoded string
- [ ] `--in-object flag` add option of type string to process the decoded/encoded string extracting it from the
  specified property name
- [ ] `--complex-string="the very \"much\" long and \'complex string\' to parse and decode with RegHex and finally solve the --string flag dilemma?`

___

### Dedicated website and manual

> ℹ️ for a complete list of commands and flags go to the dedicated website at //todo still working on it

___
