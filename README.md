# Deflate64

###### Command line utility to convert one file/string into compressed base64 encoding. the file/string can be decompressed and decoded to its original status.

## Index of Contents

- [Install globally Deflate64](#install-globally-deflate64)
- [Usage of the cli Deflate64](#usage-of-the-cli-deflate64)
    - [Usage of the cli Deflate64 with spawn in your project](#usage-of-the-cli-deflate64-with-spawn-in-your-project)
    - [Commands for Deflate64 CLI](#commands-for-deflate64-cli)
    - [Flags for Deflate64 CLI](#flags-for-deflate64-cli)
- [Why I built this small utility](#why-i-built-this-small-utility)
- [Road Map](#road-map)

### Install globally Deflate64

Keep in mind that this is a CLI utility so install it globally for best usage.

```shell
npm install --global deflate64
```

### Usage of the cli Deflate64

```bash
deflate64 help # it shows the available commands and flags
```

#### Usage of the cli Deflate64 with spawn in your project

Sometimes we need to use command line software in our nodejs code and use the output of the program as variable.  
Deflate64 got you covered. Let's see a simple example to implement this use case.

```shell
npm i -g deflate64 # install deflate64 globally
npm i @simonedelpopolo/json-parse # install json-parse in you project scope
```

`ESM`

```javascript
import { spawn } from 'child_process'
import { parse } from '@simonedelpopolo/json-parse'

const deflate64s = spawn( 'deflate64', [
    'encode',
    '--string',
    'hello',
    '--json',
    'true',
] )

let jsonObject
deflate64s.stdout.on( 'data', async chunk => {
    jsonObject = await parse( chunk )
    console.log(
        'output of deflate64: ',
        jsonObject,
        ' -> type of the output: [ ',
        typeof jsonObject,
        ' ]. the encoded string extracted from the object: ',
        jsonObject.string
    )
} )

// it yealds: 
// output of deflate64:  { string: 'eJzLSM3JyQcABiwCFQ==' }  -> type of the output: [  object  ]. the encoded string extracted by the object:  eJzLSM3JyQcABiwCFQ==
```

### Why I built this small utility

I'm actually working on a series of distributed microservice with nodejs. One of this microservice has a feature to compile a small PHP website, and it uses yaml file to make this happens.  
Some files ( html, png, jpeg, javascript, css and also servers configuration for apache2 and nginx ) are stored as compressed base64 string in yaml configuration file. So instead of doing it manually I wanted to automate this task building this small utility.  
I found out, while building it, that is useful as hell, and it can be extended in many ways.  
I'll show some use cases related to the main project, so you'll get the point.

### Road Map

#### Commands for Deflate64 CLI

###### Commands are few as small this utility is :)

#### Flags for Deflate64 CLI

###### Flags are global, so they can be used for encode and decode command likewise

> flags go two by two

That means that every flag passed to the command line must be followed by another argument, let's see how this works

```shell
deflate64 decode --file /path/to/file
         #command->flag->argument
```

```shell
deflate64 encode --file /path/to/file --json
         # command->flag->argument     flags->empty
         # this will throw an exception and shows you what is wrong, like this:
         #
         #    flags go two by two.
         #    given flags: {"--file":"/path/to/file","--json":"empty"}
```

