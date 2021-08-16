<template>
  <v-file-input
    :rules="rules"
    @input="handleInput"
    show-size
    prepend-icon="mdi-paperclip"
    label="動画ファイル"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, context) {
    const handleInput = (event: Event) => {
      context.emit('input', event)
    }

    const max = 40

    return {
      handleInput,
      max,
      // 動画ファイルのバリデーション方法がわからない。ファイル形式を動画限定、容量を500MB以下とか
      rules: [(v: string) => !!v || ''],
    }
  },
})
</script>
