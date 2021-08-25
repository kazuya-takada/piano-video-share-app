<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          ログイン
        </h1>
      </v-card-title>
      <ErrorMessage :errors="errors.message" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <UserFormEmail v-model="user.email" />
          <UserFormPassword v-model="user.password" />
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

    const user = reactive<InputUser>({
      email: '',
      password: '',
    })

    interface Erros {
      message: string[]
    }

    const errors = reactive<Erros>({
      message: [],
    })

    const login = async () => {
      try {
        const response: any = await $auth.loginWith('local', {
          data: {
            email: user.email,
            password: user.password,
          },
          withCredentials: true,
        })
        const responseData: User = response.data
        setUser(responseData.id, responseData.name, responseData.email)
        displayFlashMessage('ログイン')
      } catch (e) {
        errors.message = e.response.data.errors
      }
    }

    return {
      user,
      login,
      errors,
    }
  },
})
</script>
