import * as Deflate64 from '../d64.js'
import { arguments_ as a, argumentsSymbol as as } from './arguments.js'
import { decode as d, decodeSymbol as ds } from './decode.js'
import { encode as e, encodeSymbol as es } from './encode.js'
import { entryPoint as ep, entryPointSymbol as eps } from './entryPoint.js'
import { flag as f, flagSymbol as fs } from './flags.js'
import { remote as r, remoteSymbol as rs } from './remote.js'
// eslint-disable-next-line sort-imports
import { help as h, helpSymbol as hs, version as v } from './help.js'

const d64 = Deflate64
export default d64

export const arguments_ = a
export const argumentsSymbol = as

export const decode = d
export const decodeSymbol = ds

export const encode = e
export const encodeSymbol = es

export const entryPoint = ep
export const entryPointSymbol = eps

export const flag = f
export const flagSymbol = fs

export const remote = r
export const remoteSymbol = rs

export const help = h
export const helpSymbol = hs
export const version = v
