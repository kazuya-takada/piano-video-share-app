import { reactive, readonly } from '@nuxtjs/composition-api'
import { User, UseUser } from '@/store/user/userTypes'
import axios from 'axios'

const user = reactive<User>({
  id: 0,
  name: '',
  email: '',
})

const setUser = (id: number, name: string, email: string) => {
  user.id = id
  user.name = name
  user.email = email
}

const fetchUser = async () => {
  try {
    await axios
      .get('/api/v1/user', { withCredentials: true })
      .then((response: any) => {
        setUser(response.data.id, response.data.name, response.data.email)
      })
  } catch (e) {
    console.log(e)
  }
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
