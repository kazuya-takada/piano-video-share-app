<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="mx-auto" max-width="500px">
      <video :src="movie.movie_url" class="preview" controls></video>
      <v-card-title class="mb-3">
        {{ movie.title }}
      </v-card-title>
      <v-card-subtitle>
        投稿者：Guest
        <br />
        投稿日時：{{ new Date(movie.created_at).toLocaleString() }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn color="#6abe83" text>再生する</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@nuxtjs/composition-api'
import movieKey from '@/store/movie/movieKey'
import { Movie, UseMovie } from '@/store/movie/movieTypes'

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { movies } = inject(movieKey) as UseMovie
    const movie = ref<Movie>(movies.value[props.index])

    return {
      movie,
    }
  },
})
</script>

<style scoped>
.preview {
  width: 100%;
}
</style>
