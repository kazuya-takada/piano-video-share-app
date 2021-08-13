import { DeepReadonly } from '@nuxtjs/composition-api'

export interface User {
  id: number
  name: string
  email: string
}

export interface UseUser {
  user: DeepReadonly<User>
  fetchUser: () => void
  unsetUser: () => void
}
