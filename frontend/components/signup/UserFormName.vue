<template>
  <v-text-field
    type="text"
    :value="value"
    :rules="rules"
    @input="handleInput"
    prepend-icon="mdi-account"
    label="名前"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup(_, context) {
    const handleInput = (event: Event) => {
      context.emit('input', event)
    }

    const max = 30

    return {
      handleInput,
      max,
      rules: [
        // ||の左側はバリデーションの成功。!!vはvalueが存在していること。
        // ||の右側はバリデーションのメッセージ。
        (v: String) => !!v || '',
        (v: String) =>
          (!!v && max >= v.length) || `${max}文字以内で入力してください`,
      ],
    }
  },
})
</script>
