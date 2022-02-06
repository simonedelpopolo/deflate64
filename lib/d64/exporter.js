// The exporter for all the properties of the main Object Module d64.
import * as Deflate64 from '../d64.js'
import { arguments_, argumentsSymbol } from './arguments.js'
import { compression, compressionSymbol } from './compression.js'
import { decode, decodeSymbol } from './decode.js'
import { encode, encodeSymbol } from './encode.js'
import { entryPoint, entryPointSymbol } from './entryPoint.js'
import { flag, flagSymbol } from './flags.js'
import { help, helpSymbol, version } from './help.js'
import { remote, remoteSymbol } from './remote.js'

const d64 = Deflate64
export default d64

export const arguments__ = arguments_[ argumentsSymbol ]
export const compression__ = compression[ compressionSymbol ]
export const decode__ = decode[ decodeSymbol ]
export const encode__ = encode[ encodeSymbol ]
export const entryPoint__ = entryPoint[ entryPointSymbol ]
export const flag__ = flag[ flagSymbol ]
export const help__ = help[ helpSymbol ]
export const remote__ = remote[ remoteSymbol ]
export const version__ = version
