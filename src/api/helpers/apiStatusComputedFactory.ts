import { upperFirst } from 'lodash-es'
import { apiStatus } from '../constants/apiStatus'
export const apiStatusComputedFactory = (
  reactivePropertyKeys: string | string[] = ''
) => {
  /**
   * Object to store computed getters for
   * different API statuses
   */

  const computed: { [key: string]: any } = {}

  // If the argument passed is an array then assign it
  // otherwise, wrap it in an array
  const properties = Array.isArray(reactivePropertyKeys)
    ? reactivePropertyKeys
    : [reactivePropertyKeys]

  for (const reactivePropertyKey of properties) {
    /**
     * Loop through API statuses
     * IDLE, PENDING, SUCCESS, ERROR
     */
    // eslint-disable-next-line no-unreachable-loop
    for (const [statusKey, statusValue] of Object.entries(apiStatus)) {
      /**
       * Normalise status key
       * IDLE -> Idle
       * SUCCESS -> Success
       */
      const normalisedStatus = upperFirst(statusKey.toLocaleLowerCase())

      /**
       * Add a computed property
       */
      computed[`${reactivePropertyKey}${normalisedStatus}`] = function () {
        return this[reactivePropertyKey] === statusValue
      }

      return computed
    }
  }
}
