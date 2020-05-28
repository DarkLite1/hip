<template>
  <q-page padding>
    <p>Welcome {{ profile.givenName }}</p>
    <q-btn color="primary" label="Test" @click="onClick" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { setGraphProfile, profile } from 'src/store/graphStore'

export default defineComponent({
  setup() {
    const onClick = () => {
      setGraphProfile()
      console.log('cliked ')
    }

    return { onClick, profile }
  },
})
</script>
