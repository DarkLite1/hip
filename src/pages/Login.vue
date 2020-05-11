<template>
  <q-page padding>
    <h3>Login</h3>
    <h5>Hi there stranger. Would you mind telling us who you are?</h5>
    <p>Click on the login button on the to right corner</p>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('auth', ['isAuthenticated']),
  created() {
    if (this.isAuthenticated) {
      this.$router.push('/')
    }
  },
}
</script>
