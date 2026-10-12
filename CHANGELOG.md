# Changelog

## 2.0.0

### Breaking changes

- Renamed from `@aerosium/config` to `@mollybyte/config`.
- Requires ESLint 10.4+, Node.js 22+ and, for the Next.js preset, Next.js 16 / `eslint-config-next` 16. ESLint 8/9 and Next.js 14/15 are no longer supported.
- Flat config only. `FlatCompat` and `@eslint/eslintrc` are gone; the Next.js preset uses the native flat configs `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
- Plugins are now dependencies of this package instead of peer dependencies. Peers are only `eslint`, `prettier`, `typescript` and (optional) `eslint-config-next`.
- Removed all formatting rules that Prettier owns (`semi`, `quotes`, `react/jsx-max-props-per-line`, `react/jsx-closing-bracket-location`, …). `eslint-config-prettier` is now the last block of every preset, which also disables `unicorn/no-nested-ternary` (previously `error`).
- Import ordering moved from `eslint-plugin-import` to `eslint-plugin-import-x`: use `import-x/order` and `import-x/no-duplicates` in overrides and disable comments. (`eslint-plugin-import`'s `import/order` crashes on ESLint 10.)
- `@typescript-eslint/no-empty-interface` (deprecated) replaced by `@typescript-eslint/no-empty-object-type` with `allowInterfaces: 'with-single-extends'`.
- Type-aware linting removed: no `parserOptions.project` / `tsconfigRootDir`, no `settings.next.rootDir`.
- `eslint-plugin-react-hooks` 7 recommended is enabled, including the React Compiler rules (`set-state-in-effect`, `purity`, `refs`, …).
- `eslint-plugin-unicorn` 77: `prevent-abbreviations` is now `name-replacements` (still off); its new comment-style rules (`no-asterisk-prefix-in-documentation-comments`, `single-line-block-comment-style`) are turned off.
- Removed the non-existent `main` entry.

### Added

- Modular presets: `@mollybyte/config/eslint/base`, `…/eslint/react`, `…/eslint/next`. `@mollybyte/config/eslint` stays as an alias of the Next.js preset.
- TypeScript declarations for every ESLint entry (`eslint.config.ts` support).
- Ignores for `**/.next/**`, `**/coverage/**` and `**/out/**` in addition to `node_modules`, `dist` and `build`.
- Tests, CI, LICENSE and this changelog.

### Changed

- Every rule is configured once (1.x repeated many rules in two to four blocks).
- Prettier config: removed the redundant `overrides` block (`tabWidth` is already 2).

## 1.x

Published as `@aerosium/config`: a single Next.js-oriented ESLint config built with `FlatCompat`, plus the Prettier config.
