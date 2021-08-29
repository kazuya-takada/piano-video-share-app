<template>
  <v-dialog v-model="dialog" persistent width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2 mb-7">
        本当に削除しますか？
      </v-card-title>
      <v-card-text>
        <v-alert dense outlined type="error">
          ユーザーを削除すると、投稿した動画も一緒に削除されますので、ご注意ください。
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#f06966" text @click="deleteUser">
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
import { defineComponent, useContext, inject } from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, context) {
    const { $axios, $auth } = useContext()

    const { user, unsetUser } = inject(userKey) as UseUser
    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

    const deleteUser = async () => {
      try {
        await $axios.$delete(`/api/v1/users/${user.id}`, {
          withCredentials: true,
        })
        await $auth.logout()
        unsetUser()
        displayFlashMessage('削除')
      } catch (e) {
        console.log(e)
      }
    }

    const callToDialogFalse = () => {
      context.emit('to-dialog-false')
    }

    return {
      deleteUser,
      callToDialogFalse,
    }
  },
})
</script>
