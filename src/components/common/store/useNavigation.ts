import { acceptHMRUpdate, defineStore } from 'pinia'

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    const currentPage = ref('/')
    const linksList = [
      { name: 'Home', to: '/', current: false },
      { name: 'About', to: '/about', current: false },
    ]

    const links = computed(() =>
      linksList.map((link) => ({
        ...link,
        current: link.to === currentPage.value,
      }))
    )

    return { links, currentPage }
  },
  {
    persist: {
      enabled: true,
    },
  }
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavigationStore, import.meta.hot))
