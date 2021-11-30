import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// your custom styles here
import './styles/main.css'
import '@purge-icons/generated'
// windicss utilities should be the last style import
import 'virtual:windi-utilities.css'
// windicss devtools support (dev only)
import 'virtual:windi-devtools'
import { routes, scrollBehavior } from '@/router'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(App, { routes, scrollBehavior }, (ctx) => {
  // Recognise custom elements
  if (import.meta.env.PROD) {
    ctx.app.config.compilerOptions.isCustomElement = (tag) =>
      tag.startsWith('lottie-player')
  }

  if (!import.meta.env.SSR) {
    ctx.router.beforeEach(() => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 500)
    })
  }

  // install all plugins under `plugins/`
  Object.values(import.meta.globEager('./plugins/*.ts')).map((i) =>
    i.install?.(ctx)
  )
})
