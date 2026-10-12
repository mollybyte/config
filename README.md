<div align="center">

# @mollybyte/config

**Strict, fast, Prettier-friendly ESLint and Prettier presets<br/>for TypeScript, React and Next.js.**

[![CI](https://github.com/mollybyte/config/actions/workflows/ci.yml/badge.svg)](https://github.com/mollybyte/config/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
![ESLint 10](https://img.shields.io/badge/ESLint-10-4B32C3?logo=eslint&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![Node 22+](https://img.shields.io/badge/Node-22%2B-5FA04E?logo=nodedotjs&logoColor=white)

</div>

---

- ⚡️ **Flat config, nothing legacy.** No `FlatCompat` and no type-aware parsing, so there's no `tsconfig` to wire up.
- 🎨 **Prettier owns formatting.** Every preset ends with `eslint-config-prettier`, so the two tools never fight.
- 📦 **One install.** Plugins ship as dependencies. You add ESLint, Prettier and TypeScript, not a dozen plugins.
- 🧩 **Modular.** Pick `base`, `react` or `next`, then extend with plain flat-config blocks.
- 🔷 **Typed.** Declarations are included, so `eslint.config.ts` works out of the box.

## Quick start

```bash
npm i -D github:mollybyte/config eslint prettier typescript
```

```js
// eslint.config.mjs
export { default } from '@mollybyte/config/eslint/next'
```

```jsonc
// package.json
{
  "prettier": "@mollybyte/config/prettier",
}
```

For the Next.js preset, also install `eslint-config-next` matching your `next` version. To pin a release, use `github:mollybyte/config#v2.0.0`.

## Presets

| Preset                           | Use for                  | Built on                                                              |
| :------------------------------- | :----------------------- | :-------------------------------------------------------------------- |
| `@mollybyte/config/eslint/base`  | Any JS / TS project      | `@eslint/js` · `typescript-eslint` · `unicorn` · `import-x` · globals |
| `@mollybyte/config/eslint/react` | React apps and libraries | **base** + `react` · `react-hooks` · `jsx-a11y`                       |
| `@mollybyte/config/eslint/next`  | Next.js 16+              | `eslint-config-next` (core-web-vitals + typescript) + the same rules  |
| `@mollybyte/config/eslint`       | Next.js (1.x path)       | Alias of `eslint/next`                                                |
| `@mollybyte/config/prettier`     | Everything               | Prettier options                                                      |

<details>
<summary><b>What the rules enforce</b></summary>

<br/>

**TypeScript**

- `no-explicit-any`, `no-non-null-assertion`
- `consistent-type-imports`, `consistent-type-definitions: interface`
- `no-empty-object-type` (single-`extends` interfaces allowed)
- `no-unused-vars` ignores names starting with `_`

**Imports**

- `import-x/order`: builtin → external → internal → parent → sibling → index, a blank line between groups, alphabetized
- `import-x/no-duplicates`

**React**

- `react/jsx-sort-props`: reserved first, shorthand first, callbacks last
- `react/jsx-boolean-value: never`, `react/jsx-curly-brace-presence: never`
- `react-hooks` 7 recommended, **including the React Compiler rules** (`set-state-in-effect`, `purity`, `refs`, `immutability`, …). Turn individual ones off if your codebase isn't ready for them.
- `jsx-a11y` recommended. In Next.js, `alt-text` also covers `<Image>`, and `no-img-element` and `google-font-display` are errors.

**Unicorn**

- `filename-case` allows kebab-, Pascal- and camelCase
- Off: `no-null`, `name-replacements`, `no-array-reduce`, `prefer-top-level-await`, `expiring-todo-comments`, and the comment-style rules, so classic `*`-prefixed JSDoc is left alone.

**Prettier**

No semicolons, single quotes, trailing commas everywhere, `printWidth: 100`, `arrowParens: avoid`, LF line endings.

</details>

## Usage

Each ESLint entry is a flat config array (`Linter.Config[]`).

```js
// eslint.config.mjs
export { default } from '@mollybyte/config/eslint/react'

// or '@mollybyte/config/eslint/base' for TypeScript, Node and libraries
// or '@mollybyte/config/eslint/next' for Next.js
```

### Extending

Append your own blocks after the preset:

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

> [!WARNING]
> Add **rules only**, not plugins the preset already registers. Spreading, say, `react.configs.flat.recommended` on top registers `react` a second time and fails with `Cannot redefine plugin`. In the Next.js preset, `react`, `react-hooks`, `jsx-a11y`, `import`, `@next/next` and `@typescript-eslint` come from `eslint-config-next`.

### Prettier

Reference the preset from `package.json`, as in the quick start, or from `.prettierrc`:

```json
"@mollybyte/config/prettier"
```

### VS Code

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.organizeImports": "explicit"
  }
}
```

## Requirements

|                | Version                                             |
| :------------- | :-------------------------------------------------- |
| Node.js        | 22+                                                 |
| ESLint         | 10.4+ (required by `eslint-plugin-unicorn` 77)      |
| Prettier       | 3                                                   |
| TypeScript     | 5+ (`typescript-eslint` 8 currently supports < 6.1) |
| Next.js preset | `next` 16 and `eslint-config-next` 16               |

## Migrating from `@aerosium/config` 1.x

<details>
<summary><b>Step by step</b></summary>

<br/>

1. **Swap the package**

   ```bash
   npm rm @aerosium/config && npm i -D github:mollybyte/config
   ```

2. **Drop the old peer plugins** unless you use them directly: `@eslint/eslintrc`, `@eslint/js`, `@next/eslint-plugin-next`, `@typescript-eslint/*`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-unicorn`, `eslint-import-resolver-typescript`. Keep `eslint-config-next` for the Next.js preset.

3. **Upgrade** to ESLint 10 and Node 22+, and to Next.js 16 if you use the Next.js preset.

4. **Update imports**

   | 1.x                         | 2.x                                                                                |
   | :-------------------------- | :--------------------------------------------------------------------------------- |
   | `@aerosium/config/eslint`   | `@mollybyte/config/eslint` (or `…/eslint/next`, `…/eslint/react`, `…/eslint/base`) |
   | `@aerosium/config/prettier` | `@mollybyte/config/prettier`                                                       |

5. **Rename rules** in overrides and `eslint-disable` comments

   | 1.x                                     | 2.x                                       |
   | :-------------------------------------- | :---------------------------------------- |
   | `import/order`                          | `import-x/order`                          |
   | `import/no-duplicates`                  | `import-x/no-duplicates`                  |
   | `@typescript-eslint/no-empty-interface` | `@typescript-eslint/no-empty-object-type` |
   | `unicorn/prevent-abbreviations`         | `unicorn/name-replacements`               |
   | `unicorn/no-array-for-each`             | `unicorn/no-for-each`                     |

6. **Fix and format.** Run `npx eslint . --fix`, then `npx prettier --write .`. Formatting rules (`semi`, `quotes`, `react/jsx-max-props-per-line`, …) are no longer in ESLint; Prettier handles them.

The full list of changes is in [CHANGELOG.md](./CHANGELOG.md).

</details>

## License

[MIT](./LICENSE) © mollybyte
