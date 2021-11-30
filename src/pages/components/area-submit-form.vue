<template>
  <form class="mt-12 sm:flex sm:max-w-lg sm:w-full" @submit="onSubmit">
    <div class="flex-1 min-w-0">
      <label for="area-name" class="sr-only">{{
        t('index.hero.form.label')
      }}</label>
      <input
        id="area-name"
        v-model="areaName"
        type="text"
        class="
          border
          rounded-md
          border-gray-300
          shadow-sm
          text-base
          w-full
          py-3
          px-5
          placeholder-gray-500
          text-gray-900
          block
          focus:border-primary focus:ring-primary
          disabled:(cursor-not-allowed
          bg-gray-100)
          "
        :placeholder="t('index.hero.form.placeholder')"
        :disabled="isSubmitting"
      />
    </div>
    <div class="mt-4 sm:mt-0 sm:ml-3">
      <button
        type="submit"
        class="
          bg-primary
          border border-transparent
          rounded-md
          font-medium
          shadow
          text-base text-white
          w-full
          py-3
          px-5
          block
          sm:px-10
          hover:bg-primary-600
          focus:outline-none focus:ring-primary focus:ring-2 focus:ring-offset-2
          disabled:(cursor-not-allowed
          bg-primary-300)
          "
        :disabled="!meta.dirty"
      >
        <gg-spinner
          v-if="isSubmitting"
          class="h-6 animate-spin w-6 iconify"
        ></gg-spinner>
        <span v-else>{{ t('index.hero.form.button') }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { notify } from 'notiwind'
import { useAreasStore } from './store/useAreas'

const { t } = useI18n()
const areaStore = useAreasStore()

const validationSchema = yup.object({
  areaName: yup.string().required().min(3).label('Area name'),
})
const initialValues = {
  areaName: '',
}

const { handleSubmit, isSubmitting, meta } = useForm({
  initialValues,
  validationSchema,
})
const { value: areaName } = useField<string>('areaName')

const onInvalidSubmit = ({ errors }: any) => {
  for (const [, error] of Object.entries(errors)) {
    notify({
      group: 'simple',
      type: 'error',
      title: 'Error',
      text: error,
    })
  }
}

const onSubmit = handleSubmit(async ({ areaName }, { resetForm }) => {
  await areaStore.addArea(areaName as string)

  resetForm()
}, onInvalidSubmit)
</script>
