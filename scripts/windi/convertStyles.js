/** @ts-ignore */
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const baseRaw = require('daisyui/dist/base')
const styledRaw = require('daisyui/dist/styled')
const styledRtlRaw = require('daisyui/dist/styled.rtl')
const utilitiesStyledRaw = require('daisyui/dist/utilities-styled')

const deepReplaceRecursive = (oldValue, newValue, obj) => {
  const newObj = _.clone(obj)

  _.each(newObj, (val, key) => {
    // replace if value is a string
    if (_.isString(val)) {
      newObj[key] = val.replace(oldValue, newValue)
    } else if (_.isObject(val) || _.isArray(val)) {
      // if val has nested values, make recursive call
      newObj[key] = deepReplaceRecursive(oldValue, newValue, val)
    }
  })

  return newObj
}

// Make the replacements
console.time('Styles replaced in')
const files = {
  base: deepReplaceRecursive(/\)\//g, ')/', baseRaw),
  styled: deepReplaceRecursive(/\)\//g, ')/', styledRaw),
  'styled.rtl': deepReplaceRecursive(/\)\//g, ')/', styledRtlRaw),
  'utilities-styled': deepReplaceRecursive(/\)\//g, ')/', utilitiesStyledRaw),
}
console.timeEnd('Styles replaced in')

// Write the files
const directory = path.join(__dirname, 'styles')
if (!fs.existsSync(directory)) fs.mkdirSync(directory)

Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(
    path.join(`${directory}/${file}.ts`),
    `export default ${JSON.stringify(content)}`
  )
})
