import { computed, ref, watch, WritableComputedRef } from 'vue-demi'
import { isClient } from '@vueuse/shared'
import {
  StorageLike,
  StorageOptions,
  useStorage,
  tryOnMounted,
} from '@vueuse/core'
const defaultWindow = /* #__PURE__ */ isClient ? window : undefined

export declare type ColorThemes =
  | 'auto'
  | 'light'
  | 'dark'
  | 'cupcake'
  | 'bumblebee'
  | 'emerald'
  | 'corporate'
  | 'synthwave'
  | 'retro'
  | 'cyberpunk'
  | 'valentine'
  | 'halloween'
  | 'garden'
  | 'forest'
  | 'aqua'
  | 'lofi'
  | 'pastel'
  | 'fantasy'
  | 'wireframe'
  | 'black'
  | 'luxury'
  | 'dracula'

export interface UseThemeChangeOptions extends StorageOptions<ColorThemes> {
  /**
   * CSS Selector for the target element applying to
   *
   * @default 'html'
   */
  selector?: string
  /**
   * HTML attribute applying the target element
   *
   * @default 'data-theme'
   */
  attribute?: string
  /**
   * Value of default light theme to be applied
   *
   * @default 'light'
   */
  defaultLightTheme?: ColorThemes | string
  /**
   * Value of default dark theme to be applied
   *
   * @default 'dark'
   */
  defaultDarkTheme?: ColorThemes | string
  /**
   * List of theme names to be listed
   *
   * @default ['light','dark','cupcake','bumblebee','emerald','corporate','synthwave','retro','cyberpunk','valentine','halloween','garden','forest','aqua','lofi','pastel','fantasy','wireframe','black','luxury','dracula']
   */
  themes?: string[]
  /**
   * A custom handler to handle the updates.
   * When specified, the default behavior will be overidden.
   *
   * @default undefined
   */
  onChanged?: (themes: ColorThemes[] | string[] | null[]) => void

  /**
   * Key to persist the data into localStorage/sessionStorage.
   *
   * Pass `null` to disable persistence
   *
   * @default 'custom-light-scheme'
   */
  lightThemeStorageKey?: string | null

  /**
   * Key to persist the data into localStorage/sessionStorage.
   *
   * Pass `null` to disable persistence
   *
   * @default 'custom-dark-scheme'
   */
  darkThemeStorageKey?: string | null

  /**
   * Storage object, can be localStorage or sessionStorage
   *
   * @default localStorage
   */
  storage?: StorageLike
}

/**
 * Reactive dark mode with auto data persistence.
 *
 * @param options
 */
export const useThemeChange = (options: UseThemeChangeOptions = {}) => {
  const {
    selector = 'html',
    attribute = 'data-theme',
    defaultLightTheme = 'corporate',
    defaultDarkTheme = 'dark',
    themes = [
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
    ],
    window = defaultWindow,
    storage = defaultWindow?.localStorage,
    lightThemeStorageKey = 'custom-light-scheme',
    darkThemeStorageKey = 'custom-dark-scheme',
    listenToStorageChanges = true,
  } = options

  const lightThemeStore =
    lightThemeStorageKey === null
      ? ref<ColorThemes | string | null>(defaultLightTheme)
      : useStorage<ColorThemes>(
          lightThemeStorageKey,
          defaultLightTheme as ColorThemes,
          storage,
          {
            window,
            listenToStorageChanges,
          }
        )

  const darkThemeStore =
    darkThemeStorageKey === null
      ? ref<ColorThemes | string | null>(defaultDarkTheme)
      : useStorage<ColorThemes>(
          darkThemeStorageKey,
          defaultDarkTheme as ColorThemes,
          storage,
          {
            window,
            listenToStorageChanges,
          }
        )

  const currentLightTheme = computed<ColorThemes | string | null>({
    get() {
      return lightThemeStore.value
    },
    set(v) {
      lightThemeStore.value = v
    },
  })

  const currentDarkTheme = computed<ColorThemes | string | null>({
    get() {
      return darkThemeStore.value
    },
    set(v) {
      darkThemeStore.value = v
    },
  })

  const changeTheme = (v: boolean, valueDark: string, valueLight: string) => {
    const el = window?.document.querySelector(selector)
    const lightTheme = (currentLightTheme.value as string) || valueLight
    let darkTheme = (currentDarkTheme.value as string) || valueDark

    if (darkTheme === lightTheme) {
      darkTheme = defaultDarkTheme
    }

    themes.forEach((k) =>
      el?.classList.contains(k) ? el?.classList.remove(k) : undefined
    )
    el?.classList.toggle(darkTheme, v)
    // if (lightTheme) el?.classList.toggle(lightTheme, !v)

    if (!v) {
      el?.setAttribute(attribute, lightTheme)
    } else {
      el?.setAttribute(attribute, darkTheme)
      // el?.removeAttribute(attribute)
    }
  }

  const onChanged =
    options.onChanged ||
    (([lightTheme, darkTheme]) => {
      const el = window?.document.querySelector(selector)
      // If attribute exists, dark is preferred
      const darkPreferred = !el?.hasAttribute(attribute)
      changeTheme(darkPreferred, darkTheme as string, lightTheme as string)
    })

  watch(
    [currentLightTheme, currentDarkTheme] as WritableComputedRef<ColorThemes>[],
    onChanged,
    {
      flush: 'post',
    }
  )

  tryOnMounted(() => {
    onChanged([
      currentLightTheme.value,
      currentDarkTheme.value,
    ] as ColorThemes[])
  })

  return { themes, currentLightTheme, changeTheme }
}
