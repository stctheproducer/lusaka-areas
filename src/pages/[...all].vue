<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <main
    class="
      flex-grow flex flex-col
      mx-auto
      w-full
      max-w-7xl
      px-4
      justify-center
      sm:px-6
      lg:px-8
    "
  >
    <div class="flex flex-shrink-0 justify-center">
      <a href="/" class="inline-flex">
        <span class="sr-only">{{ t('site-short-name') }}</span>
        <img
          class="h-12 w-auto"
          src="@/assets/full-logo.svg"
          :alt="t('site-name')"
        />
      </a>
    </div>
    <div class="py-16">
      <div class="text-center">
        <p class="font-semibold text-sm text-primary tracking-wide uppercase">
          {{ t('not-found.text.type') }}
        </p>
        <h1
          class="
            font-extrabold
            mt-2
            tracking-tight
            text-4xl text-gray-900
            sm:text-5xl
          "
        >
          {{ t('not-found.text.title') }}
        </h1>
        <p class="mt-2 text-base text-gray-500">
          {{ t('not-found.text.error') }}
        </p>
        <div class="mt-6">
          <router-link
            to="/"
            class="font-medium text-base text-primary hover:text-primary-600"
            >{{ t('not-found.text.links.home')
            }}<span aria-hidden="true"> &rarr;</span></router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
