import { createPinia } from 'pinia'
import { Router } from 'vue-router'
// import piniaPersist from 'pinia-plugin-persist'
import piniaPersist from '../../scripts/pinia/persist'
import { UserModule } from '@/@types'

declare module 'pinia' {
  export interface PiniaCustomProperties<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Id extends string = string,
    // S extends StateTree = StateTree,
    S extends StateTree = StateTree,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    G = _GettersTree<S>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    A = _ActionsTree
  > extends Router {
    router: Router
  }
}

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({
  isClient,
  initialState,
  app,
  router,
}) => {
  const pinia = createPinia()
  pinia.use(({ store }) => (store.router = markRaw(router)))
  pinia.use(piniaPersist)
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient) pinia.state.value = initialState.pinia || {}
  else initialState.pinia = pinia.state.value
}
