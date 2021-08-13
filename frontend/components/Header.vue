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
      <v-btn text :to="`/users/${user.id}`" nuxt v-if="$auth.loggedIn">
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

export default defineComponent({
  setup() {
    const { $auth, $axios } = useContext()

    const { user, unsetUser } = inject(userKey) as UseUser

    const logout = async () => {
      await $axios
        .delete('/api/v1/auth/sign_out', {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
            'token-type': localStorage.getItem('token-type'),
          },
        })
        .catch((e) => console.log(e))
      await unsetUser()
      await $auth
        .logout()
        .then(() => {
          localStorage.removeItem('access-token')
          localStorage.removeItem('client')
          localStorage.removeItem('uid')
          localStorage.removeItem('token-type')
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
