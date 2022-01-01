import * as Deflate64 from '../d64.js'
import { arguments_ as a, argumentsSymbol as as } from './arguments.js'
import { entryPoint as ep, entryPointSymbol as eps } from './entryPoint.js'
import { help as h, helpSymbol as hs, version as v } from './help.js'

const d64 = Deflate64
export default d64

export const entryPoint = ep
export const entryPointSymbol = eps

export const arguments_ = a
export const argumentsSymbol = as

export const help = h
export const helpSymbol = hs
export const version = v
