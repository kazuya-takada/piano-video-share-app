<template>
  <v-app dark>
    <v-app-bar color="#6abe83" app dark>
      <v-toolbar-title>ピアノ動画シェア（仮）</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/signup" nuxt v-if="!$auth.loggedIn">
          新規登録
        </v-btn>
        <v-btn text to="/login" nuxt v-if="!$auth.loggedIn">
          ログイン
        </v-btn>
        <v-btn text :to="`/users/${id}`" nuxt v-if="$auth.loggedIn">
          プロフィール
        </v-btn>
        <v-btn text v-if="$auth.loggedIn" @click="logout">
          ログアウト
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer color="#6abe83" app dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const { $auth } = useContext()

    const logout = async () => {
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
      logout,
    }
  },
})
</script>
