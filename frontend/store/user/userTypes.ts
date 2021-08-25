import { DeepReadonly } from '@nuxtjs/composition-api'

export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
  password_digest: string
}

export interface UseUser {
  user: DeepReadonly<User>
  setUser: (id: number, name: string, email: string) => void
  fetchUser: () => void
  unsetUser: () => void
}
