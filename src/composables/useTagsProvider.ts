/* eslint-disable no-unused-vars */
import { ref, computed, ComputedRef, Ref, watch } from 'vue'

type ModifyTag = (value: unknown) => void

interface TagsProvider {
  tags: Ref<unknown[]>
  getTags: ComputedRef<unknown[]>
  addTag: ModifyTag
  deleteTag: ModifyTag
}

export const useTagsProvider = (): TagsProvider => {
  interface Props {
    options?: unknown[]
    trackBy: string
  }

  interface Emits {
    (event: 'on-tag-added', item: { [key: string]: unknown }): void
    (event: 'on-tag-deleted', item: { [key: string]: unknown }): void
  }

  const props = withDefaults(defineProps<Props>(), {
    options: () => [],
  })

  const emit = defineEmits<Emits>()

  const tags = ref([...props.options])

  watch(
    () => props.options,
    (value) => {
      if (Array.isArray(value)) tags.value = [...value]
    },
    { immediate: true }
  )

  const addTag: ModifyTag = (value) => {
    tags.value.push(value)
    emit('on-tag-added', { tags, value })
  }

  const deleteTag: ModifyTag = (value) => {
    if (props.trackBy) {
      const loopTags = tags.value as { [key: string]: unknown }[]
      tags.value = loopTags.filter((tag) => tag[props.trackBy] !== value)
    } else {
      // We have no trackBy property, so we assume
      // that the value passed is an index
      tags.value.splice(<number>value, 1)
    }

    emit('on-tag-deleted', { tags, value })
  }

  /**
   * Used via ref to extract tags
   */
  const getTags = computed(() => tags.value)

  return {
    tags,
    getTags,
    addTag,
    deleteTag,
  }
}
