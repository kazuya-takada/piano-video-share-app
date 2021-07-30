import { DeepReadonly } from '@nuxtjs/composition-api'

export interface User {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface UseUser {
  user: DeepReadonly<User>
}
