<template>
  <div>
    <app-header-button-login v-if="!isAuthenticated" />
    <app-header-button-profile v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isAuthenticated } from 'src/store/authStore'

import appHeaderButtonLogin from 'src/components/HeaderButtonLogin.vue'
import appHeaderButtonProfile from 'src/components/HeaderButtonProfile.vue'

export default defineComponent({
  setup() {
    return { isAuthenticated }
  },
  components: {
    appHeaderButtonLogin,
    appHeaderButtonProfile,
  },
})
</script>
