<template>
  <v-dialog v-model="dialog.isDisplay" width="500">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        本当に削除しますか？
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#f06966" text @click="deleteUser">
          削除する
        </v-btn>
        <v-btn color="#6abe83" text @click="dialog.isDisplay = false">
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

export default defineComponent({
  props: {
    dialog: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const { $axios, $auth } = useContext()

    const { unsetUser } = inject(userKey) as UseUser

    const deleteUser = async () => {
      await $axios
        .$delete('/api/v1/auth', {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
            'token-type': localStorage.getItem('token-type'),
          },
        })
        .catch((e) => console.log(e))
      await unsetUser()
      await $auth
        .logout()
        .then(() => {
          localStorage.removeItem('access-token')
          localStorage.removeItem('client')
          localStorage.removeItem('uid')
          localStorage.removeItem('token-type')
        })
        .catch((e) => {
          console.log(e)
        })
    }

    return {
      deleteUser,
    }
  },
})
</script>
