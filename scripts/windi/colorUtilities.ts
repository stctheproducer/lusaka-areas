import colorNames from './colorNames'
import {
  PluginFunction,
  PluginOutput,
  DeepNestObject,
  NestObject,
} from 'windicss/types/interfaces'

// Constants
// Add new color utilities based on theme
const baseColors: {
  [key: string]: ({
    opacityVariable,
    opacityValue,
  }: {
    opacityVariable: string
    opacityValue: string | number
  }) => string
} = {}
const textBaseColors: NestObject = {}
const textColors: NestObject = {}
const bgBaseColors: NestObject = {}
const bgColors: NestObject = {}
const borderBaseColors: NestObject = {}
const borderColors: NestObject = {}
const opacities = {
  0: '0',
  5: '0.05',
  10: '0.1',
  20: '0.2',
  25: '0.25',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  75: '0.75',
  80: '0.8',
  90: '0.9',
  95: '0.95',
  100: '1',
}
const borderSides = ['', 't-', 'r-', 'b-', 'l-']
const e = (string: string) => string.replace('.', '\\.').replace('/', '\\/')

export const generateColorUtilites = () => {
  // Generate baseColors
  for (const [key, item] of Object.entries(colorNames)) {
    baseColors[key] = ({ opacityVariable, opacityValue }) => {
      if (opacityValue !== undefined) {
        return `hsla(var(${item})/${opacityValue})`
      }
      if (opacityVariable !== undefined) {
        return `hsla(var(${item})/var(${opacityVariable}, 1))`
      }
      return `hsla(var(${item})`
    }
  }

  // Generate CSS variable values
  for (const [key, item] of Object.entries(colorNames)) {
    textBaseColors[key] = `hsla(var(${item})/var(--tw-text-opacity, 1))`
    bgBaseColors[key] = `hsla(var(${item})/var(--tw-bg-opacity, 1))`
    borderBaseColors[key] = `hsla(var(${item})/var(--tw-border-opacity, 1))`
  }

  // Map text colors
  let names = Object.keys(textBaseColors)
  names.forEach((col) => {
    textColors[col] = textBaseColors[col]
  })

  // Map background colors
  names = Object.keys(bgBaseColors)
  names.forEach((col) => {
    bgColors[col] = bgBaseColors[col]
  })

  // Map border colors
  names = Object.keys(borderBaseColors)
  names.forEach((col) => {
    borderColors[col] = borderBaseColors[col]
  })

  const newUtilities: DeepNestObject = {}

  // Add text classes
  Object.entries(textColors).forEach(([key, value]) => {
    newUtilities[e(`.text-${key}`)] = {
      '--tw-text-opacity': '1',
      color: value,
    }
    Object.entries(opacities).forEach(([k, v]) => {
      newUtilities[e(`.text-${key}/${k}`)] = {
        '--tw-text-opacity': v,
        color: value,
      }
    })
  })

  // Add background classes
  Object.entries(bgColors).forEach(([key, value]) => {
    newUtilities[e(`.bg-${key}`)] = {
      '--tw-bg-opacity': '1',
      'background-color': value,
    }
    Object.entries(opacities).forEach(([k, v]) => {
      newUtilities[e(`.bg-${key}/${k}`)] = {
        '--tw-bg-opacity': v,
        'background-color': value,
      }
    })
  })

  // Add border classes
  Object.entries(borderColors).forEach(([key, value]) => {
    borderSides.forEach((side) => {
      newUtilities[e(`.border-${side}${key}`)] = {
        '--tw-border-opacity': '1',
        'border-color': value,
      }
      Object.entries(opacities).forEach(([k, v]) => {
        newUtilities[e(`.border-${side}${key}/${k}`)] = {
          '--tw-border-opacity': v,
          'border-color': value,
        }
      })
    })
  })

  return { newUtilities, baseColors }
}

const { newUtilities } = generateColorUtilites()

const main: PluginFunction = ({ addUtilities }) => {
  addUtilities(newUtilities)
}

export default () =>
  ({
    handler: main,
  } as PluginOutput)
