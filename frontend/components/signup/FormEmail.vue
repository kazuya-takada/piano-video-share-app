<template>
  <v-text-field
    type="email"
    :rules="rules"
    @input="handleInput"
    prepend-icon="mdi-email"
    label="メールアドレス"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_, context) {
    const handleInput = (event: Event) => {
      context.emit('input', event)
    }

    return {
      handleInput,
      rules: [
        (v: string) => !!v || '',
        (v: string) => /.+@.+\..+/.test(v) || '',
      ],
    }
  },
})
</script>
