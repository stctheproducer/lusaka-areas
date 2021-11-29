import { Ref, ref } from 'vue'

interface ToggleProvider {
  isOn: Ref<boolean>
  turnOn: () => boolean
  turnOff: () => boolean
  toggle: () => boolean
}

export const useToggleProvider = (): ToggleProvider => {
  interface Props {
    on?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    on: false,
  })

  const isOn = ref(props.on)

  const turnOn = () => (isOn.value = true)

  const turnOff = () => (isOn.value = false)

  const toggle = () => (isOn.value = !isOn.value)

  return {
    isOn,
    turnOn,
    turnOff,
    toggle,
  }
}
