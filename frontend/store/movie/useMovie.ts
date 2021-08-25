import { ref, readonly } from '@nuxtjs/composition-api'
import { Movie, UseMovie } from '@/store/movie/movieTypes'
import axios from 'axios'

const movies = ref<Movie[]>([])

const setMovies = (movie: Movie) => {
  movies.value.push(movie)
}

const unsetMovies = () => {
  movies.value = []
}

const fetchMovies = async () => {
  unsetMovies()
  try {
    const response = await axios.get('/api/v1/movies')
    const movieList: Movie[] = response.data
    movieList.forEach((movie: Movie) => {
      setMovies(movie)
    })
  } catch (e) {
    console.log(e)
  }
}

const useMovie: UseMovie = {
  movies: readonly(movies),
  setMovies,
  fetchMovies,
}

export default useMovie
