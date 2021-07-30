import { reactive, readonly } from '@nuxtjs/composition-api'
import { User, UseUser } from '@/composables/user/userTypes'

const user = reactive<User>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const useUser: UseUser = {
  user: readonly(user),
}

export default useUser
