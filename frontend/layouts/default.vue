<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container>
        <FlashMessage />
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, provide } from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import useUser from '@/store/user/useUser'
import flashKey from '@/store/flash/flashKey'
import useFlash from '@/store/flash/useFlash'
import movieKey from '@/store/movie/movieKey'
import useMovie from '@/store/movie/useMovie'

export default defineComponent({
  name: 'default',
  setup() {
    provide(userKey, useUser)
    provide(flashKey, useFlash)
    provide(movieKey, useMovie)
  },
})
</script>
