<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Listbox v-model="selectedCurrency" as="div">
    <ListboxLabel class="font-medium text-sm text-gray-700 sr-only">
      {{ t('global.select.currencyLabel') }}
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
          <span class="h-6 block truncate">{{ selectedCurrency?.name }}</span>
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
            v-for="currency in currencies"
            :key="currency.code"
            v-slot="{ active, selected }"
            as="template"
            :value="currency"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'cursor-default list-none select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <div class="flex items-start">
                <span
                  :class="[
                    selected ? 'font-semibold' : 'font-normal',
                    'ml-3 block truncate',
                  ]"
                >
                  {{ currency.name }}
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
import { useCurrencyStore } from './store/useCurrency'

const { currencies, selectedCurrency } = storeToRefs(useCurrencyStore())

const { t } = useI18n({ useScope: 'global' })

onMounted(() => {
  if (!selectedCurrency.value) {
    selectedCurrency.value = currencies.value[0]
  }
})
</script>
