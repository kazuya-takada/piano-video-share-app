<template>
  <v-text-field
    type="text"
    :rules="rules"
    :counter="max"
    @input="handleInput"
    prepend-icon="mdi-clipboard-play-outline"
    label="タイトル"
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
      rules: [
        // ||の左側はバリデーションの成功。!!vはvalueが存在していること。
        // ||の右側はバリデーションのメッセージ。
        (v: string) => !!v || '',
        (v: string) =>
          (!!v && max >= v.length) || `${max}文字以内で入力してください`,
      ],
    }
  },
})
</script>
