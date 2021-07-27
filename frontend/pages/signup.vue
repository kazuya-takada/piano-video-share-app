<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">
          ユーザー登録
        </h1>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="user.name"
            prepend-icon="mdi-account"
            label="名前"
          />
          <v-text-field
            v-model="user.email"
            prepend-icon="mdi-email"
            label="メールアドレス"
          />
          <v-text-field
            type="password"
            v-model="user.password"
            prepend-icon="mdi-lock"
            label="パスワード"
          />
          <v-text-field
            type="password"
            v-model="user.password_confirmation"
            prepend-icon="mdi-lock"
            label="パスワード確認"
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

    const registerUser = () => {
      useAsync(() => {
        $http.post('/api/v1/auth', user)
        router.push('/')
      })
    }

    return {
      user,
      registerUser,
    }
  },
})
</script>
