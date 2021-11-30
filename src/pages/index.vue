<script setup lang="ts">
import HeroSection from './components/hero-section.vue'
import AreaListSection from './components/area-list-section.vue'
</script>

<template>
  <div class="flex-1">
    <hero-section />
    <area-list-section class="container mx-auto px-4 sm:px-6 lg:px-8" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
