import { InjectionKey } from '@nuxtjs/composition-api'
import { UseMovie } from '@/store/movie/movieTypes'

const movieKey: InjectionKey<UseMovie> = Symbol('UseUser')
export default movieKey
