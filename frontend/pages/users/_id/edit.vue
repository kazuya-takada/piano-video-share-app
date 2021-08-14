<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          プロフィール編集
        </h1>
      </v-card-title>
      <v-alert dense text type="error" v-if="errorMessage.backendError.length">
        {{ errorMessage.backendError }}
      </v-alert>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <UserFormName v-model="currentUser.name" />
          <UserFormEmail v-model="currentUser.email" />
          {{ user }}
          <v-card-actions>
            <v-btn color="#6abe83" class="white--text" @click="editUser">
              編集
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
  useRouter,
  inject,
  useFetch,
  reactive,
} from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { UseUser } from '@/store/user/userTypes'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const router = useRouter()

    const { user, fetchUser } = inject(userKey) as UseUser

    useFetch(async () => {
      await fetchUser()
    })

    interface CurrentUser {
      name: string
      email: string
    }

    const currentUser = reactive<CurrentUser>({
      name: user.name,
      email: user.email,
    })

    interface ErrorMessage {
      backendError: string
    }

    const errorMessage = reactive<ErrorMessage>({
      backendError: '',
    })

    const editUser = async () => {
      await $axios
        .$put('/api/v1/auth', currentUser, {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
            'token-type': localStorage.getItem('token-type'),
          },
        })
        .then(() => {
          router.push(`/users/${user.id}/show`)
        })
        .catch((e) => {
          // devise_token_authのユーザーアップデートのエラーメッセージがどうしても上手くいかないため、下記の通り記述。
          errorMessage.backendError =
            '入力に誤りがあるか、もしくはすでに使われているメールアドレスです。'
        })
    }

    return {
      currentUser,
      user,
      errorMessage,
      editUser,
    }
  },
})
</script>
