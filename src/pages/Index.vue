<template>
  <q-page padding>
    <p>Welcome {{ profile.givenName }}</p>
    <q-btn color="primary" label="Test" @click="onClick" />
    <h2>All accounts:</h2>
    <h2 v-if="error">{{ error }}</h2>
    <h2 v-if="loading">Loading...</h2>
    <div v-else>
      Done loading

      <div v-for="account in allAccounts" :key="account.accountIdentifier">
        {{ account.name }}
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { profile } from 'src/store/graphStore'
import { useResult } from '@vue/apollo-composable'
import { useAllAccountsQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  setup() {
    const onClick = () => {
      console.log('clicked ')
    }

    const { result, loading, error } = useAllAccountsQuery()
    const allAccounts = useResult(result)

    return { onClick, profile, allAccounts, loading, error }
  },
})
</script>
