<template>
  <q-page padding>
    <h3>Login</h3>
    <h5>Hi there stranger. Would you mind telling us who you are?</h5>
    <p>Click on the login button on the to right corner</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from '@vue/composition-api'
import { useAccount } from '../../src/comp-functions/useAccount'

const { isAuthenticated } = useAccount()

export default defineComponent({
  setup(props, context) {
    onBeforeMount(() => {
      if (isAuthenticated.value) {
        context.root.$router.push('/')
      }
    })
  },
})
</script>
