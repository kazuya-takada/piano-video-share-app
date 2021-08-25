<template>
  <v-container>
    <v-card width="500px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          プロフィール編集
        </h1>
      </v-card-title>
      <ErrorMessage :errors="errorMessages" />
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <UserFormName v-model="inputUser.name" />
          <UserFormEmail v-model="inputUser.email" />
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
  ref,
} from '@nuxtjs/composition-api'
import userKey from '@/store/user/userKey'
import { User, UseUser } from '@/store/user/userTypes'
import flashKey from '@/store/flash/flashKey'
import { UseFlashMessage } from '@/store/flash/flashTypes'

export default defineComponent({
  setup() {
    const { $axios } = useContext()
    const router = useRouter()

    const { user, fetchUser, setUser } = inject(userKey) as UseUser
    const { displayFlashMessage } = inject(flashKey) as UseFlashMessage

    interface InputUser {
      name: string
      email: string
    }

    const inputUser = reactive<InputUser>({
      name: user.name,
      email: user.email,
    })

    useFetch(async () => {
      await fetchUser()
      inputUser.name = user.name
      inputUser.email = user.email
    })

    const errorMessages = ref<string[]>([])

    const editUser = async () => {
      try {
        const response: User = await $axios.$put(
          `/api/v1/users/${user.id}`,
          inputUser,
          {
            withCredentials: true,
          },
        )
        setUser(response.id, response.name, response.email)
        router.push(`/users/${response.id}/show`)
        displayFlashMessage('編集')
      } catch (e) {
        errorMessages.value = e.response.data
      }
    }

    return {
      inputUser,
      user,
      editUser,
      errorMessages,
    }
  },
})
</script>
