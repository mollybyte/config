/**
 * TypeScript rules on top of `typescript-eslint` recommended.
 * Plain rule map: the plugin is registered by the preset that uses it.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export const typescriptRules = {
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
  ],
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-non-null-assertion': 'error',
  '@typescript-eslint/consistent-type-imports': [
    'error',
    { prefer: 'type-imports', disallowTypeAnnotations: false },
  ],
  '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
  '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
}
