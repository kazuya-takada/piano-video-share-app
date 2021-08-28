import { DeepReadonly } from '@nuxtjs/composition-api'

export interface Movie {
  id: number
  title: string
  introduction: string
  created_at: string
  updated_at: string
  movie_url: string
  user_id: number
}

export interface UseMovie {
  movies: DeepReadonly<any>
  setMovies: (movie: Movie) => void
  fetchMovies: () => void
}
