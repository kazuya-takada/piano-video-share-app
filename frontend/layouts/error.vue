<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <v-alert dense outlined type="error">
        {{ pageNotFound }}
      </v-alert>
    </h1>
    <h1 v-else>
      <v-alert dense outlined type="error">
        {{ otherError }}
      </v-alert>
    </h1>
    <v-card-actions>
      <v-btn color="#6abe83" class="white--text" to="/" nuxt>
        ホームへ
      </v-btn>
    </v-card-actions>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 存在しないページです',
      otherError: 'エラーが発生しました',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
