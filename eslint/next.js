import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import jsxA11y from 'eslint-plugin-jsx-a11y'

import { reactRules } from './rules/react.js'
import { typescriptRules } from './rules/typescript.js'
import { ignores, importConfig, prettier, unicornConfigs } from './shared.js'

// eslint-config-next registers `react`, `react-hooks`, `jsx-a11y`, `import` and
// `@next/next` for these files, and `@typescript-eslint` globally. Registering
// any of those keys again with another plugin instance throws
// "Cannot redefine plugin", so below they only get `rules`, scoped to the same files.
const NEXT_FILES = ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}']

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ignores,
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Plugins eslint-config-next does not register.
  ...unicornConfigs,
  importConfig,
  // Rules only, after next's own blocks (it downgrades no-unused-vars to warn).
  { name: 'mollybyte/next/typescript', rules: typescriptRules },
  {
    name: 'mollybyte/next/react',
    files: NEXT_FILES,
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactRules,
      // A severity-only override would keep next's options (`elements: ['img']`).
      'jsx-a11y/alt-text': [
        'error',
        { elements: ['img', 'object', 'area', 'input[type="image"]'], img: ['Image'] },
      ],
      '@next/next/google-font-display': 'error',
      '@next/next/no-img-element': 'error',
    },
  },
  prettier,
]
