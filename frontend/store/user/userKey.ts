import { InjectionKey } from '@nuxtjs/composition-api'
import { UseUser } from '@/store/user/userTypes'

const userKey: InjectionKey<UseUser> = Symbol('UseUser')
export default userKey
