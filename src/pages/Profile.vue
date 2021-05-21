<template>
  <q-page padding>
    <h3>My profile</h3>
    <q-btn label="Logout" color="primary" @click="logout" />
    <hr />
    <ul>
      <li v-for="(value, name) in account" :key="name.homeAccountId">
        {{ name }} : {{ value }}
      </li>
    </ul>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { account } from 'src/store/authStore'
import { logout } from 'src/services/auth/authService'

export default defineComponent({
  setup() {
    return { account, logout }
  },
})
</script>
