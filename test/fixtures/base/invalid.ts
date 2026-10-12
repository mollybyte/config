import { maybe } from './helper'
import fs from 'node:fs';

type Shape = { size: number }

const unused = "double quotes are Prettier's business";

export function read(input: any, shape: Shape): string {
  ;[1, 2].forEach(n => console.log(n))
  return fs.readFileSync(String(input), 'utf8') + maybe! + shape.size
}
