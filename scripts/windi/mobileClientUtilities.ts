import {
  PluginFunction,
  PluginOutput,
  DeepNestObject,
} from 'windicss/types/interfaces'

// make things reasonably friendly for mobile clients
// ...especially iPhones - THANKS APPLE!
const main: PluginFunction = ({ addUtilities }) => {
  const newUtilities: DeepNestObject = {
    '.safe-top-const': {
      paddingTop: 'constant(safe-area-inset-top)',
    },
    '.safe-top-env': {
      paddingTop: 'env(safe-area-inset-top)',
    },
    '.safe-left-const': {
      paddingLeft: 'constant(safe-area-inset-left)',
    },
    '.safe-left-env': {
      paddingLeft: 'env(safe-area-inset-left)',
    },
    '.safe-right-const': {
      paddingRight: 'constant(safe-area-inset-right)',
    },
    '.safe-right-env': {
      paddingRight: 'env(safe-area-inset-right)',
    },
    '.safe-bottom-const': {
      paddingBottom: 'constant(safe-area-inset-bottom)',
    },
    '.safe-bottom-env': {
      paddingBottom: 'env(safe-area-inset-bottom)',
    },
  }
  addUtilities(newUtilities)
}

export default () =>
  ({
    handler: main,
  } as PluginOutput)
