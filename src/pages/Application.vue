<template>
  <div class="q-pa-md">
    <h6>{{ appName }}</h6>
    <component :is="formComponentName"> </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Application',
  props: {
    appName: {
      type: String,
      required: true,
    },
    formComponentName: {
      type: String,
      required: false,
    },
  },
  components: {
    appApplicationFormTest: () =>
      import('src/components/ApplicationFormTest.vue'),
    appApplicationFormSamTruckRoster: () =>
      import('src/components/ApplicationFormSapTruckRoster.vue'),
  },
})
</script>
