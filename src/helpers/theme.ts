// import { useDark, useToggle } from '@vueuse/core'
// import { useThemeChange } from '@/composables/useThemeChange'

// const selector = 'html'
// const attribute = 'data-theme'
// const valueDark = 'dark'
// const valueLight = 'light'

// export const { themes, changeTheme } = useThemeChange({
//   selector,
//   attribute,
// })

// export const isDark = useDark({
//   attribute,
//   valueDark,
//   valueLight,
//   onChanged: (v: boolean) => {
//     changeTheme(v, valueDark, valueLight)
//   },
// })

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
