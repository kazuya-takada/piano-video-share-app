<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="mx-auto" max-width="500px">
      <!-- <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        height="200px"
      ></v-img> -->
      <video src="~/assets/videos/test.mp4" class="preview" controls></video>
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
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>

<style scoped>
.preview {
  width: 100%;
}
</style>
