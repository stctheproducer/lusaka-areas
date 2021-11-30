<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <h2
      class="
        container
        font-medium
        text-xs
        tracking-wide
        text-gray-500
        uppercase
      "
    >
      {{ t('index.areas.heading') }}
    </h2>
    <no-areas v-if="!areasPopulated" />
    <ul
      v-else
      role="list"
      class="mt-3 grid gap-5 grid-cols-1 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <li
        v-for="area in areas"
        :key="`area-${area.slug}`"
        class="rounded-md flex h-16 shadow-sm col-span-1"
      >
        <div
          class="
            bg-primary
            rounded-l-md
            flex
            font-medium
            flex-shrink-0
            text-white text-sm
            w-16
            items-center
            justify-center
          "
        >
          {{ area.initials }}
        </div>
        <div
          class="
            bg-white
            border-t border-r border-b
            rounded-r-md
            flex
            border-gray-200
            flex-1
            items-center
            justify-between
            truncate
          "
        >
          <div class="flex-1 text-sm py-2 px-4 truncate">
            <p class="font-medium text-gray-900">{{ area.name }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import NoAreas from './no-areas.vue'
import { useAreasStore } from './store/useAreas'

const { t } = useI18n()
const areaStore = useAreasStore()
const { areas, areasPopulated } = storeToRefs(areaStore)

onMounted(() => {
  areaStore.loadAreas()
  areaStore.subscribe()
})

onUnmounted(() => areaStore.unsubscribe())
</script>
