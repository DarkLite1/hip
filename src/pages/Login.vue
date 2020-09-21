<template class="body–dark">
  <q-page padding>
    <div class="fixed-center">
      <h3 class="q-my-none text-center text-uppercase">Welcome</h3>
      <!-- <h3 class="q-my-none text-center text-uppercase text-bold">Welcome</h3> -->
      <h5 class="q-mt-none text-center text-uppercase text-no-wrap">
        HeidelbergCement IT Portal
      </h5>
    </div>
    <!-- <div class="fixed-center q-mt-none">
      <h2 class="q-mt-none">Welcome</h2>
      <h3 class="q-mt-none">HeidelbergCement IT Portal</h3>
    </div> -->
    <!-- <h2 class="fixed-center q-mt-none">Welcome</h2>
    <h3 class="fixed-center q-mt-none">HeidelbergCement IT Portal</h3> -->
    <!-- <p class="fixed-center text-weight-bolder">Welcome</p> -->
    <!-- <h5>Hi there stranger. Would you mind telling us who you are?</h5> -->
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
