/**
 * Overrides for `eslint-plugin-unicorn` recommended.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export const unicornRules = {
  'unicorn/filename-case': [
    'error',
    { cases: { kebabCase: true, pascalCase: true, camelCase: true } },
  ],
  'unicorn/no-null': 'off',
  'unicorn/expiring-todo-comments': 'off',
  // Formerly `unicorn/prevent-abbreviations` (renamed in unicorn 77).
  'unicorn/name-replacements': 'off',
  'unicorn/no-array-reduce': 'off',
  'unicorn/prefer-top-level-await': 'off',
  // New in unicorn 77 recommended; they rewrite classic ` * `-prefixed JSDoc blocks.
  'unicorn/no-asterisk-prefix-in-documentation-comments': 'off',
  'unicorn/single-line-block-comment-style': 'off',
}
