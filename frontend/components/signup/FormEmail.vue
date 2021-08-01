<template>
  <v-text-field
    type="email"
    :value="value"
    :rules="rules"
    @input="handleInput"
    prepend-icon="mdi-email"
    label="メールアドレス"
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
