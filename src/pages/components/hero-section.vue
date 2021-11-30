<template>
  <div class="bg-white pb-8 sm:pb-12 lg:pb-12">
    <div class="pt-8 overflow-hidden sm:pt-12 lg:py-48 lg:relative">
      <div
        class="
          mx-auto
          max-w-md
          px-4
          sm:max-w-3xl sm:px-6
          lg:max-w-7xl lg:grid lg:px-8 lg:gap-24 lg:grid-cols-2
        "
      >
        <div>
          <div>
            <img
              class="h-11 w-auto"
              src="@/assets/full-logo.svg"
              alt="S.T.C the Producer"
            />
          </div>
          <div class="mt-20">
            <!-- Page notification -->
            <!-- <div>
              <a href="#" class="space-x-4 inline-flex">
                <span
                  class="
                    rounded
                    font-semibold
                    bg-indigo-50
                    text-xs
                    tracking-wide
                    py-1
                    px-2.5
                    text-indigo-600
                    uppercase
                  "
                >
                  What's new
                </span>
                <span
                  class="
                    font-medium
                    space-x-1
                    text-sm text-indigo-600
                    inline-flex
                    items-center
                  "
                >
                  <span>Just shipped version 0.1.0</span>
                  <heroicons-solid-chevron-right
                    class="h-5 w-5"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div> -->
            <div class="mt-6 sm:max-w-xl">
              <h1
                class="
                  font-extrabold
                  tracking-tight
                  text-4xl text-gray-900
                  sm:text-5xl
                "
              >
                {{ t('index.hero.text.heading') }}
              </h1>
              <p class="mt-6 text-xl text-gray-500">
                {{ t('index.hero.text.description') }}
              </p>
            </div>
            <area-submit-form id="add-area" />
          </div>
        </div>
      </div>

      <div class="sm:mx-auto sm:max-w-3xl sm:px-6">
        <div
          class="
            py-12
            sm:mt-12 sm:py-16 sm:relative
            lg:inset-y-0 lg:right-0 lg:w-1/2 lg:absolute
          "
        >
          <div class="hidden sm:block">
            <div
              class="
                bg-gray-50
                rounded-l-3xl
                w-screen
                inset-y-0
                left-1/2
                absolute
                lg:w-full lg:right-0 lg:left-80
              "
            />
            <svg
              class="-mr-3 top-8 right-1/2 absolute lg:m-0 lg:left-0"
              width="404"
              height="392"
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    class="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="392"
                fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
              />
            </svg>
          </div>
          <div
            class="
              -mr-40
              pl-4
              relative
              sm:mx-auto sm:max-w-3xl sm:px-0
              lg:h-full lg:max-w-none lg:pl-12
            "
          >
            <img
              class="w-full lg:h-full lg:max-w-none lg:w-auto"
              src="@/assets/undraw_map_dark_re_36sy.svg"
              alt="Dark map"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AreaSubmitForm from './area-submit-form.vue'

const { t } = useI18n()
</script>
