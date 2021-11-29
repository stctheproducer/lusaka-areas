<template>
  <div v-show="showLoader">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  show?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  delay: 5000,
})

// Flag for showing the loader
const showLoader = ref(false)
// Store timeout with will turn on loader after a
const { ready, start, stop } = useTimeout(props.delay, { controls: true })
// Run any time loader should be switched on or off
watch([() => props.show, ready], ([showValue, readyValue]) => {
  // Start show loader timeout
  if (showValue) {
    start()
    if (readyValue) {
      showLoader.value = true
      stop()
    } else {
      // Clear timeout and hide loader
      stop()
      showLoader.value && (showLoader.value = false)
    }
  }
})
</script>

<!-- <script setup lang="ts">
interface Props {
  show?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  delay: 5000,
})

// Flag for showing the loader
const showLoader = ref(false)

// Store timeout with will turn on loader after a delay
let timeout: any = null

watch(
  () => props.show,
  (show) => {
    // Start show loader timeout
    if (show) {
      timeout = setTimeout(() => {
        showLoader.value = true
      }, props.delay)
    } else {
      // Clear timeout and hide loader
      clearTimeout(timeout)
      showLoader.value && (showLoader.value = false)
    }
  }
)
</script> -->
