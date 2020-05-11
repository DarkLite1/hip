<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title class="absolute-center">HC IT Portal</q-toolbar-title>
      <app-header-button />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api'

  export default defineComponent({
    components: {
      appHeaderButton: () => import('components/HeaderButton.vue'),
    }
  })
</script>

<style lang="scss" scoped>
</style>
