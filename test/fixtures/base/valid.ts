import fs from 'node:fs'

import { maybe } from './helper'

interface Shape {
  size: number
}

export function read(path: string, shape: Shape): string {
  for (const n of [1, 2]) console.log(n)
  return `${fs.readFileSync(path, 'utf8')}${maybe ?? ''}${shape.size}`
}
