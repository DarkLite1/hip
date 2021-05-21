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
import { defineComponent, watchEffect } from 'vue'
import { isAuthenticated } from 'src/store/authStore'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    watchEffect(() => {
      if (isAuthenticated.value) void router.push('/')
    })
  },
})
</script>
