<template>
  <div>
    <app-header-button-login v-if="!isAuthenticated" />
    <app-header-button-profile v-else />
  </div>
</template>


<script lang="ts">
  import { defineComponent } from '@vue/composition-api'
  import { useAuth } from '../../src/comp-functions/useAuth'

  export default defineComponent({
    setup() {
      const { isAuthenticated } = useAuth()

      return { isAuthenticated }
    },
    components: {
      appHeaderButtonLogin: () => import('src/components/HeaderButtonLogin.vue'),
      appHeaderButtonProfile: () =>
        import('src/components/HeaderButtonProfile.vue'),
    },
  })
</script>


<style lang='scss' scoped>
</style>