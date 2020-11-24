<template>
  <div>
    <div class="q-gutter-md" style="max-width: 300px">
      <q-input v-if="showTruckId" outlined label="Truck ID" />
      <q-input v-else outlined label="Driver ID" />
      <q-checkbox v-model="showTruckId" label="I don't know my driver ID" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'ApplicationForm',
  setup() {
    const showTruckId = ref(false)

    return { showTruckId }
  },
})
</script>
