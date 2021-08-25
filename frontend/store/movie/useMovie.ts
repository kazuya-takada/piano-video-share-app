import { reactive, readonly } from '@nuxtjs/composition-api'
import { Movie, Movies, UseMovie } from '@/store/movie/movieTypes'
import axios from 'axios'

const movies = reactive<Movies>({
  movieList: [],
})

const setMovies = (movie: Movie) => {
  movies.movieList.push(movie)
}

const unsetMovies = () => {
  movies.movieList = []
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
