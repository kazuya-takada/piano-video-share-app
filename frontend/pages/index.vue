<template>
  <div>
    <v-row align="center">
      <!-- <PostIndivisual />
      <PostIndivisual />
      <PostIndivisual />
      <PostIndivisual /> -->
      <v-col
        cols="12"
        sm="8"
        md="4"
        v-for="(movie, index) in movies.movieList"
        :key="index"
      >
        <v-card class="mx-auto" max-width="500px">
          <video :src="movie.movie_url" class="preview" controls></video>
          <v-card-title class="mb-3">
            {{ movie.title }}
          </v-card-title>
          <v-card-subtitle>
            投稿者：Guest
            <br />
            投稿日：{{ new Date(movie.created_at).toLocaleString() }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="#6abe83" text>
              再生する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      a
      {{ movies }}
      ログインユーザー
      {{ user }}
      <br />
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  inject,
  useContext,
} from '@nuxtjs/composition-api'
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
      await fetchUser()
      await fetchMovies()
      // await $axios
      //   .$get('/api/v1/movies')
      //   .then((response: any) => {
      //     movie.urls = response.map((obj: any) => obj.movie_url)
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
    })

    return {
      user,
      movies,
    }
  },
})
</script>
