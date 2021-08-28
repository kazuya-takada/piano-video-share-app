<template>
  <v-text-field
    type="text"
    :rules="rules"
    :counter="max"
    :value="props.title"
    @input="handleInput"
    prepend-icon="mdi-clipboard-play-outline"
    label="タイトル"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const handleInput = (event: Event) => {
      context.emit('input', event)
    }

    const max = 40

    return {
      handleInput,
      props,
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
