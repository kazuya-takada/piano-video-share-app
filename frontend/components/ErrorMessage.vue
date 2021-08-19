<template>
  <div>
    <v-alert
      dense
      text
      type="error"
      v-for="(error, index) in errorMessages.backendErrors"
      :key="index"
    >
      {{ error }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@nuxtjs/composition-api'
import errorKey from '@/store/error/errorKey'
import { UseErrorMessage } from '@/store/error/errorTypes'

export default defineComponent({
  setup() {
    const { errorMessages } = inject(errorKey) as UseErrorMessage

    return {
      errorMessages,
    }
  },
})
</script>
