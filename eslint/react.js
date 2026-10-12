import { fixupPluginRules } from '@eslint/compat'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

import { baseConfigs } from './base.js'
import { reactRules } from './rules/react.js'
import { ALL_FILES, prettier } from './shared.js'

// eslint-plugin-react 7.x and jsx-a11y 6.x still call rule-context methods that
// ESLint 10 removed (e.g. `context.getFilename()` for React version detection).
// @eslint/compat shims them. Use one wrapped instance per plugin everywhere.
const reactPlugin = fixupPluginRules(react)
const jsxA11yPlugin = fixupPluginRules(jsxA11y)

const reactRecommended = react.configs.flat.recommended
const reactJsxRuntime = react.configs.flat['jsx-runtime']

/**
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...baseConfigs,
  {
    name: 'mollybyte/react',
    files: ALL_FILES,
    plugins: { react: reactPlugin, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11yPlugin },
    languageOptions: reactRecommended.languageOptions,
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactRecommended.rules,
      ...reactJsxRuntime.rules,
      ...reactHooks.configs.flat.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      ...reactRules,
    },
  },
  prettier,
]
