<script setup lang="ts">
import { appConstant } from '@/constants/appConstant'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: appConstant.NAME,
  meta: [{ name: 'description', content: appConstant.DESCRIPTION }],
})
</script>

<template>
  <router-view />
</template>
