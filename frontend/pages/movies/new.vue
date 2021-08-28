<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          動画投稿
        </h1>
      </v-card-title>
      <ErrorMessage :errors="errorMessages" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <MovieFormTitle
            v-model="inputMovie.title"
            :title="inputMovie.title"
          />
          <MovieFormVideo @set-image="setImage" />
          <MovieFormIntroduction
            v-model="inputMovie.introduction"
            :title="inputMovie.introduction"
          />
          <v-card-actions>
            <v-btn color="#6abe83" class="white--text" @click="registerUser">
              新規投稿
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
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'
import movieKey from '@/store/movie/movieKey'
import { Movie, UseMovie } from '@/store/movie/movieTypes'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const router = useRouter()

    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage
    const { setMovies } = inject(movieKey) as UseMovie

    interface InputMovie {
      title: string
      movie: any
      introduction: string
    }

    const inputMovie = reactive<InputMovie>({
      title: '',
      movie: '',
      introduction: '',
    })

    const errorMessages = ref<string[]>([])

    const setImage = (e: any) => {
      inputMovie.movie = e
    }

    const registerUser = async () => {
      const formData: any = new FormData()
      formData.append('movie[title]', inputMovie.title)
      formData.append('movie[movie]', inputMovie.movie)
      formData.append('movie[introduction]', inputMovie.introduction)
      try {
        const response: Movie = await $axios.$post('/api/v1/movies', formData)
        setMovies(response)
        router.push('/')
        displayFlashMessage('動画投稿')
      } catch (e) {
        switch (e.response.status) {
          case 500:
            errorMessages.value = ['動画が添付されていません']
            break
          case 422:
            errorMessages.value = e.response.data.map((message: string) => {
              return message.includes('Movie')
                ? message.replace('Movie', '動画')
                : message
            })
            break
          default:
            console.log(e)
            break
        }
      }
    }

    return {
      inputMovie,
      setImage,
      registerUser,
      errorMessages,
    }
  },
})
</script>
