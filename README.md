# @mollybyte/config

Shared ESLint (flat config) and Prettier configuration for TypeScript, React and Next.js projects.

- ESLint 10 flat config, no `FlatCompat`, no type-aware linting (fast, no `tsconfig` wiring).
- Formatting belongs to Prettier: every preset ends with `eslint-config-prettier`.
- Plugins ship as dependencies — you install ESLint, Prettier and TypeScript, not a dozen plugins.

## Presets

| Import                           | For                       | Includes                                                                                                                                             |
| -------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@mollybyte/config/eslint/base`  | Any JS/TS project         | `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-unicorn` recommended, import ordering (`import-x`), browser + node globals |
| `@mollybyte/config/eslint/react` | React apps and libraries  | base + `eslint-plugin-react` (recommended + JSX runtime), `eslint-plugin-react-hooks` recommended, `eslint-plugin-jsx-a11y` recommended              |
| `@mollybyte/config/eslint/next`  | Next.js 16+               | `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`, plus the same TypeScript, unicorn, import, React and a11y rules as above     |
| `@mollybyte/config/eslint`       | Next.js (1.x import path) | Alias of `eslint/next`                                                                                                                               |
| `@mollybyte/config/prettier`     | Everything                | Prettier options: no semicolons, single quotes, trailing commas, `printWidth` 100, `arrowParens: avoid`, LF                                          |

Notable rules on top of the recommended sets:

- `@typescript-eslint/no-explicit-any`, `no-non-null-assertion`, `consistent-type-imports`, `consistent-type-definitions: interface`, `no-empty-object-type` (single-`extends` interfaces allowed), `no-unused-vars` (ignores `^_`).
- `import-x/order` (builtin → external → internal → parent → sibling → index, newline between groups, alphabetized) and `import-x/no-duplicates`.
- `react/jsx-sort-props` (reserved first, shorthand first, callbacks last), `react/jsx-boolean-value: never`, `react/jsx-curly-brace-presence: never`.
- `unicorn/filename-case` allows kebab-, Pascal- and camelCase; `no-null`, `name-replacements`, `no-array-reduce`, `prefer-top-level-await`, `expiring-todo-comments` are off, and so are unicorn 77's `no-asterisk-prefix-in-documentation-comments` and `single-line-block-comment-style`, so classic `*`-prefixed JSDoc blocks are left alone.
- `react-hooks` 7 recommended includes the React Compiler rules (`set-state-in-effect`, `purity`, `refs`, `immutability`, …) at their recommended severity. Turn individual ones off if your codebase is not ready for them.

## Install

```bash
npm i -D @mollybyte/config eslint prettier typescript
```

For the Next.js preset also install `eslint-config-next` (matching your `next` version):

```bash
npm i -D eslint-config-next
```

## Usage

Each ESLint export is a flat config array (`Linter.Config[]`). Create `eslint.config.mjs`:

```js
// TypeScript / Node / libraries
export { default } from '@mollybyte/config/eslint/base'
```

```js
// React
export { default } from '@mollybyte/config/eslint/react'
```

```js
// Next.js
export { default } from '@mollybyte/config/eslint/next'
```

Extending and overriding — append your own blocks after the preset:

```js
import next from '@mollybyte/config/eslint/next'

export default [
  ...next,
  { ignores: ['generated/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'unicorn/no-null': 'error',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]
```

Type declarations are included, so `eslint.config.ts` works too.

Use one preset per file set. Each preset registers its plugins itself (in the Next.js preset `react`, `react-hooks`, `jsx-a11y`, `import`, `@next/next` and `@typescript-eslint` plugins come from `eslint-config-next`; the React preset registers `@eslint/compat`-wrapped `react` and `jsx-a11y`). Registering the same plugin key again with another instance — e.g. spreading `react.configs.flat.recommended` on top — throws `Cannot redefine plugin`; add `rules` only.

## Prettier

In `package.json`:

```json
{
  "prettier": "@mollybyte/config/prettier"
}
```

or in `.prettierrc`:

```json
"@mollybyte/config/prettier"
```

## VS Code settings

```json
{
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": "always",
    "source.organizeImports": "explicit",
    "source.fixAll.eslint": "always"
  },
  "prettier.arrowParens": "avoid"
}
```

## Migrating from @aerosium/config 1.x

1. Replace the package: `npm rm @aerosium/config && npm i -D @mollybyte/config`.
2. Remove the plugins you installed as peers (`@eslint/eslintrc`, `@eslint/js`, `@next/eslint-plugin-next`, `@typescript-eslint/*`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-unicorn`, `eslint-import-resolver-typescript`) unless you use them directly. Keep `eslint-config-next` for the Next.js preset.
3. Upgrade to ESLint 10, Node 22+ and (for the Next.js preset) Next.js 16.
4. Change imports: `@aerosium/config/eslint` → `@mollybyte/config/eslint` (or `…/eslint/next`, `…/eslint/react`, `…/eslint/base`), and `@aerosium/config/prettier` → `@mollybyte/config/prettier`.
5. Rename rule references in overrides and `eslint-disable` comments: `import/order` → `import-x/order`, `import/no-duplicates` → `import-x/no-duplicates`, `@typescript-eslint/no-empty-interface` → `@typescript-eslint/no-empty-object-type`, `unicorn/prevent-abbreviations` → `unicorn/name-replacements`, `unicorn/no-array-for-each` → `unicorn/no-for-each`.
6. Run `npx eslint . --fix` and `npx prettier --write .`. Formatting rules (`semi`, `quotes`, `react/jsx-max-props-per-line`, …) are gone from ESLint — run Prettier instead.

See [CHANGELOG.md](./CHANGELOG.md) for the full list of changes.

## Requirements

- Node.js 22 or newer
- ESLint 10.4 or newer (required by `eslint-plugin-unicorn` 77)
- Prettier 3
- TypeScript 5 or newer; note that `typescript-eslint` 8 currently supports TypeScript below 6.1
- Next.js preset: Next.js 16 and `eslint-config-next` 16

## License

[MIT](./LICENSE)
