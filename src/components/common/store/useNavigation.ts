import { acceptHMRUpdate, defineStore } from 'pinia'

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    // const currentPage = ref('/')
    // const linksList = [
    //   { name: 'Home', to: '/' },
    //   { name: 'About', to: '/about' },
    // ]

    const socialLinks = [
      {
        name: 'GitHub',
        href: 'https://github.com/stctheproducer',
        icon: 'mdi:github',
      },
      {
        name: 'Dev',
        href: 'https://dev.to/stctheproducer',
        icon: 'mdi:dev-to',
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/stctheproducer',
        icon: 'mdi:twitter',
      },
    ]

    // const links = computed(() =>
    //   linksList.map((link) => ({
    //     ...link,
    //     current: link.to === currentPage.value,
    //   }))
    // )

    return { socialLinks: computed(() => socialLinks) }
  }
  // {
  //   persist: {
  //     enabled: true,
  //   },
  // }
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNavigationStore, import.meta.hot))
