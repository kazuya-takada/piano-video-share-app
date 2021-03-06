<template>
  <v-container>
    <MovieDeleteModal
      :dialog="dialog"
      :id="id"
      @to-dialog-false="toDialogFalse"
    />
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
        <v-card-actions v-if="isPostUser">
          <v-btn
            color="#6abe83"
            class="white--text mr-3"
            :to="`/movies/${id}/edit`"
            nuxt
          >
            編集
          </v-btn>
          <v-btn color="#f06966" class="white--text" @click="toDialogTrue">
            削除
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <v-simple-table class="px-5 pb-15">
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="body-1 font-weight-bold">投稿者</th>
              <td class="body-1">{{ postUserName }}</td>
            </tr>
            <tr>
              <th class="body-1 font-weight-bold">投稿日</th>
              <td class="body-1">
                {{ new Date(movie.created_at).toLocaleString() }}
              </td>
            </tr>
            <tr>
              <th class="body-1 font-weight-bold" width="15%">動画紹介</th>
              <td class="body-1">
                {{ movie.introduction }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRoute,
  inject,
  computed,
  ref,
  reactive,
  useFetch,
  ComputedRef,
} from '@nuxtjs/composition-api'
import movieKey from '@/store/movie/movieKey'
import { Movie, UseMovie } from '@/store/movie/movieTypes'
import { User, UseUser } from '@/store/user/userTypes'
import userKey from '@/store/user/userKey'

export default defineComponent({
  auth: false,
  setup() {
    const { $axios } = useContext()
    const route = useRoute()

    const id: ComputedRef<number> = computed(() =>
      Number(route.value.params.id),
    )

    const { movies, fetchMovies } = inject(movieKey) as UseMovie
    const { user, fetchUser } = inject(userKey) as UseUser

    const movie = reactive<Movie>({
      id: 0,
      title: '',
      introduction: '',
      created_at: '',
      updated_at: '',
      movie_url: '',
      user_id: 0,
    })

    const postUserName = ref<string>('')

    useFetch(async () => {
      await fetchMovies()
      const gotMovie = movies.value.find((movie: Movie) => {
        return movie.id === Number(id.value)
      })
      fetchUser()
      movie.id = gotMovie.id
      movie.title = gotMovie.title
      movie.introduction = gotMovie.introduction
      movie.created_at = gotMovie.created_at
      movie.movie_url = gotMovie.movie_url
      movie.user_id = gotMovie.user_id
      try {
        const response: User = await $axios.$get(
          `/api/v1/users/${movie.user_id}`,
        )
        postUserName.value = response.name
      } catch (e) {
        console.log(e)
      }
    })

    const isPostUser: ComputedRef<boolean> = computed(() => {
      return movie.user_id === user.id ? true : false
    })

    const dialog = ref<boolean>(false)

    const toDialogTrue = () => {
      dialog.value = true
    }

    const toDialogFalse = () => {
      dialog.value = false
    }

    return {
      movie,
      postUserName,
      isPostUser,
      id,
      dialog,
      toDialogTrue,
      toDialogFalse,
    }
  },
})
</script>
