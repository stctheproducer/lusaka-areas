<template>
  <div class="text-center">
    <span
      class="mx-auto h-12 text-gray-400 w-12 iconify"
      data-icon="mdi:map-plus"
      aria-hidden="true"
    ></span>
    <h3 class="font-medium mt-2 text-sm text-gray-900">
      {{ t('index.no_areas.heading') }}
    </h3>
    <p class="mt-1 text-sm text-gray-500">
      {{ t('index.no_areas.description') }}
    </p>
    <div class="mt-6 py-2">
      <button
        type="button"
        class="
          bg-primary
          border border-transparent
          rounded-md
          font-medium
          shadow-sm
          text-sm text-white
          py-2
          px-4
          inline-flex
          items-center
          hover:bg-primary-600
          focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2
        "
        @click="router.push({ path: '/', hash: '#add-area' })"
      >
        <heroicons-solid-plus class="h-5 mr-2 -ml-1 w-5" aria-hidden="true" />
        {{ t('index.no_areas.add_area') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>
