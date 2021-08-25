import { reactive, readonly } from '@nuxtjs/composition-api'
import { User, UseUser } from '@/store/user/userTypes'
import axios from 'axios'

const user = reactive<User>({
  id: 0,
  name: '',
  email: '',
  created_at: '',
  updated_at: '',
  password_digest: '',
})

const setUser = (id: number, name: string, email: string) => {
  user.id = id
  user.name = name
  user.email = email
}

const fetchUser = async () => {
  try {
    const response = await axios.get('/api/v1/user', { withCredentials: true })
    const user: User = response.data
    setUser(user.id, user.name, user.email)
  } catch (e) {}
}

const unsetUser = () => {
  user.id = 0
  user.name = ''
  user.email = ''
}

const useUser: UseUser = {
  user: readonly(user),
  fetchUser,
  setUser,
  unsetUser,
}

export default useUser
