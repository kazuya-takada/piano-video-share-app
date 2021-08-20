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
  useContext,
  inject,
  reactive,
} from '@nuxtjs/composition-api'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  auth: 'guest',
  setup() {
    const { $auth } = useContext()

    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

    interface User {
      email: string
      password: string
    }

    const user = reactive<User>({
      email: '',
      password: '',
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
          console.log(response)
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
