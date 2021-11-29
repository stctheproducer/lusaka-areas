<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox v-model="selectedLanguage" as="div">
    <ListboxLabel class="font-medium text-sm text-gray-700 sr-only">
      {{ t('global.select.languageLabel') }}
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        class="
          bg-white
          border
          rounded-md
          cursor-default
          border-gray-300
          shadow-sm
          text-left
          w-full
          py-2
          pr-10
          pl-3
          relative
          sm:text-sm
          focus:(border-secondary
          outline-none
          ring-secondary ring-1)
          "
      >
        <span class="flex items-start">
          <span class="rounded-full flex-shrink-0 h-6 w-6">{{
            selectedLanguage?.flag
          }}</span>
          <span class="ml-3 block truncate">{{ selectedLanguage?.name }}</span>
        </span>
        <span
          class="
            flex
            ml-3
            pr-2
            inset-y-0
            right-0
            absolute
            items-center
            pointer-events-none
          "
        >
          <heroicons-solid-selector
            class="h-5 text-gray-400 w-5"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            bg-white
            rounded-md
            shadow-lg
            ring-black
            mt-1
            text-base
            w-full
            max-h-56
            py-1
            ring-1 ring-opacity-5
            z-10
            absolute
            overflow-auto
            sm:text-sm
            focus:outline-none
          "
        >
          <ListboxOption
            v-for="language in languages"
            :key="language.code"
            v-slot="{ active, selected }"
            as="template"
            :value="language"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'cursor-default list-none select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <div class="flex items-start">
                <span class="rounded-full flex-shrink-0 h-6 w-6">{{
                  language.flag
                }}</span>
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  ]"
                >
                  {{ language.name }}
                </span>
              </div>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <heroicons-solid-check class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLanguageStore } from './store/useLanguage'

const { languages, selectedLanguage } = storeToRefs(useLanguageStore())

const { t, locale } = useI18n({ useScope: 'global' })

onMounted(() => {
  if (!selectedLanguage.value) {
    selectedLanguage.value = languages.value[0]
  }
})

watch(selectedLanguage, (language) => (locale.value = language?.code))
</script>
