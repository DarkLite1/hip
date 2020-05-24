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
import { useAccount } from './../comp-functions/useAuth'

export default defineComponent({
  setup(props, context) {
    const { login, loading, disabled } = useAccount(context)

    return { login, loading, disabled }
  },
})
</script>

<style lang="scss" scoped></style>
