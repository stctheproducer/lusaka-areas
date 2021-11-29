/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const withAsync = async (fn: any, ...args: any) => {
  try {
    const response = await fn(...args)
    return {
      response,
      error: null,
    }
  } catch (error) {
    return {
      response: null,
      error,
    }
  }
}
