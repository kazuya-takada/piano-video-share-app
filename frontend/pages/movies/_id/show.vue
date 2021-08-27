<template>
  <v-container>
    <!-- <UserDeleteModal :dialog="dialog" @to-dialog-false="toDialogFalse" /> -->
    <v-card width="800px" class="mx-auto mt-5" elevation="1">
      <video
        :src="movie.movie_url"
        class="preview"
        controls
        width="100%"
      ></video>
      <v-card-title>
        <h1 class="headline">
          {{ movie.title }}
        </h1>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="#6abe83" class="white--text mr-3" :to="`/`" nuxt>
            編集
          </v-btn>
          <!-- <v-btn color="#f06966" class="white--text" @click="toDialogTrue">
            削除
          </v-btn> -->
          <v-btn color="#f06966" class="white--text">
            削除
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <v-simple-table class="px-5 pb-15">
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="body-1 font-weight-bold">投稿者</th>
              <td class="body-1">（仮）</td>
            </tr>
            <tr>
              <th class="body-1 font-weight-bold">投稿日</th>
              <td class="body-1">
                {{ new Date(movie.created_at).toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <button @click="debag">debug</button>
    {{ movies }}
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useRoute,
  computed,
  useFetch,
  ref,
} from '@nuxtjs/composition-api'
import movieKey from '@/store/movie/movieKey'
import { Movie, UseMovie } from '@/store/movie/movieTypes'

export default defineComponent({
  auth: false,
  setup() {
    const route = useRoute()
    const id = computed(() => route.value.params.id)

    const { movies } = inject(movieKey) as UseMovie

    const movie = ref<Movie>(
      movies.value.find((movie: Movie) => {
        return movie.id === Number(id.value)
      }),
    )

    const debag = () => {
      console.log(movie)
    }

    // const dialog = ref<boolean>(false)

    // const toDialogTrue = () => {
    //   dialog.value = true
    // }

    // const toDialogFalse = () => {
    //   dialog.value = false
    // }

    // useFetch(async () => {
    //   await fetchUser()
    // })

    return {
      id,
      debag,
      movies,
      movie,
    }
  },
})
</script>
