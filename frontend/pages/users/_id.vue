<template>
  <v-container>
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
          <v-btn color="#f06966" class="white--text">
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
  useRoute,
  reactive,
  useFetch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $http } = useContext()
    const route = useRoute()

    const id = Number(route.value.params.id)

    interface User {
      allow_password_change: boolean
      created_at: string
      email: string
      id: number
      name: string
      provider: string
      uid: string
      updated_at: string
    }

    const user = reactive<User>({
      allow_password_change: false,
      created_at: '',
      email: '',
      id: 0,
      name: '',
      provider: '',
      uid: '',
      updated_at: '',
    })

    useFetch(async () => {
      const gotUser: User = await $http.$get(`/api/v1/users/${id}`)
      user.name = gotUser.name
      user.email = gotUser.email
    })

    return {
      user,
    }
  },
})
</script>
