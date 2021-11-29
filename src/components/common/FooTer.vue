<script setup lang="ts">
import { isDark, toggleDark } from '@/helpers'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="mt-6 text-center text-xl">
    <router-link
      class="mx-2 icon-btn"
      to="/"
      :title="t('global.footer.button.home')"
    >
      <carbon-campsite />
    </router-link>

    <button
      class="mx-2 icon-btn !outline-none"
      :title="t('global.footer.button.toggle_dark')"
      @click="toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a
      class="mx-2 icon-btn"
      :title="t('global.footer.button.toggle_langs')"
      @click="toggleLocales"
    >
      <carbon-language />
    </a>

    <router-link
      class="mx-2 icon-btn"
      to="/about"
      :title="t('global.footer.button.about')"
    >
      <carbon-dicom-overlay />
    </router-link>

    <a
      class="mx-2 icon-btn"
      rel="noreferrer"
      href="https://github.com/antfu/vitesse"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>
  </nav>
</template>
