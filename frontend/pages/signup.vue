<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">
          ユーザー登録
        </h1>
      </v-card-title>
      <v-alert
        dense
        text
        type="error"
        v-for="(error, index) in backendErrors"
        :key="index"
      >
        {{ error }}
      </v-alert>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <SignupFormName v-model="user.name" />
          <SignupFormEmail v-model="user.email" />
          <SignupFormPassword v-model="user.password" />
          <SignupFormPasswordConfirmation
            v-model="user.password_confirmation"
          />
          <v-card-actions>
            <v-btn color="#FF8A65" class="white--text" @click="registerUser">
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
  reactive,
  useAsync,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $http } = useContext()
    const router = useRouter()

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

    let backendErrors = reactive<any>([])

    const registerUser = () => {
      useAsync(() => {
        $http.post('/api/v1/auth', user).catch((e) => {
          const errors = e.response.data.errors

          // 単純に追加だとNG。更新にしたいため、以下の書き方にしたが...
          backendErrors.length = 0
          errors.forEach((error: string) => {
            backendErrors.push(error)
          })
          router.push('/signup')
        })
      })
    }

    return {
      user,
      backendErrors,
      registerUser,
    }
  },
})
</script>
