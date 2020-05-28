<template>
  <q-page padding>
    <p>Welcome {{ profile.givenName }}</p>
    <q-btn color="primary" label="Test" @click="onClick" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useGraph } from 'src/composables/useGraph'

export default defineComponent({
  setup() {
    const { profile } = useGraph()
    const onClick = () => {
      console.log('cliked ')
    }

    return { onClick, profile }
  },
})
</script>
