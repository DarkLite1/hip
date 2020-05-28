<template>
  <q-page padding>
    <h3>My profile</h3>
    <q-btn label="Logout" color="primary" @click="logout" />
    <hr />
    <p>accountID: {{ accountId }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { accountId, logout } from 'src/store/authStore'

export default defineComponent({
  setup() {
    return { accountId, logout }
  },
})
</script>