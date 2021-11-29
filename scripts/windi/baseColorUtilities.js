const colorNames = require('./colorNames')
const baseColors = {}

generateColorUtilities = () => {
  // Generate baseColors
  for (const [key, value] of Object.entries(colorNames)) {
    baseColors[key] = ({ opacityVariable, opacityValue }) => {
      if (opacityValue !== undefined) {
        return `hsla(var(${value}), ${opacityValue})`
      }
      if (opacityVariable !== undefined) {
        return `hsla(var(${value}), var(${opacityVariable}, 1))`
      }
      return `hsla(var(${value})`
    }
  }

  return baseColors
}

generateColorUtilities()

module.exports = generateColorUtilities
