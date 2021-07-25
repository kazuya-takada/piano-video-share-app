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

<script>
export default {
  name: 'App',
  auth: false,
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  methods: {
    registerUser() {
      this.$axios
        .post('http://localhost:3000/api/v1/auth', this.user)
        .then((response) => {
          window.location.href = '/users/comfirmation'
        })
    },
  },
}
</script>
