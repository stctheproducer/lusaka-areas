import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { RouterScrollBehavior } from 'vue-router'

export const routes = setupLayouts(generatedRoutes)
export const scrollBehavior: RouterScrollBehavior = (to, _, savedPosition) => {
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          el: to.hash,
          top: 50,
          behavior: 'smooth',
        })
      }, 500)
    })
  } else if (savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...savedPosition, behavior: 'smooth' })
      }, 500)
    })
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 500)
    })
  }
}
