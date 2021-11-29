import { acceptHMRUpdate, defineStore } from 'pinia'

type Language = {
  code: string
  name: string
  flag: string
}

export const useLanguageStore = defineStore(
  'language',
  () => {
    const { t } = useI18n()

    const languages = [
      {
        code: 'en-ZM',
        name: t('global.select.languages[0]'),
        flag: '\u{1F1FF}\u{1F1F2}',
      },
    ]

    const selectedLanguage = ref<null | Language>(null)

    return {
      languages: computed(() => languages),
      selectedLanguage,
    }
  },
  {
    persist: {
      enabled: true,
    },
  }
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLanguageStore, import.meta.hot))
