<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="my-2">
    <h1 class="text-center tracking-wide text-4xl">{{ t('index.welcome') }}</h1>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
