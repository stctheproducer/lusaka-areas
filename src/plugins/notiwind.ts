import Notifications from 'notiwind'
import { UserModule } from '@/@types'

export const install: UserModule = ({ app }) => {
  app.use(Notifications)
}
