<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          プロフィール編集
        </h1>
      </v-card-title>
      <ErrorMessage :errors="errors.message" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <UserFormName v-model="currentUser.name" />
          <UserFormEmail v-model="currentUser.email" />
          {{ user }}
          <v-card-actions>
            <v-btn color="#6abe83" class="white--text" @click="editUser">
              編集
            </v-btn>
            <v-btn
              color="#f1ac9d"
              class="white--text"
              :to="`/users/${user.id}/show`"
              nuxt
            >
              戻る
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
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const router = useRouter()

    const { user, fetchUser, setUser } = inject(userKey) as UseUser
    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

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

    interface Erros {
      message: string[]
    }

    const errors = reactive<Erros>({
      message: [],
    })

    const editUser = async () => {
      await $axios
        .$put(`/api/v1/users/${user.id}`, currentUser, {
          withCredentials: true,
        })
        .then((response: any) => {
          const user = response
          setUser(user.id, user.name, user.email)
          router.push(`/users/${user.id}/show`)
          displayFlashMessage('編集')
        })
        .catch((e) => {
          errors.message = e.response.data
        })
    }

    return {
      currentUser,
      user,
      editUser,
      errors,
    }
  },
})
</script>
