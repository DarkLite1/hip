<template>
  <q-page padding>
    <div class="fixed-center">
      <h5 class="q-mt-none text-center text-uppercase">
        HeidelbergCement IT Portal
      </h5>
      <h5 class="q-tt-none text-center text-subtitle1">Please log in...</h5>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from '@vue/composition-api'
import { isAuthenticated } from 'src/store/authStore'

export default defineComponent({
  setup(props, context) {
    watchEffect(() => {
      if (isAuthenticated) void context.root.$router.push('/')
    })
  },
})
</script>
