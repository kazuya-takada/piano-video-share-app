<template>
  <v-row align="center">
    <PostIndivisual />
    <PostIndivisual />
    <PostIndivisual />
    <PostIndivisual />
    ログインユーザー
    {{ user }}
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useFetch, inject } from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'

export default defineComponent({
  auth: false,
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
