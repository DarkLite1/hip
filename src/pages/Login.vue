<template>
  <q-page padding>
    <h3>Login</h3>
    <h5>Hi there stranger. Would you mind telling us who you are?</h5>
    <p>Click on the login button on the to right corner</p>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api'
import { isAuthenticated } from 'src/store/authStore'

export default defineComponent({
  setup(props, context) {
    watch(isAuthenticated, (isAuthenticated) => {
      if (isAuthenticated) {
        void context.root.$router.push('/')
      }
    })
  },
})
</script>
