<template>
  <q-page padding>
    <h3>Login</h3>
    <h5>Hi there stranger. Would you mind telling us who you are?</h5>
    <p>Click on the login button on the to right corner</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from '@vue/composition-api'
import { useAuth } from '../../src/comp-functions/useAuth'

const { isAuthenticated } = useAuth()

export default defineComponent({
  setup(props, context) {
    onBeforeMount(() => {
      if (isAuthenticated.value) {
        console.log('from ', context.root.$router)
        context.root.$router.push('/')
      }
    })
  },
})
</script>
