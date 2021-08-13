<template>
  <v-app dark>
    <Header />
    <v-main>
      <v-container>
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

export default defineComponent({
  setup() {
    provide(userKey, useUser)
  },
})
</script>
