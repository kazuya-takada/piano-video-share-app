<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          動画投稿
        </h1>
      </v-card-title>
      <ErrorMessage :errors="errors.message" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <PostFormTitle v-model="movie.title" />
          <PostFormVideo @set-image="setImage" />
          <PostFormComment v-model="movie.introduction" />
          {{ movie }}
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
} from '@nuxtjs/composition-api'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const router = useRouter()

    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

    interface Movie {
      title: string
      movie: any
      introduction: string
    }

    const movie = reactive<Movie>({
      title: '',
      movie: null,
      introduction: '',
    })

    interface Erros {
      message: string[]
    }

    const errors = reactive<Erros>({
      message: [],
    })

    const setImage = (e: any) => {
      movie.movie = e
    }

    const registerUser = async () => {
      console.log(movie.movie)
      const formData = new FormData()
      formData.append('movie[title]', movie.title)
      formData.append('movie[movie]', movie.movie)
      formData.append('movie[introduction]', movie.introduction)
      await $axios
        .$post('/api/v1/movies', formData)
        .then((response: any) => {
          router.push('/')
          displayFlashMessage('動画投稿')
          // storeに動画をセットする必要がありそう。
        })
        .catch((e) => {
          errors.message = e.response.data
        })
    }

    return {
      movie,
      setImage,
      registerUser,
      errors,
    }
  },
})
</script>
