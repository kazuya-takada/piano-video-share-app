<template>
  <div>
    <v-alert
      dense
      text
      type="error"
      v-for="(error, index) in errors"
      :key="index"
    >
      {{ error }}
    </v-alert>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    errors: {
      type: Array,
      require: true,
    },
  },
})
</script>
