import { reactive, readonly } from '@nuxtjs/composition-api'
import { User, UseUser } from '@/store/user/userTypes'

const user = reactive<User>({
  id: 0,
  name: '',
  email: '',
})

const setUserId = (id: number) => {
  user.id = id
}

const useUser: UseUser = {
  user: readonly(user),
  setUserId,
}

export default useUser
