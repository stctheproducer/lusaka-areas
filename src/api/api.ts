/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { NETLIFY_PORT } from '../constants/appConstant'

type RequestBody = { [key: string]: any } | string
// type ServerError = { code?: string; description?: string; [key: string]: any }
interface AbortError extends AxiosError {
  aborted?: boolean
}

// Default config for the axios instance
const axiosParams: AxiosRequestConfig = {
  // Set different base URL based on the environment
  baseURL: import.meta.env.DEV ? `http://localhost:${NETLIFY_PORT}` : '/',
  // Alternative if you have more environments
  // baseURL: import.meta.env.VITE_API_BASE_URL
}

// Create axios instance with default params
const axiosInstance: AxiosInstance = axios.create(axiosParams)

const didAbort = (error: AbortError) => axios.isCancel(error)

const getCancelSource = () => axios.CancelToken.source()

const withAbort =
  (fn: any) =>
  async (...args: any[]) => {
    const originalConfig = args[args.length - 1]
    // Extract abort property from the config
    const { abort, ...config } = originalConfig

    // Create cancel token and abort method only if abort
    // function was passed
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource()
      config.cancelToken = token
      abort(cancel)
    }

    try {
      // Pass all arguments from args besides the config
      return await fn(...args.slice(0, args.length - 1), config)
    } catch (error) {
      const e = error as AbortError
      // Add "aborted" property to the error if the request was cancelled
      didAbort(e) && (e.aborted = true)
      throw error
    }
  }

// Main api function
const api = (axios: AxiosInstance) => {
  const withLogger = async (promise: Promise<AxiosResponse>) => {
    promise.catch((error) => {
      /**
       * Always log errors in dev environment
       * if (import.meta.env.NODE_ENV !== 'development') throw error
       */

      // Log error only if VITE_DEBUG_API env is set to true
      if (!import.meta.env.VITE_DEBUG_API) throw error

      if (error.response) {
        // The request was made and ther server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data)
        console.error(error.response.status)
        console.error(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received // `error.request` is an instance of XMLHttpRequest // in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message)
      }
      console.error(error.config)
      throw error
    })

    return promise
  }

  return {
    get: (url: string, config: AxiosRequestConfig = {}) =>
      withLogger(withAbort(axios.get)(url, config)),
    post: (url: string, body: RequestBody, config: AxiosRequestConfig = {}) =>
      withLogger(withAbort(axios.post)(url, body, config)),
    patch: (url: string, body: RequestBody, config: AxiosRequestConfig = {}) =>
      withLogger(withAbort(axios.patch)(url, body, config)),
    delete: (url: string, config: AxiosRequestConfig = {}) =>
      withLogger(withAbort(axios.delete)(url, config)),
  }
}

export default api(axiosInstance)
