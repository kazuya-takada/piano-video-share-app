import { InjectionKey } from '@nuxtjs/composition-api'
import { UseUser } from '@/composables/user/userTypes'

const userKey: InjectionKey<UseUser> = Symbol('UseUser')
export default userKey
