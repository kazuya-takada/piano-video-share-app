<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          ログイン
        </h1>
      </v-card-title>
      <ErrorMessage :errors="errorMessages" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <p>ゲストユーザー用</p>
          <p>ログインID：test@test.com</p>
          <p>パスワード：password</p>
          <p>
            ※ゲストユーザーでユーザー削除を行った場合、大変お手数ですが、同様のユーザー情報で新規ユーザー登録いただけると、ありがたいです（ユーザー名についてはtestとしていただけると幸いです）。
          </p>
          <UserFormEmail v-model="inputUser.email" />
          <UserFormPassword v-model="inputUser.password" />
          <v-card-actions class="mt-3">
            <v-btn color="#6abe83" class="white--text" @click="login">
              ログイン
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  inject,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { User, UseUser } from '@/store/user/userTypes'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  auth: 'guest',
  setup() {
    const { $auth } = useContext()

    const { setUser } = inject(userKey) as UseUser
    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

    interface InputUser {
      email: string
      password: string
    }

    const inputUser = reactive<InputUser>({
      email: '',
      password: '',
    })

    const errorMessages = ref<string[]>([])

    const login = async () => {
      try {
        const response: any = await $auth.loginWith('local', {
          data: {
            email: inputUser.email,
            password: inputUser.password,
          },
          withCredentials: true,
        })
        const responseData: User = response.data
        setUser(responseData.id, responseData.name, responseData.email)
        displayFlashMessage('ログイン')
      } catch (e) {
        errorMessages.value = e.response.data.errors
      }
    }

    return {
      inputUser,
      login,
      errorMessages,
    }
  },
})
</script>
