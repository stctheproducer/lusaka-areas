<script setup lang="ts">
import { appConstant } from '@/constants/appConstant'
const { locale } = useI18n()

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: appConstant.NAME,
  meta: [
    { name: 'description', content: appConstant.DESCRIPTION },
    { name: 'twitter:card', content: appConstant.TWITTER_CARD },
    // { name: 'twitter:site', content: appConstant.TWITTER_SITE },
    { name: 'twitter:creator', content: appConstant.TWITTER_CREATOR },
    { property: 'og:url', content: appConstant.URL },
    { property: 'og:site_name', content: appConstant.NAME },
    { property: 'og:locale', content: locale.value },
    { property: 'og:title', content: appConstant.NAME },
    { property: 'og:type', content: appConstant.OG_TYPE },
    { property: 'og:description', content: appConstant.DESCRIPTION },
    { property: 'og:image', content: '@/assets/undraw_map_dark_re_36sy.svg' },
    // { property: 'og:audio', content: '' },
    // { property: 'og:video', content: '' },
  ],
})
</script>

<template>
  <router-view />
</template>
