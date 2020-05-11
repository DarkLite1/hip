<template>
  <q-page padding>
    <h1>Tickets</h1>
    <q-btn @click="setAccount('iwiiw')" color="primary" label="Test" />
    <p>the accountID is {{ accountId }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAccount } from 'src/comp-functions/useAccount'

export default defineComponent({
  setup() {
    const { setAccount, accountId } = useAccount()

    return { setAccount, accountId }
  },
})
</script>
