/* eslint-disable @typescript-eslint/no-unused-vars */
import { watch } from 'vue-demi'
import { PiniaPluginContext } from 'pinia'
import { upperFirst } from 'lodash-es'
import { useStorage } from '@vueuse/core'

export interface PersistStrategy {
  /**
   * Storage key
   */
  key?: string
  /**
   * Type of storage e.g. localStorage, sessionStorage. (default: sessionStorage)
   */
  storage?: Storage
  /**
   * List of state keys to persist
   */
  paths?: string[]
}

export interface PersistOptions {
  enabled: boolean
  strategies?: PersistStrategy[]
}

type Store = PiniaPluginContext['store']
type PartialState = Partial<Store['$state']>

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    persist?: PersistOptions
  }
}

const updateStorage = (strategy: PersistStrategy, store: Store) => {
  const storage = strategy.storage || sessionStorage
  const storeKey = strategy.key || `pinia${upperFirst(store.$id)}`

  if (strategy.paths) {
    const partialState = strategy.paths.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key]
      return finalObj
    }, {} as PartialState)

    storage.setItem(storeKey, JSON.stringify(partialState))
    useStorage(`${storeKey}-vueuse`, partialState)
  } else {
    storage.setItem(storeKey, JSON.stringify(store.$state))
    useStorage(`${storeKey}-vueuse`, store.$state)
  }
}

export default ({ options, store }: PiniaPluginContext): void => {
  if (options.persist?.enabled) {
    const defaultStrat: PersistStrategy[] = [
      {
        key: `pinia${upperFirst(store.$id)}`,
        storage: sessionStorage,
      },
    ]

    const strategies = options.persist?.strategies?.length
      ? options.persist?.strategies
      : defaultStrat

    strategies.forEach((strategy) => {
      const storage = strategy.storage || sessionStorage
      const storeKey = strategy.key || `pinia${upperFirst(store.$id)}`
      const storageResult = storage.getItem(storeKey)

      if (storageResult) {
        store.$patch(JSON.parse(storageResult))
        updateStorage(strategy, store)
      }
    })

    watch(
      () => store.$state,
      () => {
        strategies.forEach((strategy) => {
          updateStorage(strategy, store)
        })
      },
      { deep: true }
    )
  }
}
