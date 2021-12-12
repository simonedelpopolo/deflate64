# Deflate64

###### Command line utility to convert one file/string into compressed base64 encoding. the file/string can be decompressed and decoded to its original status.

## Index of Contents

- [Install globally Deflate64](#install-globally-deflate64)
- [Usage of the cli Deflate64](#usage-of-the-cli-deflate64)
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

### Why I built this small utility

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
