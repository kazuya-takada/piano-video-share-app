<template>
  <v-app-bar color="#6abe83" app dark>
    <v-toolbar-title>
      <v-btn text to="/" nuxt class="title font-weight-bold">
        ピアノ動画シェア（仮）
      </v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text to="/signup" nuxt v-if="!$auth.loggedIn">
        新規登録
      </v-btn>
      <v-btn text to="/login" nuxt v-if="!$auth.loggedIn">
        ログイン
      </v-btn>
      <v-btn text to="/posts/new" nuxt v-if="$auth.loggedIn">
        新規投稿
      </v-btn>
      <v-btn text :to="`/users/${user.id}/show`" nuxt v-if="$auth.loggedIn">
        プロフィール
      </v-btn>
      <v-btn text v-if="$auth.loggedIn" @click="logout">
        ログアウト
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, useContext, inject } from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  setup() {
    const { $auth, $axios } = useContext()

    const { user, unsetUser } = inject(userKey) as UseUser
    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

    const logout = async () => {
      await $axios
        .delete('/api/v1/logout', {
          withCredentials: true,
        })
        .catch((e) => console.log(e))
      await unsetUser()
      await $auth
        .logout()
        .then(() => {
          displayFlashMessage('ログアウト')
        })
        .catch((e) => {
          console.log(e)
        })
    }

    return {
      user,
      logout,
    }
  },
})
</script>
