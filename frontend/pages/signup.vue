<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          ユーザー登録
        </h1>
      </v-card-title>
      <ErrorMessage :errors="errorMessages" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <UserFormName v-model="inputUser.name" />
          <UserFormEmail v-model="inputUser.email" />
          <UserFormPassword v-model="inputUser.password" />
          <UserFormPasswordConfirmation
            v-model="inputUser.password_confirmation"
          />
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
  ref,
} from '@nuxtjs/composition-api'

import inputUserKey from '@/store/user/userKey'
import { User, UseUser } from '@/store/user/userTypes'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  auth: 'guest',
  setup() {
    const { $axios, $auth } = useContext()

    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage
    const { setUser } = inject(inputUserKey) as UseUser

    interface InputUser {
      name: string
      email: string
      password: string
      password_confirmation: string
    }

    const inputUser = reactive<InputUser>({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    })

    const errorMessages = ref<string[]>([])

    const registerUser = async () => {
      try {
        await $axios.$post('/api/v1/users', inputUser)
        const response: any = await $auth.loginWith('local', {
          data: {
            email: inputUser.email,
            password: inputUser.password,
          },
          withCredentials: true,
        })
        const responseData: User = response.data
        setUser(responseData.id, responseData.name, responseData.email)
        displayFlashMessage('新規登録')
      } catch (e) {
        console.log(e.response)
        errorMessages.value = e.response.data
      }
    }

    return {
      inputUser,
      errorMessages,
      registerUser,
    }
  },
})
</script>
