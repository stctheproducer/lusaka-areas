<template>
  <div
    v-show="showSpinner"
    class="
      rounded-md
      flex
      h-full
      bg-black/5
      w-full
      inset-0
      justify-center
      items-center
      absolute
    "
  >
    <gg-spinner
      class="h-8 animate-spin w-8"
      :class="[spinnerColor, spinnerClasses]"
      aria-hidden="true"
    ></gg-spinner>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: string
  spinnerClasses?: string
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'current',
  spinnerClasses: '',
  show: true,
})

const spinnerColor = ref(`text-${props.color}`)
const showSpinner = ref(props.show)

watch([() => props.color, () => props.show], ([color, show]) => {
  spinnerColor.value = `text-${color}`
  showSpinner.value = show
})
</script>
