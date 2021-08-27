import { ref, reactive, readonly } from '@nuxtjs/composition-api'
import { Movie, UseMovie } from '@/store/movie/movieTypes'
import axios from 'axios'

const movie = reactive<Movie>({
  id: 0,
  title: '',
  introduction: '',
  created_at: '',
  updated_at: '',
  movie_url: '',
})

const setMovie = (
  id: number,
  title: string,
  introduction: string,
  created_at: string,
  movie_url: string,
) => {
  movie.id = id
  movie.title = title
  movie.introduction = introduction
  movie.created_at = created_at
  movie.movie_url = movie_url
}

const movies = ref<Movie[]>([])

const changeMovie = (id: Number) => {
  const movie = movies.value.find((movie: Movie) => {
    return movie.id === id
  })
}

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
  movie: readonly(movie),
  setMovie,
  movies: readonly(movies),
  setMovies,
  fetchMovies,
}

export default useMovie
