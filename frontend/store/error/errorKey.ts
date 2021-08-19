import { InjectionKey } from '@nuxtjs/composition-api'
import { UseErrorMessage } from '@/store/error/errorTypes'

const errorMessageKey: InjectionKey<UseErrorMessage> = Symbol('UseErrorMessage')
export default errorMessageKey
