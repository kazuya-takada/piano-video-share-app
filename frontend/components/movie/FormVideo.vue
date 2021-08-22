<template>
  <v-file-input
    :rules="rules"
    @change="setImage"
    show-size
    prepend-icon="mdi-paperclip"
    label="動画ファイル"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, context) {
    const setImage = (event: Event) => {
      context.emit('set-image', event)
    }

    return {
      setImage,
      rules: [(v: string) => !!v || ''],
    }
  },
})
</script>
