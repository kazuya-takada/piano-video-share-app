import { DeepReadonly } from '@nuxtjs/composition-api'

export interface User {
  allow_password_change: boolean
  created_at: string
  email: string
  id: number
  name: string
  provider: string
  uid: string
  updated_at: string
}

export interface UseUser {
  user: DeepReadonly<User>
}
