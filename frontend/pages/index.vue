<template>
  <div>
    <v-row align="center">
      <MovieIndivisual
        v-for="(movie, index) in movies.movieList"
        :key="index"
        :index="index"
      />
      ログインユーザー
      {{ user }}
      <br />
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, useFetch, inject } from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'
import movieKey from '@/store/movie/movieKey'
import { UseMovie } from '@/store/movie/movieTypes'

export default defineComponent({
  auth: false,
  setup() {
    const { user, fetchUser } = inject(userKey) as UseUser
    const { movies, fetchMovies } = inject(movieKey) as UseMovie

    useFetch(async () => {
      fetchUser()
      fetchMovies()
    })

    return {
      user,
      movies,
    }
  },
})
</script>
