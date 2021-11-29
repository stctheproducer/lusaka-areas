import { ref, computed, ComputedRef } from 'vue'
import { upperFirst } from 'lodash-es'
import { apiStatus } from '../constants/apiStatus'

interface RefStatus extends Object {
  value: any
}

const { IDLE, SUCCESS, PENDING, ERROR } = apiStatus

/**
 * Create an object of computed statuses
 * @param {Object} status
 * @param {String} apiName
 */
const createNormalisedApiStatuses = (status: RefStatus, apiName: string) => {
  const normalisedApiStatuses: { [key: string]: ComputedRef<boolean> } = {}

  for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
    let propertyName = ''
    // Create a property name for each computed status
    if (apiName) {
      propertyName = `${apiName}Status${upperFirst(statusKey.toLowerCase())}`
    } else {
      propertyName = `status${upperFirst(statusKey.toLowerCase())}`
    }
    // Create a computed that returns true/false based on
    // the currently selected status
    normalisedApiStatuses[propertyName] = computed(
      () => statusValue === status.value
    )
  }
  return normalisedApiStatuses
}

/**
 * @param {string} apiName
 * @param {function} fn
 * @param {object} config
 */
export const useApi = (apiName: string, fn: any, config: any = {}) => {
  const { initialData, responseAdapter } = config
  // Reactive values to store data and API status
  const data = ref(initialData)
  const status = ref(IDLE)
  const error = ref<any>(null)

  /**
   * Initialise the API request
   */
  const exec = async (...args: any) => {
    try {
      // Clear current error value
      error.value = null
      // API request starts
      status.value = PENDING
      const response = await fn(...args)
      // Before assigning the response, check if a responseAdapter
      // was passed, if yes, then use it
      data.value =
        typeof responseAdapter === 'function'
          ? responseAdapter(response)
          : response
      // Done
      status.value = SUCCESS
    } catch (e) {
      // Oops, there was an error
      error.value = e
      status.value = ERROR
    }
  }

  return {
    data,
    status,
    error,
    exec,
    ...createNormalisedApiStatuses(status, apiName),
  }
}
