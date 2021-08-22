import { DeepReadonly } from '@nuxtjs/composition-api'

export interface Movie {
  id: 0
  title: string
  introduction: string
  created_at: string
  updated_at: string
  movie_url: string
}

export interface Movies {
  movieList: Movie[]
}

export interface UseMovie {
  movies: DeepReadonly<Movies>
  setMovies: (array: any) => void
  fetchMovies: () => void
}
