<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <!-- <q-btn to="/" flat round dense style="background-color: black">
        <q-icon name="img:icons/favicon-96x96.png" />
      </q-btn> -->
      <!-- <q-btn to="/" flat round dense style="background-color: black">
        <q-icon name="img:img/HC-logo.svg" size="sm"/>
      </q-btn> -->
      <q-toolbar-title class="absolute-center">HIP</q-toolbar-title>
      <app-header-button />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    appHeaderButton: () => import('components/HeaderButton.vue'),
  },
})
</script>

<style lang="scss" scoped></style>
