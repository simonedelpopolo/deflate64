# Deflate64

###### Command line utility to convert one file/string into compressed base64 encoding. the file/string can be decompressed and decoded to its original status.

![NPM](https://img.shields.io/npm/l/deflate64) ![npm](https://img.shields.io/npm/dw/deflate64)
___

## Index of Contents

- [Install globally Deflate64](#install-globally-deflate64)
- [Usage of the cli Deflate64](#usage-of-the-cli-deflate64)
  - [Commands for Deflate64 CLI](#commands-for-deflate64-cli)
    - [encode](#encode)
    - [decode](#decode)
    - [help](#help)
    - [version](#version)
  - [Flags for Deflate64 CLI](#flags-for-deflate64-cli)
    - [Flags go two by two](#flags-are-global-so-they-can-be-used-for-encode-and-decode-command-likewise)
    - [--file](#--file)
    - [--string](#--string)
    - [--save](#--save)
    - [--stdout](#--stdout)
    - [--json](#--json)
    - [--in-object](#--in-object)
    - [--spawn](#--spawn)
    - [The --string flag dilemma](#the---string-flag-dilemma)
- [Why I built this small utility](#why-i-built-this-small-utility)
- [Road Map](#road-map)

___

### Install globally Deflate64

Keep in mind that this is a CLI utility so install it globally for best usage.

```shell
npm install --global deflate64
```

___

### Usage of the cli Deflate64

```bash
deflate64 help # it shows the available commands and flags
```

___

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

___

### Why I built this small utility

I'm actually working on a series of distributed microservice with nodejs. One of this microservice has a feature to compile a small PHP website, and it uses yaml file to make this happens.  
Some files ( html, png, jpeg, javascript, css and also servers configuration for apache2 and nginx ) are stored as compressed base64 string in yaml configuration file. So instead of doing it manually I wanted to automate this task building this small utility.  
I found out, while building it, that is useful as hell, and it can be extended in many ways.  
I'll show some use cases related to the main project, so you'll get the point.

___

### Road Map

> fell free to propose some challenges 😎

- [ ] `--http flag` to get content remotely 
- [ ] `--call-back flag` to import external javascript module to run personalized tasks after encoding/decoding
- [ ] `--pre-call flag` to import external javascript module to run personalized tasks before encoding/decoding
- [ ] `--json flag` add option of type string to specify the property name which will store the encoded/decoded string
- [ ] `--in-object flag` add option of type string to process the decoded/encoded string extracting it from the specified property name
- [ ] `--complex-string="the very \"much\" long and \'complex string\' to parse and decode with RegHex and finally solve the --string flag dilemma?`

___

### Commands for Deflate64 CLI

###### Commands are few as small this utility is :)

- ##### encode

  - **Example on how to use the encode command.**

    - It prints to stdout the encoded string and save the specified file  
      `deflate64 encode --file /path/to/file --save /path/to/saved/file`

    - It prints to stdout the encoded string  
      `deflate64 encode --file /path/to/file --stdout true`

    - It prints to stdout a json string {"string":"encoded string"}  
      `deflate64 encode --file /path/to/file --json true`

    - it prints to stdout the encoded string and save the specified file  
      `deflate64 encode --string 'string to encode and compress' --save /path/to/saved/file`

    - it doesn't print to stdout and throws  
      `deflate64 encode --string 'string to encode and compress' --stdout false`

    - it prints to stdout a json string {"string":"encoded string"}  
      `deflate64 encode --string 'string to encode and compress' --json true`

___

- ##### decode

  - **Example on how to use the decode command.**

    - It prints to stdout the decoded string and save the specified file  
`deflate64 decode --file /path/to/file --save /path/to/saved/file`

    - It prints to stdout the decoded string  
`deflate64 decode --file /path/to/file --stdout true`

    - It prints to stdout a json string {"string":"decoded string"}  
`deflate64 decode --file /path/to/file --json true`

    - it prints to stdout the decoded string and save the specified file  
`deflate64 decode --string 'string to decode and decompress' --save /path/to/saved/file`

    - it doesn't print to stdout and throws  
`deflate64 decode --string 'string to decode and decompress' --stdout false`

    - it prints to stdout a json string {"string":"decoded string"}  
`deflate64 decode --string 'string to decode and decompress' --json true`

___

- ##### help

  - **To read the whole help there are three ways**

`deflate64`

`deflate64 help`

`deflate64 help help`

___

- ##### version

  - **It shows the installed version**

`deflate64 version`

___

### Flags for Deflate64 CLI

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

___

- ##### --file

- Use case: To load the encoded or decoded string from file.
- Options [ string ] specify the relative or absolute path to the file to encode or decode
- Usage: `deflate64 decode --file ./encoded.string.txt --save ./decoded.string.txt`

`# let's believe that the file ./encoded.string.txt contain the string "eJzLSM3JyQcABiwCFQ=="`

- Prints: `hello`
- Saves: ./decoded.string.txt
___

- ##### --string

> ℹ️ for more complex string having double and single quotes within read this:  
    the flag --string dilemma https://github.com/simonedelpopolo/deflate64/issues/1#issuecomment-996634336  
    or follow the bug issue here https://github.com/simonedelpopolo/deflate64/issues/1  
    or give hints at the issue here https://github.com/simonedelpopolo/deflate64/issues/2  
    or just save the string on a file and use the flag --file instead  

  - Use case: To load the encoded or decoded string from string.
  - Options [ string ] JSON or plain text, surrounded by single quotes for JSON and indifferently type of quotes for plain text
  - Usage: `deflate64 decode --string 'eJzLSM'3JyQcABiwCFQ==' --json true`
  - Prints: `{"string":"hello"} `

___

- ##### --save

  - Use case: To save the encoded or decoded string.
  - Options [ string ] specify the relative or absolute path to the file for saving the encoded or decoded string
  - Usage: `deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --save ./decoded.string.txt`
  - Prints: `hello`
  - Saves: `./decoded.string.txt`

___

- ##### --stdout

  - Use case: To print/return the encoded or decoded string. It throws if it is set to false and the --save flag is not set
  - Options [ true | false] by default is set to true and will print the encoded or decoded string in the console
  - Usage: `deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --save ./decoded.string.txt --stdout true`
  - Usage: `deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --save ./decoded.string.txt`
  - Prints: `hello`
  - Saves: `./decoded.string.txt`
  
  - Usage: `deflate64 encode --string 'eJzLSM3JyQcABiwCFQ==' --stdout false`
  - Throws:  `why are you doing this to me?`

___

- ##### --json

  - Use case: When the encoded/decoded string need to be exported in the form of json file/string
  - Options [ true | false] by default is set to false, if is set to true will override the --stdout either if this one is set to true
  - Usage: `deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --json true`
  - Prints: `{"string":"hello"}`

___

- ##### --in-object

  - Use case: When the encoded/decoded string need to be extracted from json file/string 
  - Options [ true | false] by default is set to false, if is set to true will parse a json input( file/string ) and will extract from the "string" property the encoded/decoded string
  - Usage: `deflate64 encode --string '{"string":"hello"}' --json true --in-object true`
  - Prints: `{"string":"eJzLSM3JyQcABiwCFQ=="}`

___

- ##### --spawn

> ℹ️ Info: console.log add a \n character at the end of the stream and this can bring some Error

  - Use case: When calling the deflate64 using the process.spawn function it has a more clean output
  - Options [ true | false] by default is set to false, if is set to true will switch from console.log to process.std.write
  - Usage: `deflate64 encode --string '{"string":"hello"}' --json true --in-object true --spawn true`
  - Returns: `{"string":"eJzLSM3JyQcABiwCFQ=="}`

___

- ### The --string flag dilemma

  When passing a long string to the flag --string we encounter some problems or bugs, and it depends on the used shell and environment.

  **Something about the environment used**

  > ℹ️ the version of nodejs **16.13.1**

  > ℹ️ the version of zsh **zsh 5.8 (x86_64-apple-darwin20.0)** | **zsh 5.8 (x86_64-redhat-linux-gnu)**

  > ℹ️ the version of bash **GNU bash, version 5.1.8(1)-release (aarch64-apple-darwin20.4.0)** | **GNU bash, version 5.1.0(1)-release (x86_64-redhat-linux-gnu)**

  > 🚫 I haven't tried yet on Windows, so for this reason I update the package.json to rise incompatibility with It

  > ℹ️ I opened one ➡︎ [issue](https://github.com/simonedelpopolo/deflate64/issues/1#issuecomment-996634336) for the internal deflate64 bug processing strings having single/double quotes

  > ℹ️ I opened one ➡︎ [issue](https://github.com/simonedelpopolo/deflate64/issues/2) about processing strings having single/double quotes in shells

___
