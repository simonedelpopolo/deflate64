# Deflate64

###### Command line utility to convert one file/string into compressed base64 encoding. the file/string can be decompressed and decoded to its original status.

___

## Index of Contents

- [Install globally Deflate64](#install-globally-deflate64)
- [Usage of the cli Deflate64](#usage-of-the-cli-deflate64)
    - [Usage of the cli Deflate64 with spawn in your project](#usage-of-the-cli-deflate64-with-spawn-in-your-project)
    - [Commands for Deflate64 CLI](#commands-for-deflate64-cli)
        - [encode](#encode)
        - [decode](#decode)
        - [help](#help)
        - [version](#version)
    - [Flags for Deflate64 CLI](#flags-for-deflate64-cli)
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

```shell
deflate64 help encode
    ________________________________________________________________________    
    |				Deflate64 v0.3.5			   |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

 example on how to use the encode command.

   deflate64 encode --file /path/to/file --save /path/to/saved/file [ it prints to stdout the encoded string and save the specified file ]
   deflate64 encode --file /path/to/file --stdout true [ it prints to stdout the encoded string ]
   deflate64 encode --file /path/to/file --json true [ it prints to stdout a json string {"string":"encoded string"} ]
   deflate64 encode --string 'string to encode and compress' --save /path/to/saved/file [ it prints to stdout the encoded string and save the specified file ]
   deflate64 encode --string 'string to encode and compress' --stdout false [ it doesn't print to stdout ]
   deflate64 encode --string 'string to encode and compress' --json true [ it prints to stdout a json string {"string":"encoded string"} ]
```

___

- ##### decode

```shell
deflate64 help decode
    ________________________________________________________________________    
    |				Deflate64 v0.3.5			   |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.


 example on how to use the decode command.

   deflate64 decode --file /path/to/file --save /path/to/saved/file [ it prints to stdout the decoded string and save the specified file ]
   deflate64 decode --file /path/to/file --stdout true [ it prints to stdout the decoded string ]
   deflate64 decode --file /path/to/file --json true [ it prints to stdout a json string {"string":"decoded string"} ]
   deflate64 decode --string 'string to decode and decompress' --save /path/to/saved/file [ it prints to stdout the decode string and save the specified file ]
   deflate64 decode --string 'string to decode and decompress' --stdout false [ it doesn't print to stdout ]
   deflate64 decode --string 'string to decode and decompress' --json true [ it prints to stdout a json string {"string":"decoded string"} ]
```

___

- ##### help

to read the whole help there are two ways:

```shell
deflate64 help help
```

```shell
deflate64
```

___

- ##### version

```shell
deflate64 help version
    ________________________________________________________________________    
    |				Deflate64 v0.3.5			   |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   version 			[ shows the installed version ]
```

___

### Flags for Deflate64 CLI

- ##### --file

```shell
deflate64 help --file
    ________________________________________________________________________    
    |				Deflate64 v0.3.5			   |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   --file 			[ specify the relative or absolute path to the file to encode or decode ]

   usage: deflate64 decode --file ./encoded.string.txt --save ./decoded.string.txt --stdout true
   usage: deflate64 decode --file ./encoded.string.txt --save ./decoded.string.txt
            let's believe that the file ./encoded.string.txt contain the string "eJzLSM3JyQcABiwCFQ==" 
  prints:   hello 
   saves:   ./decoded.string.txt 
```

___

- ##### --string

```shell
deflate64 help --string
    ________________________________________________________________________    
    |                           Deflate64 v0.3.5                           |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   --string                     [ the string (JSON or plain text), surrounded by single quotes for JSON and indifferently type of quotes for plain text
       info                        for more complex string having double and single quotes within read this: 
       info                        the flag --string dilemma https://github.com/simonedelpopolo/deflate64#the---string-flag-dilemma 
       info                        or follow the bug issue here https://github.com/simonedelpopolo/deflate64/issues/1 
       info                        or give hints at the issue here https://github.com/simonedelpopolo/deflate64/issues/2 
       info                        or just save the string on a file and use the flag --file instead 

   usage: deflate64 decode --string 'eJzLSM'3JyQcABiwCFQ==' --json true
  prints:   {"string":"hello"}  

```

___

- ##### --save

```shell
deflate64 help --save
    ________________________________________________________________________    
    |				Deflate64 v0.3.5			   |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   --save 			[ specify the relative or absolute path to the file for saving the encoded or decoded string ]

   usage: deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --save ./decoded.string.txt --stdout true
   usage: deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --save ./decoded.string.txt
  prints:   hello 
   saves:   ./decoded.string.txt  

```

___

- ##### --stdout

```shell
deflate64 help --stdout
    ________________________________________________________________________    
    |                           Deflate64 v0.3.5                           |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   --stout 			[ ( options: [ true|false ] ) by default is set to true and will print the encoded or decoded string in the console ]
           			[ if the stdout flag is call the response will be the encode or decoded string ]

   usage: deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --save ./decoded.string.txt --stdout true
   usage: deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --save ./decoded.string.txt
  prints:   hello 
   saves:   ./decoded.string.txt 

   usage: deflate64 encode --string 'eJzLSM3JyQcABiwCFQ==' --stdout false
  throws:  why are you doing this to me?

```

___

- ##### --json

```shell
deflate64 help --json
    ________________________________________________________________________    
    |                           Deflate64 v0.3.5                           |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   --json 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will override the --stdout either if this one is set to true ]
           			[ if the json flag is call the response will be the encode or decoded string in the form of a json string like this {"string":"encodes/decoded string"} ]

   usage: deflate64 decode --string 'eJzLSM3JyQcABiwCFQ==' --json true
  prints:   {"string":"hello"}  

```

___

- ##### --in-object

```shell
deflate64 help --in-object
    ________________________________________________________________________    
    |                           Deflate64 v0.3.5                           |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   --in-object 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will parse a json input( file/string ) and will extract from the "string" property the encoded/decoded string ]

   usage: deflate64 encode --string '{"string":"hello"}' --json true --in-object true
  prints:   {"string":"eJzLSM3JyQcABiwCFQ=="}  

```

___

- ##### --spawn

```shell
deflate64 help --spawn
    ________________________________________________________________________    
    |                           Deflate64 v0.3.5                           |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

   --spawn 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will switch from console.log to process.std.write
      info 			   console.log add a \n character at the end of the stream and this can bring some Error 

   usage: deflate64 encode --string '{"string":"hello"}' --json true --in-object true --spawn true
  prints:   {"string":"eJzLSM3JyQcABiwCFQ=="}

```

___

- ### The --string flag dilemma
    When passing a long string to the flag --string we encounter some problems or bugs, and it depends on the used shell and environment.  
    
    **Something about the environment used**

    > ℹ️ the version of nodejs **16.13.1**
    
    > ℹ️ the version of zsh **zsh 5.8 (x86_64-apple-darwin20.0)** | **zsh 5.8 (x86_64-redhat-linux-gnu)**
    
    > ℹ️ the version of bash **GNU bash, version 5.1.8(1)-release (aarch64-apple-darwin20.4.0)** | **GNU bash, version 5.1.0(1)-release (x86_64-redhat-linux-gnu)**
    
    > 🚫 I haven't tried yet on Windows, so for this reason I update the package.json to rise incompatibility with It
    
    > ℹ️ I opened one issue for the internal deflate64 bug processing strings having single/double quotes 
    
    > ℹ️ I opened one issue about processing strings having single/double quotes in shells
    
    **_given the examples_**:  
___

- ##### Using zsh as shell

```shell
# double quoted long string variable that have single quotes within

LONG_STRING="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

deflate64 encode --string $LONG_STRING

# this will go through returning a compressed encoded string 
# if decoded and decompressed will return back the original string.

```

- ##### same same as above using bash as shell

```shell
# double quoted long string variable that have single quotes within

LONG_STRING="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

deflate64 encode --string $LONG_STRING

# it will output this and Deflate64 will throw the '{"to many flags!":"codedamn!"}' error 

    ________________________________________________________________________    
    |				Deflate64 v0.3.5			   |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

            flags go two by two 
            That means that every flag passed to the command line must be followed by another argument. 

available flags [ either for encode and decode ]:

   --file 			[ specify the relative or absolute path to the file to encode or decode ]
   --string 			[ the string (JSON or plain text), surrounded by single quotes ( if the string contain single quotes use the --file flag ), to encode or decode ]
   --save 			[ specify the relative or absolute path to the file for saving the encoded or decoded string ]
   --stout 			[ ( options: [ true|false ] ) by default is set to true and will print the encoded or decoded string in the console ]
           			[ if the stdout flag is call the response will be the encode or decoded string ]
   --json 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will override the --stdout either if this one is set to true ]
           			[ if the json flag is call the response will be the encode or decoded string in the form of a json string like this {"string":"encodes/decoded string"} ]
   --in-object 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will parse a json input( file/string ) and will extract from the "string" property the encoded/decoded string ]
   --spawn 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will switch from console.log to process.std.write
      info 			   console.log add a \n char at the end of the stream and this can bring some Error 

   flags go two by two.

  given flags: {"to many flags!":"codedamn!"}

```

___

- ##### Using zsh as shell

> ℹ️ the output below is a zsh running on BigSur, on **Fedora34 the output doesn't have any problems**

```shell
# double quoted long string variable that have double quotes within

LONG_STRING="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

deflate64 encode --string $LONG_STRING

# it will output this

zsh: command not found: here,
eJxVkkFu4zAMRa/CXVogzSWKLgpMd0X3tE3HnEiiIFLJ+PZDKkHRLi3yfz5++t2AFRCSlDOQGk6JdaMFVpwNbEPzYiNcqMGNU4KJYGG15mXvmnbvodHgSoJZilExkNVlFc8Et42Ku8uFfYC7sSkk3KXbCT5dWoXv/V2j4480yvBetecAGwBssGFAZi++SHtJpApFWsZ0h+GpG0sJm0Rm1PQIrpBaRZ3S5OF+eH3wbdTo+E0bX4cjZByQPi54IfHlx2Zv5RzJnOADyw4L6cWkQu0jr5BVnC++sHOWBW403denhU1a0N6cgX7th7EfcXO3FXsy32+hBEb/7DhcEJSwzRus0uCQhpRDerjfopdZrn6YHEgxUtkcQC2KXB7uXFYs836CL2wsXcEl6mmpp3p1wqukq4c0nOKYu8/0/FQyGWf38yPjPPPiUf189rxrb5EwPHH5S+OH2HqW3gZ9eEWGz6f/yM3dyg==
 
# if decoded and decompressed will return back the original string with the double quotes converted to single

```

- ##### same same as above using bash as shell

> ℹ️ the output below is a zsh running on BigSur, on **Fedora34 the output HAVE the same problem**

```shell
# double quoted long string variable that have double quotes within
LONG_STRING="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

deflate64 encode --string $LONG_STRING

# it will output this and Deflate64 will throw the 'flags go two by two' error

bash: here,: command not found
    ________________________________________________________________________    
    |				Deflate64 v0.3.5			   |
    ------------------------------------------------------------------------    
Command line utility to convert one file/string into compressed base64 encoding.
The file/string can be decompressed and decoded to its original status.

            flags go two by two 
            That means that every flag passed to the command line must be followed by another argument. 

available flags [ either for encode and decode ]:

   --file 			[ specify the relative or absolute path to the file to encode or decode ]
   --string 			[ the string (JSON or plain text), surrounded by single quotes ( if the string contain single quotes use the --file flag ), to encode or decode ]
   --save 			[ specify the relative or absolute path to the file for saving the encoded or decoded string ]
   --stout 			[ ( options: [ true|false ] ) by default is set to true and will print the encoded or decoded string in the console ]
           			[ if the stdout flag is call the response will be the encode or decoded string ]
   --json 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will override the --stdout either if this one is set to true ]
           			[ if the json flag is call the response will be the encode or decoded string in the form of a json string like this {"string":"encodes/decoded string"} ]
   --in-object 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will parse a json input( file/string ) and will extract from the "string" property the encoded/decoded string ]
   --spawn 			[ ( options: [ true|false ] ) by default is set to false, if is set to true will switch from console.log to process.std.write
      info 			   console.log add a \n char at the end of the stream and this can bring some Error 

   flags go two by two.

  given flags: {"--string":"empty"}


```

___

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
