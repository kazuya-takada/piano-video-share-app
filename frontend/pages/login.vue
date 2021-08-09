<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          ログイン
        </h1>
      </v-card-title>
      <v-alert
        dense
        text
        type="error"
        v-for="(error, index) in errorMessages.backendErrors"
        :key="index"
      >
        {{ error }}
      </v-alert>
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
  reactive,
  useContext,
  inject,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()

    interface User {
      name: string
      email: string
      password: string
      password_confirmation: string
    }

    const user = reactive<User>({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })

    const mockBadckendErrors: string[] = []

    interface ErrorMessages {
      backendErrors: string[]
    }

    const errorMessages = reactive<ErrorMessages>({
      backendErrors: mockBadckendErrors,
    })

    const login = async () => {
      await $auth
        .loginWith('local', {
          data: {
            email: user.email,
            password: user.password,
          },
        })
        .then((response: any) => {
          localStorage.setItem('access-token', response.headers['access-token'])
          localStorage.setItem('client', response.headers.client)
          localStorage.setItem('uid', response.headers.uid)
          localStorage.setItem('token-type', response.headers['token-type'])
        })
        .catch((e) => {
          const errors = e.response.data.errors
          errorMessages.backendErrors = errors
        })
    }

    return {
      user,
      errorMessages,
      login,
    }
  },
})
</script>
