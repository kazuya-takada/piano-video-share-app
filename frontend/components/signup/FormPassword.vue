<template>
  <v-text-field
    type="password"
    :rules="rules"
    @input="handleInput"
    prepend-icon="mdi-lock"
    label="パスワード"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, context) {
    const handleInput = (event: Event) => {
      context.emit('input', event)
    }

    const min = '8文字以上'

    return {
      handleInput,
      rules: [
        (v: string) => !!v || '',
        (v: string) =>
          /^([a-zA-Z0-9]{8,30})$/.test(v) || `${min}。半角英数字が使えます`,
      ],
    }
  },
})
</script>
