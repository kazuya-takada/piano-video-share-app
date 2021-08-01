<template>
  <v-container>
    <v-card width="800px" class="mx-auto mt-5" elevation="1">
      <v-card-title>
        <h1 class="headline">
          プロフィール
        </h1>
        <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="#6abe83" class="white--text mr-3">
            編集
          </v-btn>
          <v-btn color="#f06966" class="white--text">
            削除
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <v-simple-table class="px-5 pb-15">
        <template v-slot:default>
          <tbody>
            <!-- <tr
          v-for="item in desserts"
          :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr> -->
            <tr>
              <th class="body-1 font-weight-bold">名前</th>
              <td class="body-1">test</td>
            </tr>
            <tr>
              <th class="body-1 font-weight-bold">メールアドレス</th>
              <td class="body-1">test@test.com</td>
            </tr>
            <tr></tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({})
</script>
