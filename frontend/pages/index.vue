<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center"></v-card>
      <v-card>
        <v-card-title class="headline">
          投稿一覧ページ（予定）
          {{ user }}
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useFetch, inject } from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'

export default defineComponent({
  setup() {
    const { user, fetchUser } = inject(userKey) as UseUser

    useFetch(async () => {
      await fetchUser()
    })

    return {
      user,
    }
  },
})
</script>
