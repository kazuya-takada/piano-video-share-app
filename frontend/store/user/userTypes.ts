import { DeepReadonly } from '@nuxtjs/composition-api'

export interface User {
  id: number
  name: string
  email: string
}

export interface UseUser {
  user: DeepReadonly<User>
  setUser: (id: number, name: string, email: string) => void
  fetchUser: () => void
  unsetUser: () => void
}
