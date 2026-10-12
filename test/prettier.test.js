import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { it } from 'node:test'

import prettier from 'prettier'

const root = path.join(import.meta.dirname, '..')

it('resolves "prettier": "@mollybyte/config/prettier" from package.json', async () => {
  const expected = JSON.parse(await readFile(path.join(root, 'prettier/index.json'), 'utf8'))
  const config = await prettier.resolveConfig(path.join(root, 'eslint/base.js'), {
    editorconfig: false,
  })
  assert.deepEqual(config, expected)
})
