<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNavigationStore } from './store/useNavigation'
const { t } = useI18n()
const { socialLinks } = storeToRefs(useNavigationStore())
</script>

<template>
  <footer class="bg-white">
    <div
      class="
        mx-auto
        max-w-7xl
        py-12
        px-4
        sm:px-6
        md:flex md:items-center md:justify-between
        lg:px-8
      "
    >
      <div class="flex space-x-6 justify-center md:order-2">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.href"
          target="_blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">{{ link.name }}</span>
          <span
            :data-icon="link.icon"
            class="h-6 w-6 iconify"
            aria-hidden="true"
          />
        </a>
      </div>
      <div class="mt-8 md:order-1 md:mt-0">
        <p class="text-center text-base text-gray-400">
          {{ t('global.footer.copyright') }}
        </p>
      </div>
    </div>
  </footer>
</template>
