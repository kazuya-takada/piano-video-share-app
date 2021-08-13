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
    const currentUser: any = await axios.get('/api/v1/users', {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
        'token-type': localStorage.getItem('token-type'),
      },
    })
    setUser(currentUser.data.id, currentUser.data.name, currentUser.data.email)
  } catch (e) {
    console.log(e)
  }
}

const useUser: UseUser = {
  user: readonly(user),
  fetchUser,
}

export default useUser
