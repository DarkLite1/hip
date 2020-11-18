<template>
  <q-page padding>
    <p>{{ $t('general.welcome') }} {{ profile.givenName }}</p>
    <q-btn color="primary" label="Test" @click="onClick" />
    <h2>All accounts:</h2>
    <h2 v-if="loading">Loading...</h2>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="allAccounts">
      <div v-for="account in allAccounts" :key="account.accountIdentifier">
        {{ account.name }}
        {{ account.accountIdentifier }}
      </div>
    </div>
    <div v-else>No accounts found</div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { profile } from 'src/store/graphStore'
import { useAllAccountsQuery } from 'src/graphql/generated/operations'
import { useResult } from '@vue/apollo-composable'

export default defineComponent({
  setup() {
    const onClick = () => {
      console.log('clicked ')
    }

    const { result, loading, error } = useAllAccountsQuery()
    const allAccounts = useResult(result, null, (data) => data.accounts)

    return { onClick, profile, allAccounts, loading, error }
  },
})
</script>
