<template>
  <div>
    <q-btn
      @click="login"
      label="Login"
      icon-right="account_circle"
      :loading="loading"
      :disabled="disabled"
      flat
      class="absolute-right"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api'
  import { useAccount } from './../comp-functions/useAccount'

  export default defineComponent({
    setup() {
      const { login, loading , disabled} = useAccount()

      return { login, loading, disabled }
    },
  })
</script>


<style lang='scss' scoped>
</style>