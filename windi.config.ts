import { defineConfig } from 'windicss/helpers'
import defaultTheme from 'windicss/defaultTheme'
import colors from 'windicss/colors'

// Plugins
import aspectRatio from 'windicss/plugin/aspect-ratio'
import lineClamp from 'windicss/plugin/line-clamp'
import forms from 'windicss/plugin/forms'
import typography from 'windicss/plugin/typography'
import mobileClientUtilities from './scripts/windi/mobileClientUtilities'
// import daisyuiPlugin from './scripts/windi/daisyui'
// import { generateColorUtilites } from './scripts/windi/colorUtilities'
// import filters from 'windicss/plugin/filters'
// import scrollSnap from 'windicss/plugin/scroll-snap'
// import animations from '@windicss/plugin-animations'
// import heroPatterns from '@windicss/plugin-heropatterns'
// import interactionVariants from '@windicss/plugin-interaction-variants'
// import questionMark from '@windicss/plugin-question-mark'
// import scrollbar from '@windicss/plugin-scrollbar'
// const { baseColors: themeColors } = generateColorUtilites()

export default defineConfig({
  darkMode: 'class',

  attributify: true,
  // attributify: {
  //   prefix: 'w',
  // },

  plugins: [
    forms,
    aspectRatio,
    lineClamp,
    typography({ dark: true }),
    // https://daisyui.com/
    // transform is an import from `@windicss/helpers`
    // transform('daisyui'),
    // daisyuiPlugin(),
    mobileClientUtilities(),
  ],
  // https://daisyui.com/docs/config
  // daisyui: {},

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
        // ...themeColors,
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              opacity: 0.75,
              fontWeight: '500',
              textDecoration: 'underline',
              '&:hover': {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
    },
  },
})
