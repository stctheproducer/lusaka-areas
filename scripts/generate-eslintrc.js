/* eslint-env es6 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const eslintConfig = require('../.eslintrc.model.js')

/**
 * Console wrappers
 */
const error = (...args) => {
  console.error(chalk.red(...args))
}

const success = (...args) => {
  console.log(chalk.green(...args))
}

// Get type definitions from global declaration
const definitions = fs
  .readFileSync(path.join(__dirname, '../src/auto-imports.d.ts'))
  .toString()

const regex = /const\s(\w+):/g

// Create an array from all function names found
let matches = definitions.matchAll(regex)
matches = Array.from(matches)

// Map all function names to 'readonly'
const globals = {
  defineProps: 'readonly',
  defineEmits: 'readonly',
  defineExpose: 'readonly',
  withDefaults: 'readonly',
}
matches.map(([, match]) => (globals[match] = 'readonly'))

// eslintConfig.globals = globals

fs.writeFile(
  path.join(__dirname, '..', '.eslintrc.js'),
  `module.exports = ${JSON.stringify(eslintConfig, undefined, 2)}`,
  (err) => {
    if (err)
      error('[generate-eslintrc] Failed to generate .eslintrc.js:', err.message)

    success('[generate-eslintrc] Generated .eslintrc.js.')
  }
)
