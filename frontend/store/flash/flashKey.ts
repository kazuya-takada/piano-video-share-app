import { InjectionKey } from '@nuxtjs/composition-api'
import { UseFlashMessage } from '@/store/flash/flashTypes'

const flashMessageKey: InjectionKey<UseFlashMessage> = Symbol('UseFlashMessage')
export default flashMessageKey
