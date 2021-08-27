import { DeepReadonly } from '@nuxtjs/composition-api'

export interface Movie {
  id: number
  title: string
  introduction: string
  created_at: string
  updated_at: string
  movie_url: string
}

export interface UseMovie {
  movie: DeepReadonly<Movie>
  setMovie: (
    id: number,
    title: string,
    introduction: string,
    created_at: string,
    movie_url: string,
  ) => void
  movies: DeepReadonly<any>
  setMovies: (movie: Movie) => void
  fetchMovies: () => void
}
