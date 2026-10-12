import assert from 'node:assert/strict'
import path from 'node:path'
import { describe, it } from 'node:test'

import { ESLint } from 'eslint'

const fixtures = path.join(import.meta.dirname, 'fixtures')

const formattingRules = [
  'semi',
  'quotes',
  'indent',
  'comma-dangle',
  'react/jsx-max-props-per-line',
  'react/jsx-closing-bracket-location',
  'react/jsx-indent',
  'unicorn/empty-brace-spaces',
]

const presets = {
  base: {
    invalid: 'invalid.ts',
    valid: ['valid.ts', 'helper.ts'],
    expected: [
      'import-x/order',
      '@typescript-eslint/no-explicit-any',
      '@typescript-eslint/no-non-null-assertion',
      '@typescript-eslint/no-unused-vars',
      '@typescript-eslint/consistent-type-definitions',
      'unicorn/no-for-each',
    ],
  },
  react: {
    invalid: 'invalid.tsx',
    valid: ['valid.tsx'],
    expected: [
      '@typescript-eslint/no-explicit-any',
      'react/jsx-sort-props',
      'react/jsx-boolean-value',
      'react/jsx-curly-brace-presence',
      'react-hooks/rules-of-hooks',
      'jsx-a11y/alt-text',
    ],
  },
  next: {
    invalid: 'invalid.tsx',
    valid: ['pages/index.tsx'],
    expected: [
      'import-x/order',
      '@typescript-eslint/no-explicit-any',
      'unicorn/no-for-each',
      '@next/next/no-img-element',
      'react/jsx-sort-props',
      'react/jsx-curly-brace-presence',
      'jsx-a11y/alt-text',
    ],
  },
}

const severity = entry => {
  const value = Array.isArray(entry) ? entry[0] : entry
  return { off: 0, warn: 1, error: 2 }[value] ?? value
}

const createLinter = name => {
  const cwd = path.join(fixtures, name)
  return new ESLint({ cwd, overrideConfigFile: path.join(cwd, 'eslint.config.js') })
}

for (const [name, preset] of Object.entries(presets)) {
  describe(`${name} preset`, () => {
    const eslint = createLinter(name)

    it('loads and lints without fatal errors', async () => {
      const results = await eslint.lintFiles([preset.invalid, ...preset.valid])
      for (const result of results) {
        const fatal = result.messages.filter(message => message.fatal || !message.ruleId)
        assert.deepEqual(fatal, [], `fatal messages in ${result.filePath}`)
      }
    })

    it('reports the expected rules as errors', async () => {
      const [result] = await eslint.lintFiles([preset.invalid])
      const errors = new Set(
        result.messages.filter(message => message.severity === 2).map(message => message.ruleId),
      )
      for (const ruleId of preset.expected) {
        assert.ok(errors.has(ruleId), `expected ${ruleId}, got: ${[...errors].join(', ')}`)
      }
    })

    it('leaves formatting to Prettier', async () => {
      const config = await eslint.calculateConfigForFile(preset.invalid)
      for (const rule of formattingRules) {
        const entry = config.rules[rule]
        assert.ok(entry === undefined || severity(entry) === 0, `${rule} should be off`)
      }
      const [result] = await eslint.lintFiles([preset.invalid])
      const reported = new Set(result.messages.map(message => message.ruleId))
      assert.ok(!reported.has('semi') && !reported.has('quotes'))
    })

    it('enforces unused vars as an error with the ^_ ignore pattern', async () => {
      const config = await eslint.calculateConfigForFile(preset.invalid)
      const [level, options] = config.rules['@typescript-eslint/no-unused-vars']
      assert.equal(severity(level), 2)
      assert.equal(options.argsIgnorePattern, '^_')
      assert.equal(options.varsIgnorePattern, '^_')
    })

    it('produces no problems for the clean sample', async () => {
      const results = await eslint.lintFiles(preset.valid)
      for (const result of results) {
        assert.deepEqual(
          result.messages.map(message => `${message.ruleId}: ${message.message}`),
          [],
          result.filePath,
        )
      }
    })
  })
}

describe('package exports', () => {
  it('exposes every preset as a flat config array', async () => {
    for (const entry of ['eslint', 'eslint/base', 'eslint/react', 'eslint/next']) {
      const { default: config } = await import(`@mollybyte/config/${entry}`)
      assert.ok(Array.isArray(config) && config.length > 0, entry)
    }
  })

  it('aliases ./eslint to the next preset', async () => {
    const { default: alias } = await import('@mollybyte/config/eslint')
    const { default: next } = await import('@mollybyte/config/eslint/next')
    assert.equal(alias, next)
  })

  it('puts eslint-config-prettier last in every preset', async () => {
    const { default: prettier } = await import('eslint-config-prettier/flat')
    for (const entry of ['eslint/base', 'eslint/react', 'eslint/next']) {
      const { default: config } = await import(`@mollybyte/config/${entry}`)
      assert.equal(config.at(-1), prettier, entry)
    }
  })
})
