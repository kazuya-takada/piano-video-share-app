<template>
  <v-col cols="12" sm="8" md="4" class="test">
    <nuxt-link :to="`/movies/${movie.id}/show`">
      <v-card class="mx-auto movie-card" max-width="500px">
        <video :src="movie.movie_url" class="preview"></video>
        <!-- <video :src="movie.movie_url" class="preview" controls></video> -->
        <v-card-title class="text-body-1 font-weight-medium">
          <p class="movie-title">
            {{ movie.title }}
          </p>
        </v-card-title>
        <v-card-subtitle>
          投稿者：{{ userName }}
          <br />
          投稿日時：{{ new Date(movie.created_at).toLocaleString() }}
        </v-card-subtitle>
      </v-card>
    </nuxt-link>
  </v-col>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  inject,
  ref,
  useFetch,
} from '@nuxtjs/composition-api'
import movieKey from '@/store/movie/movieKey'
import { Movie, UseMovie } from '@/store/movie/movieTypes'
import { User } from '@/store/user/userTypes'

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { $axios } = useContext()
    const { movies } = inject(movieKey) as UseMovie

    const movie = ref<Movie>(movies.value[props.index])
    const userName = ref<string>('')

    useFetch(async () => {
      try {
        const response: User = await $axios.$get(
          `/api/v1/users/${movie.value.user_id}`,
        )
        userName.value = response.name
      } catch (e) {
        console.log(e)
      }
    })

    return {
      movie,
      movies,
      userName,
    }
  },
})
</script>

<style scoped>
a {
  text-decoration: none;
}

.movie-card {
  transition: all 0.1s;
}

.movie-card:hover {
  transform: scale(1.03, 1.03);
}

.preview {
  width: 100%;
  object-fit: cover;
  height: 300px;
}

.movie-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
