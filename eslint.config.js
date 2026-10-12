// Dogfood: lint this package with its own base preset.
import base from './eslint/base.js'

export default [{ ignores: ['test/fixtures/**'] }, ...base]
