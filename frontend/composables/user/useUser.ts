import { reactive, readonly } from '@nuxtjs/composition-api'
import { User, UseUser } from '@/composables/user/userTypes'

const user = reactive<User>({
  allow_password_change: false,
  created_at: '',
  email: '',
  id: 0,
  name: '',
  provider: '',
  uid: '',
  updated_at: '',
})

const useUser: UseUser = {
  user: readonly(user),
}

export default useUser
