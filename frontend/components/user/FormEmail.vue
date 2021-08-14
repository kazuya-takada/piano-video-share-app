<template>
  <v-text-field
    type="email"
    :rules="rules"
    :value="user.email"
    @input="handleInput"
    prepend-icon="mdi-email"
    label="メールアドレス"
  />
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'

export default defineComponent({
  setup(_, context) {
    const { user } = inject(userKey) as UseUser

    const handleInput = (event: Event) => {
      context.emit('input', event)
    }

    return {
      user,
      handleInput,
      rules: [
        (v: string) => !!v || '',
        (v: string) => /.+@.+\..+/.test(v) || '',
      ],
    }
  },
})
</script>
