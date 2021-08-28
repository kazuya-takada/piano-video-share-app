<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        本当に削除しますか？
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#f06966" text @click="deleteMovie">
          削除する
        </v-btn>
        <v-btn color="#6abe83" text @click="callToDialogFalse">
          戻る
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  useRouter,
  inject,
} from '@nuxtjs/composition-api'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },

  setup(props, context) {
    const { $axios } = useContext()
    const router = useRouter()

    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

    const deleteMovie = async () => {
      try {
        await $axios.$delete(`/api/v1/movies/${props.id}`)
        router.push('/')
        displayFlashMessage('削除')
      } catch (e) {
        console.log(e)
      }
    }

    const callToDialogFalse = () => {
      context.emit('to-dialog-false')
    }

    return {
      deleteMovie,
      callToDialogFalse,
    }
  },
})
</script>
