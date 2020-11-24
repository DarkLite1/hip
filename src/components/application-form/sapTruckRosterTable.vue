<template>
  <p>nothing yet</p>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'ApplicationForm',
  setup() {
    const availableDispatchGroupNames = ref(false)

    return { availableDispatchGroupNames }
  },
})
</script>
