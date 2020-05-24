<template>
  <q-page padding>
    <h3>My profile</h3>
    <q-btn label="Logout" color="primary" @click="logout" />
    <hr />
    <p>accountID: {{ accountID }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAccount } from '../../src/comp-functions/useAuth'

export default defineComponent({
  setup() {
    const { accountID, logout } = useAccount()

    return { accountID, logout }
  },
})
</script>