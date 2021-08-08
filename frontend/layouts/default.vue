<template>
  <v-app dark>
    <v-app-bar color="#6abe83" app dark>
      <v-toolbar-title>ピアノ動画シェア（仮）</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/signup" nuxt>新規登録</v-btn>
        <v-btn text to="/login" nuxt>ログイン</v-btn>
        <v-btn text :to="`/users/${id}`" nuxt>プロフィール</v-btn>
        <v-btn text>ログアウト</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer color="#6abe83" :absolute="!fixed" app dark>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
