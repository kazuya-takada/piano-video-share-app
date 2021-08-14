<template>
  <v-container>
    <UserDeleteModal :dialog="dialog" />
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
  inject,
  useFetch,
  reactive,
} from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'

export default defineComponent({
  setup() {
    const { user, fetchUser } = inject(userKey) as UseUser

    const dialog = reactive({
      isDisplay: false,
    })

    useFetch(async () => {
      await fetchUser()
    })

    return {
      user,
      dialog,
    }
  },
})
</script>
