<template>
  <v-container>
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
    <v-card width="800px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          プロフィール
        </h1>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="#6abe83" class="white--text mr-3">
            編集
          </v-btn>
          <v-btn
            color="#f06966"
            class="white--text"
            @click="dialog.isDisplay = true"
          >
            削除
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <v-simple-table class="px-5 pb-15">
        <template v-slot:default>
          <tbody>
            <tr>
              <th class="body-1 font-weight-bold">名前</th>
              <td class="body-1">{{ user.name }}</td>
            </tr>
            <tr>
              <th class="body-1 font-weight-bold">メールアドレス</th>
              <td class="body-1">{{ user.email }}</td>
            </tr>
            <tr></tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  inject,
  useFetch,
  reactive,
} from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'

export default defineComponent({
  setup() {
    const { $axios, $auth } = useContext()

    const { user, fetchUser, unsetUser } = inject(userKey) as UseUser

    const dialog = reactive({
      isDisplay: false,
    })

    useFetch(async () => {
      await fetchUser()
    })

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
      user,
      dialog,
      deleteUser,
    }
  },
})
</script>
