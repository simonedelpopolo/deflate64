/**
 * Deflate 64 option object.
 *
 * @typedef {Object} d64Options
 * @property {string|null} [file] - path to filename
 * @property {string|boolean|null} [json] - will follow definition
 * @property {boolean} [no_compression=false] - if the output should be compressed
 * @property {boolean|null} [plain=null|true] - in case the input is extracted from json string but output must be only string
 * @property {boolean} [quiet=false] - do NOT print to stdout the output
 * @property {boolean} [ratio=null|true] calculate and print to stdout compression ratio and the encoded/decoded data
 * @property {string|undefined} [remote=undefined] - URL to file
 * @property {string|undefined} [save=undefined] - path to filename to save encoded/decoded data
 * @property {string|null} string - to encode/decode at least this option is required.
 */
