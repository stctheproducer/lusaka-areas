import { createI18n } from 'vue-i18n'
import { UserModule } from '@/@types'

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('../intl/messages/*.y(a)?ml')).map(
    ([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(17, yaml ? -5 : -4), value.default]
    }
  )
)

const numberFormats = Object.fromEntries(
  Object.entries(import.meta.globEager('../intl/number-formats/*.y(a)?ml')).map(
    ([key, value]) => {
      const yaml = key.endsWith('.yaml')

      Object.keys(value.default).forEach((property) => {
        Object.keys(value.default[property]).forEach(
          (prop) =>
            (value.default[property][prop] =
              value.default[property][prop].source)
        )
      })

      return [key.slice(23, yaml ? -5 : -4), value.default]
    }
  )
)

const datetimeFormats = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../intl/datetime-formats/*.y(a)?ml')
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')

    Object.keys(value.default).forEach((property) => {
      Object.keys(value.default[property]).forEach(
        (prop) =>
          (value.default[property][prop] = value.default[property][prop].source)
      )
    })

    return [key.slice(25, yaml ? -5 : -4), value.default]
  })
)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en-ZM',
    messages,
    numberFormats,
    datetimeFormats,
  })

  app.use(i18n)
}
