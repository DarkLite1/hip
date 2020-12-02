<template>
  <div>
    <available-dispatch-groups />
    <hr />
    <requestRosterForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    availableDispatchGroups: () =>
      import(
        'src/components/application-form/sapTruckRoster/availableDispatchGroups.vue'
      ),
    requestRosterForm: () =>
      import(
        'src/components/application-form/sapTruckRoster/requestRosterForm.vue'
      ),
  },
})
</script>
