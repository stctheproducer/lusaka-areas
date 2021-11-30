import { acceptHMRUpdate, defineStore } from 'pinia'
import { notify } from 'notiwind'
import slugify from 'lodash-es/kebabCase'
import words from 'lodash-es/words'
import startCase from 'lodash-es/startCase'
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

    const areas = ref<Area[]>([])
    const areasPopulated = computed(() => areas.value.length > 0)
    const subscription = ref<RealtimeSubscription | null>(null)

    const loadAreas = async () => {
      const { data, error } = await supabase.from('lusaka_areas').select()

      if (error) {
        notify({
          group: 'simple',
          type: 'error',
          title: t('index.areas.error.title'),
          text: startCase(error.message),
        })

        return
      }

      areas.value = <Area[]>data

      notify({
        group: 'simple',
        type: 'success',
        title: t('index.areas.loaded.title'),
        text: t('index.areas.loaded.text'),
      })
    }

    const addArea = async (areaName: string) => {
      const name = startCase(areaName.replace(/\d/g, ''))
      const post = {
        name,
        slug: slugify(name),
        initials: words(name)
          .map((word) => word[0])
          .join('')
          .toUpperCase(),
      }

      const { data: newAreas, error } = await supabase
        .from('lusaka_areas')
        .insert([post])

      if (error) {
        console.log('[addArea]:', error)
        notify({
          group: 'simple',
          type: 'error',
          title: t('index.areas.error.title'),
          text: startCase(error.message),
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
        .from('lusaka_areas')
        .on('INSERT', (area: SupabaseRealtimePayload<Area>) => {
          if (area.new) {
            areas.value.push(area.new)
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
