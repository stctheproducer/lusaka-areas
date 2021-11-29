import api from './api'
import { requiredParam } from '@/helpers'

export const sendMail = (body: any, config = requiredParam('config')) =>
  api.post('/api/send-mail', body, config)
