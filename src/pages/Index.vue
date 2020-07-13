<template>
  <q-page padding>
    <p>Welcome {{ profile.givenName }}</p>
    <q-btn color="primary" label="Test" @click="onClick" />
    <h2>All accounts:</h2>
    <h2 v-if="loading">Loading...</h2>
    <h4 v-else>Done loading</h4>
    <p>{{ allAccounts }}</p>
    <div v-for="account in allAccounts" :key="account.accountIdentifier">
      {{ account.accountIdentifier }}
      {{ account }}
      <p> results </p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { profile } from 'src/store/graphStore'
import { useQuery, useResult } from '@vue/apollo-composable'
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

    console.log('query: ', allAccountsQuery)

    const { result, loading } = useQuery(allAccountsQuery)
    const allAccounts = useResult(result)

    watch(allAccounts, (allAccounts, prevAllAccounts) => {
      console.log('old: ', prevAllAccounts)
      console.log('new: ', allAccounts)
    })

    return { onClick, profile, allAccounts, loading }
  },
})
</script>
