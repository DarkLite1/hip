<template>
  <q-page padding>
    <h3>My profile</h3>
    <q-btn label="Logout" color="primary" @click="logout" />
    <hr />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAccount } from '../../src/comp-functions/useAccount'

export default defineComponent({
  setup() {
    const { logout } = useAccount()

    return { logout }
  },
})
</script>