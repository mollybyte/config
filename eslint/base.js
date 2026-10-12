import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import { typescriptRules } from './rules/typescript.js'
import { ALL_FILES, ignores, importConfig, prettier, unicornConfigs } from './shared.js'

/**
 * Base preset without the trailing Prettier block, reused by the react preset.
 *
 * @type {import('eslint').Linter.Config[]}
 */
export const baseConfigs = [
  ignores,
  { name: 'mollybyte/files', files: ALL_FILES },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: 'mollybyte/language-options',
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },
  ...unicornConfigs,
  importConfig,
  { name: 'mollybyte/typescript', rules: typescriptRules },
]

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [...baseConfigs, prettier]
