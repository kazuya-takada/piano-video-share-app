<template>
  <v-textarea
    filled
    :rules="rules"
    :counter="max"
    @input="handleInput"
    label="投稿コメント"
  ></v-textarea>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, context) {
    const handleInput = (event: Event) => {
      context.emit('input', event)
    }

    const max = 200

    return {
      handleInput,
      max,
      rules: [
        (v: string) => !!v || '',
        (v: string) =>
          (!!v && max >= v.length) || `${max}文字以内で入力してください`,
      ],
    }
  },
})
</script>
