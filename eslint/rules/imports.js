/**
 * Import ordering rules (`eslint-plugin-import-x`, registered as `import-x`).
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export const importRules = {
  'import-x/no-duplicates': 'error',
  'import-x/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc' },
    },
  ],
}
