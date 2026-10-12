// Building blocks shared by the presets. Not a public entry point.
//
// Rule maps live in ./rules/*.js as plain objects; plugin registration happens
// here, separately, so the `next` preset can reuse the rule maps without
// registering plugins that eslint-config-next already owns.
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importX from 'eslint-plugin-import-x'
import unicorn from 'eslint-plugin-unicorn'

import { importRules } from './rules/imports.js'
import { unicornRules } from './rules/unicorn.js'

/**
 * Every file type the presets lint.
 */
export const ALL_FILES = ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}']

/**
 * @type {import('eslint').Linter.Config}
 */
export const ignores = {
  name: 'mollybyte/ignores',
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.next/**',
    '**/coverage/**',
    '**/out/**',
  ],
}

/**
 * @type {import('eslint').Linter.Config[]}
 */
export const unicornConfigs = [
  unicorn.configs.recommended,
  { name: 'mollybyte/unicorn', rules: unicornRules },
]

/**
 * Registers `import-x` (never clashes with eslint-config-next's `import`).
 *
 * @type {import('eslint').Linter.Config}
 */
export const importConfig = {
  name: 'mollybyte/import-x',
  files: ALL_FILES,
  plugins: { 'import-x': importX },
  settings: {
    'import-x/resolver-next': [createTypeScriptImportResolver({ alwaysTryTypes: true })],
  },
  rules: importRules,
}

export { default as prettier } from 'eslint-config-prettier/flat'
