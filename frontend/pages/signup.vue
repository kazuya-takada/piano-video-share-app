<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          ユーザー登録
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
          <UserFormName v-model="user.name" />
          <UserFormEmail v-model="user.email" />
          <UserFormPassword v-model="user.password" />
          <UserFormPasswordConfirmation v-model="user.password_confirmation" />
          <v-card-actions>
            <v-btn color="#6abe83" class="white--text" @click="registerUser">
              新規登録
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
  useRouter,
} from '@nuxtjs/composition-api'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  auth: 'guest',
  setup() {
    const { $axios, $auth } = useContext()
    const router = useRouter()

    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

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

    const registerUser = async () => {
      await $axios
        .post('/api/v1/users', user)
        .then(() => {
          router.push('/')
          displayFlashMessage('新規登録')
        })
        // .then(async () => {
        //   await $auth
        //     .loginWith('local', {
        //       data: {
        //         email: user.email,
        //         password: user.password,
        //       },
        //     })
        //     .then(() => {
        //       // localStorage.setItem(
        //       //   'access-token',
        //       //   response.headers['access-token'],
        //       // )
        //       // localStorage.setItem('client', response.headers.client)
        //       // localStorage.setItem('uid', response.headers.uid)
        //       // localStorage.setItem('token-type', response.headers['token-type'])
        //       displayFlashMessage('新規登録')
        //     })
        //     .catch((e) => console.log(e))
        // })
        .catch((e) => {
          console.log(e)
          const errors = e.response.data.errors
          errorMessages.backendErrors = errors
        })
    }

    return {
      user,
      errorMessages,
      registerUser,
    }
  },
})
</script>
