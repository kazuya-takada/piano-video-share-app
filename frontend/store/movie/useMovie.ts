import { reactive, readonly } from '@nuxtjs/composition-api'
import { Movie, Movies, UseMovie } from '@/store/movie/movieTypes'
import axios from 'axios'

const movies = reactive<Movies>({
  movieList: [],
})

const setMovies = (array: any) => {
  movies.movieList.push(array)
}

const unsetMovies = () => {
  movies.movieList = []
}

const fetchMovies = async () => {
  try {
    await axios.get('/api/v1/movies').then((response: any) => {
      unsetMovies()
      response.data.forEach((array: []) => {
        setMovies(array)
      })
    })
  } catch (e) {
    console.log(e)
  }
}

// const unsetUser = () => {
//   user.id = 0
//   user.name = ''
//   user.email = ''
// }

const useMovie: UseMovie = {
  movies: readonly(movies),
  setMovies,
  fetchMovies,
}

export default useMovie
