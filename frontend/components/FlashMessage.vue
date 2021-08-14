<template>
  <v-alert
    v-model="flashMessage.display"
    outlined
    type="success"
    text
    dismissible
  >
    ログインしました！
  </v-alert>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  setup() {
    const { flashMessage } = inject(flashKey) as UseFlashMessage

    return {
      flashMessage,
    }
  },
})
</script>
