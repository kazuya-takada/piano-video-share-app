<template>
  <v-text-field
    type="text"
    :rules="rules"
    :counter="max"
    :value="user.name"
    @input="handleInput"
    prepend-icon="mdi-account"
    label="名前"
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

    const max = 30

    return {
      user,
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
