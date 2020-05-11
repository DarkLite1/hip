<template>
  <div>
    <app-header-button-login v-if="!isAuthenticated" />
    <app-header-button-profile v-else />
    <!-- <q-btn color="primary" label="Primary" /> -->
  </div>
</template>


<script lang="ts">
  import { defineComponent } from '@vue/composition-api'
  import { useAccount } from '../../src/comp-functions/useAccount'

  export default defineComponent({
    setup() {
      const { isAuthenticated } = useAccount()

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