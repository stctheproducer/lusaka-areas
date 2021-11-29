import { acceptHMRUpdate, defineStore } from 'pinia'

type Currency = {
  code: string
  name: string
}

export const useCurrencyStore = defineStore(
  'currency',
  () => {
    const { t } = useI18n()

    const currencies = [
      {
        code: 'ZMW',
        name: t('global.select.currencies[0]'),
      },
      {
        code: 'USD',
        name: t('global.select.currencies[1]'),
      },
    ]

    const selectedCurrency = ref<null | Currency>(null)

    return {
      currencies: computed(() => currencies),
      selectedCurrency,
    }
  },
  {
    persist: {
      enabled: true,
    },
  }
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCurrencyStore, import.meta.hot))
