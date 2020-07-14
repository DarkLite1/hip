<template>
  <q-page padding>
    <p>Welcome {{ profile.givenName }}</p>
    <q-btn color="primary" label="Test" @click="onClick" />
    <h2>All accounts:</h2>
    <h2 v-if="loading">Loading...</h2>
    <div v-else>
      Done loading

      <div v-for="account in allAccounts" :key="account.accountIdentifier">
        {{ account }}
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import { profile } from 'src/store/graphStore'
import gql from 'graphql-tag'
// import allAccounts from 'src/graphql/allAccounts.query graphql'
// import allAccounts from 'src/graphql/allAccounts.query.gql'
// import allAccounts from 'src/graphql/allAccounts.query.gql'

export default defineComponent({
  setup() {
    const onClick = () => {
      console.log('clicked ')
    }

    // const { result, loading } = useQuery(allAccounts)
    const allAccountsQuery = gql`
      query allAccounts {
        accounts {
          accountIdentifier
        }
      }
    `

    const { result, loading } = useQuery(allAccountsQuery)
    const allAccounts = useResult(result)

    return { onClick, profile, allAccounts, loading }
  },
})
</script>
