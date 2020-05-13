<template>
  <q-page padding>
    <h1>TEST</h1>
    <q-btn color="primary" label="Test" />
    <p>the accountID is {{ accountId }}</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import { useAccount } from 'src/comp-functions/useAccount'

export default defineComponent({
  setup() {
    // const { accountId } = useAccount()

    // return { accountId }
  },
})
</script>
