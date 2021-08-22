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
        v-for="(movie_url, index) in movie.urls"
        :key="index"
      >
        <v-card class="mx-auto" max-width="500px">
          <video :src="movie_url" class="preview" controls></video>
          <v-card-title class="mb-3">
            ここに動画のタイトル
          </v-card-title>
          <v-card-subtitle>
            投稿者：Guest
            <br />
            投稿日時：2021/08/15
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="#6abe83" text>
              再生する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      ログインユーザー
      {{ user }}
      <br />
      投稿データのurl
      {{ movie.urls }}
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useFetch,
  inject,
  useContext,
  reactive,
} from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'
import FormComment from '~/components/post/FormComment.vue'

export default defineComponent({
  components: { FormComment },
  auth: false,
  setup() {
    const { $axios } = useContext()

    const { user, fetchUser } = inject(userKey) as UseUser
    const movie = reactive({
      urls: [],
    })

    useFetch(async () => {
      await fetchUser()
      await $axios
        .$get('/api/v1/movies')
        .then((response: any) => {
          movie.urls = response.map((obj: any) => obj.movie_url)
        })
        .catch((e) => {
          console.log(e)
        })
    })

    return {
      user,
      movie,
    }
  },
})
</script>
