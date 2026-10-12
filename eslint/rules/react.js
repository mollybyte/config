/**
 * React rules on top of `eslint-plugin-react` recommended (or what
 * `eslint-config-next` enables). Formatting is left to Prettier.
 *
 * @type {import('eslint').Linter.RulesRecord}
 */
export const reactRules = {
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/jsx-boolean-value': ['error', 'never'],
  'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  'react/jsx-sort-props': [
    'error',
    { callbacksLast: true, shorthandFirst: true, ignoreCase: true, reservedFirst: true },
  ],
}
