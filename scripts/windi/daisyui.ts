/**  @ts-ignore */
import tinycolor from 'tinycolor2'
import utilities from 'daisyui/dist/utilities'
import base from './styles/base'
import styled from './styles/styled'
import styledRtl from './styles/styled.rtl'
import utilitiesStyled from './styles/utilities-styled'
import unstyled from 'daisyui/dist/unstyled'
import unstyledRtl from 'daisyui/dist/unstyled.rtl'
import utilitiesUnstyled from 'daisyui/dist/utilities-unstyled'
import themes from 'daisyui/colors/themes'
import colorNames from 'daisyui/colors/colorNames'

import {
  DeepNestObject,
  NestObject,
  PluginFunction,
  PluginOutputWithOptions,
} from 'windicss/types/interfaces'

const mainFunction: PluginFunction = ({
  addBase,
  addComponents,
  config,
  theme,
  e,
}) => {
  let diasyuiIncludedItems = []
  let logs = false
  if (config('daisyui.logs') != false) {
    logs = true
  }
  if (logs) {
    console.log()
    console.log('\x1b[35m%s\x1b[0m', '🌼 DaisyUI components ', '\x1b[0m')
    console.group()
  }

  // inject @base style
  if (config('daisyui.base') != false) {
    addBase(base)
    diasyuiIncludedItems.push('base')
  }

  // Inject colors
  const colorObject: { [key: string]: string } = {
    transparent: 'transparent',
    current: 'currentColor',
  }
  for (const [key, item] of Object.entries(colorNames)) {
    colorObject[key] = `hsla(var(${item})/var(--tw-bg-opacity, 1))`
  }
  const baseColors = Object.assign({}, theme('colors'), colorObject)
  let names = Object.keys(baseColors)
  let root: { [key: string]: string | { [key: string]: string } } = {},
    css = {
      ':root': root,
    }
  names.forEach((col) => {
    root[`--${e(col)}`] = baseColors[col]
  })
  addComponents(css)

  // inject components
  // because rollupjs doesn't supprt dynamic require
  type Components =
    | typeof unstyled
    | typeof styled
    | typeof styledRtl
    | typeof unstyledRtl
  const deepNestifyObject = (object: Components) => {
    const deepNestedObject: { [key: string]: { [key: string]: string } } = {}
    for (const [k, v] of Object.entries(object)) {
      deepNestedObject[k] = v as { [key: string]: string }
    }
    return deepNestedObject as DeepNestObject
  }
  let file: DeepNestObject = deepNestifyObject(styled)
  if (config('daisyui.styled') == false && config('daisyui.rtl') != true) {
    diasyuiIncludedItems.push('unstyled components')
    file = deepNestifyObject(unstyled)
  } else if (
    config('daisyui.styled') == false &&
    config('daisyui.rtl') == true
  ) {
    diasyuiIncludedItems.push('unstyled components')
    console.log('\x1b[36m%s\x1b[0m', ' Direction:', '\x1b[0m', 'RTL')
    file = deepNestifyObject(unstyledRtl)
  } else if (
    config('daisyui.styled') != false &&
    config('daisyui.rtl') != true
  ) {
    diasyuiIncludedItems.push('components')
    file = deepNestifyObject(styled)
  } else if (
    config('daisyui.styled') !== false &&
    config('daisyui.rtl') == true
  ) {
    diasyuiIncludedItems.push('components')
    console.log('\x1b[36m%s\x1b[0m', ' Direction:', '\x1b[0m', 'RTL')
    file = deepNestifyObject(styledRtl)
  }
  addComponents(file)

  // let includedThemesObj = new Object()
  // let includedThemesObj: {
  //   [key: string]: { [key: string]: string } | string
  // } = {}
  let includedThemesObj: DeepNestObject = {}

  function convertThemeColorsToHsl(
    input: { [key: string]: string } | string
  ): NestObject | string {
    let resultObj: { [key: string]: string } = {}
    if (typeof input === 'object' && input !== null) {
      Object.entries(input).forEach(([rule, value]) => {
        if (colorNames.hasOwnProperty(rule)) {
          const tempColor = tinycolor(value)
          const [, h, s, l] = tempColor
            .toHslString()
            .match(/(\d{1,3}),\s(\d{1,3}%),\s(\d{1,3}%)/)
          resultObj[colorNames[rule]] = `${h} ${s} ${l}`
        } else {
          resultObj[rule] = value
        }
      })
      return resultObj
    }
    return input
  }

  // add light themes
  if (config('daisyui.themes') == false) {
    Object.entries(themes).forEach(([theme, index]) => {
      includedThemesObj[theme] = convertThemeColorsToHsl(
        themes[theme]
      ) as NestObject
    })
  }

  // add default themes
  if (config('daisyui.themes') != false) {
    Object.entries(themes).forEach(([theme, index]) => {
      includedThemesObj[theme] = convertThemeColorsToHsl(
        themes[theme]
      ) as NestObject
    })
  }

  // add custom themes
  if (Array.isArray(config('daisyui.themes'))) {
    const customThemes = config('daisyui.themes') as {
      [key: string]: string
    }[]
    customThemes.forEach((item, index) => {
      if (typeof item === 'object' && item !== null) {
        Object.entries(item).forEach(([customThemeName, customThemevalue]) => {
          includedThemesObj[`[data-theme=${customThemeName}]`] =
            convertThemeColorsToHsl(customThemevalue) as NestObject
        })
      }
    })
  }

  let themeOrder: (string | { [key: string]: string })[] = []
  if (Array.isArray(config('daisyui.themes'))) {
    const customThemes = config('daisyui.themes') as {
      [key: string]: string
    }[]
    customThemes.forEach((theme, index) => {
      if (typeof theme === 'object' && theme !== null) {
        Object.entries(theme).forEach(([customThemeName, customThemevalue]) => {
          themeOrder.push(customThemeName)
        })
      } else if (includedThemesObj.hasOwnProperty(`[data-theme=${theme}]`)) {
        themeOrder.push(theme)
      }
    })
  } else if (config('daisyui.themes') != false) {
    themeOrder = [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
    ]
  } else if (config('daisyui.themes') == false) {
    themeOrder.push('light')
  }

  // inject themes in order
  themeOrder.forEach((themeName, index) => {
    if (index === 0) {
      // first theme as root
      addBase({
        [':root']: includedThemesObj[`[data-theme=${themeName}]`],
      })
    } else if (index === 1) {
      // auto dark
      if (themeOrder[0] != 'dark' && themeOrder.includes('dark')) {
        addBase({
          ['@media (prefers-color-scheme: dark)']: {
            [':root']: includedThemesObj['[data-theme=dark]'],
          },
        })
      }
      // theme 0 with name
      addBase({
        [`[data-theme=${themeOrder[0]}]`]:
          includedThemesObj[`[data-theme=${themeOrder[0]}]`],
      })
      // theme 1 with name
      addBase({
        [`[data-theme=${themeOrder[1]}]`]:
          includedThemesObj[`[data-theme=${themeOrder[1]}]`],
      })
    } else {
      addBase({
        [`[data-theme=${themeName}]`]:
          includedThemesObj[`[data-theme=${themeName}]`],
      })
    }
  })
  diasyuiIncludedItems.push(`themes[${themeOrder.length}]`)

  // inject @utilities style needed by components
  if (config('daisyui.utils') != false) {
    addComponents(utilities, { variants: ['responsive'] })
    addComponents(utilitiesUnstyled, { variants: ['responsive'] })
    addComponents(utilitiesStyled, { variants: ['responsive'] })
    diasyuiIncludedItems.push('utilities')
  }

  if (logs) {
    console.log(
      '\x1b[32m%s\x1b[0m',
      '✔︎ Including:',
      '\x1b[0m',
      '' + diasyuiIncludedItems.join(', ')
    )

    console.log()
    console.groupEnd()
  }
}

interface DaisyUiPluginOptions {
  styled?: boolean
  themes?: boolean | (string | { [key: string]: { [key: string]: string } })[]
  base?: boolean
  utils?: boolean
  logs?: boolean
  rtl?: boolean
}

const defaultOptions: DaisyUiPluginOptions = {
  styled: true,
  themes: true,
  base: true,
  utils: true,
  logs: true,
  rtl: false,
}

const daisyuiPlugin = (options?: DaisyUiPluginOptions) =>
  ({
    __options: { ...defaultOptions, ...options },
    handler: mainFunction,
  } as PluginOutputWithOptions<DaisyUiPluginOptions>)

export default daisyuiPlugin
