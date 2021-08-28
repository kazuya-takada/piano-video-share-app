<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">動画編集{{ inputMovie }}</h1>
      </v-card-title>
      <ErrorMessage :errors="errorMessages" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <MovieFormTitle
            v-model="inputMovie.title"
            :title="inputMovie.title"
          />
          <MovieFormIntroduction
            v-model="inputMovie.introduction"
            :introduction="inputMovie.introduction"
          />
          <v-card-actions>
            <v-btn color="#6abe83" class="white--text" @click="test">
              編集
            </v-btn>
            <v-btn
              color="#f1ac9d"
              class="white--text"
              :to="`/movies/${movieId}/show`"
              nuxt
            >
              戻る
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRouter,
  inject,
  useFetch,
  reactive,
  ref,
  useRoute,
  computed,
  ComputedRef,
} from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { User, UseUser } from '@/store/user/userTypes'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'
import movieKey from '@/store/movie/movieKey'
import { Movie, UseMovie } from '@/store/movie/movieTypes'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const router = useRouter()
    const route = useRoute()

    const id: ComputedRef<number> = computed(() =>
      Number(route.value.params.id),
    )

    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage
    const { movies, fetchMovies } = inject(movieKey) as UseMovie

    // const movie = reactive<Movie>({
    //   id: 0,
    //   title: '',
    //   introduction: '',
    //   created_at: '',
    //   updated_at: '',
    //   movie_url: '',
    //   user_id: 0,
    // })

    const movieId = ref<number>(0)

    interface InputMovie {
      title: string
      introduction: string
    }

    const inputMovie = reactive<InputMovie>({
      title: '',
      introduction: '',
    })

    useFetch(async () => {
      await fetchMovies()
      const gotMovie = movies.value.find((movie: Movie) => {
        return movie.id === Number(id.value)
      })
      // movie.id = gotMovie.id
      // movie.title = gotMovie.title
      // movie.introduction = gotMovie.introduction
      // movie.created_at = gotMovie.created_at
      // movie.movie_url = gotMovie.movie_url
      // movie.user_id = gotMovie.user_id
      movieId.value = gotMovie.id
      inputMovie.title = gotMovie.title
      inputMovie.introduction = gotMovie.introduction
    })

    const errorMessages = ref<string[]>([])

    // const editUser = async () => {
    //   try {
    //     const response: User = await $axios.$put(
    //       `/api/v1/users/${user.id}`,
    //       inputUser,
    //       {
    //         withCredentials: true,
    //       },
    //     )
    //     setUser(response.id, response.name, response.email)
    //     router.push(`/users/${response.id}/show`)
    //     displayFlashMessage('編集')
    //   } catch (e) {
    //     errorMessages.value = e.response.data
    //   }
    // }

    const test = () => {
      console.log('kazuya')
    }

    return {
      // movie,
      movieId,
      inputMovie,
      errorMessages,
      test,
    }
  },
})
</script>
