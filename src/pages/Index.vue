<template>
  <q-page padding>
    <h1>Home</h1>
    <q-btn color="primary" label="Test" @click="onClick" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const onClick = () => {
      console.log('cliked ')
    }

    return { onClick }
  },
})
</script>
