import { acceptHMRUpdate, defineStore } from 'pinia'
import { notify } from 'notiwind'
import slugify from 'lodash-es/kebabCase'
import words from 'lodash-es/words'
import startCase from 'lodash-es/startCase'
import upperFirst from 'lodash-es/upperFirst'
import {
  RealtimeSubscription,
  SupabaseRealtimePayload,
} from '@supabase/supabase-js'
import { supabase } from '@/api/areas'

export const useAreasStore = defineStore(
  'areas',
  () => {
    const { t } = useI18n()

    interface Area {
      created_at: string
      id: number
      initials: string
      name: string
      slug: string
    }

    const tableName = 'lusaka_areas_duplicate'
    const areas = ref<Area[]>([])
    const areasPopulated = computed(() => areas.value.length > 0)
    const subscription = ref<RealtimeSubscription | null>(null)

    const loadAreas = async () => {
      const { data, error } = await supabase.from(tableName).select()

      if (error) {
        notify({
          group: 'simple',
          type: 'error',
          title: t('index.areas.error.title'),
          text: upperFirst(error.message),
        })

        return
      }

      areas.value = <Area[]>data

      if (areasPopulated.value)
        notify({
          group: 'simple',
          type: 'success',
          title: t('index.areas.loaded.title'),
          text: t('index.areas.loaded.text'),
        })
    }

    const addArea = async (areaName: string) => {
      const name = startCase(areaName)
      const post = {
        name,
        slug: slugify(name),
        initials: words(name)
          .map((word) => word[0])
          .join('')
          .toUpperCase(),
      }

      const { data: newAreas, error } = await supabase
        .from(tableName)
        .insert([post])

      if (error) {
        const title =
          error.code === '23505'
            ? t('index.areas.error.duplicate.title')
            : t('index.areas.error.title')
        const message =
          error.code === '23505'
            ? t('index.areas.error.duplicate.text')
            : upperFirst(error.message)

        notify({
          group: 'simple',
          type: 'error',
          title,
          text: message,
        })

        return
      }

      areas.value.push(<Area>newAreas?.[0])

      notify({
        group: 'toast',
        text: t('index.areas.added.text', { area: newAreas?.[0]?.name }),
      })
    }

    // Handle realtime data changes
    const subscribe = () => {
      subscription.value = supabase
        .from(tableName)
        .on('INSERT', (area: SupabaseRealtimePayload<Area>) => {
          if (!areas.value.some((a) => a.slug === area.new.slug)) {
            areas.value.push(area.new)
            notify({
              group: 'toast',
              text: t('index.areas.added.text_third', { area: area.new.name }),
            })
          }
        })
        .subscribe()
    }

    const unsubscribe = () =>
      supabase.removeSubscription(<RealtimeSubscription>subscription.value)

    return {
      areas,
      areasPopulated,
      loadAreas,
      addArea,
      subscribe,
      unsubscribe,
    }
  },
  {
    persist: {
      enabled: true,
    },
  }
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAreasStore, import.meta.hot))
