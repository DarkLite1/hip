<template>
  <div class="q-pa-md">
    <p>Main form</p>
    <component :is="selectedForm"> </component>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ApplicationForm',
  props: {
    applicationName: {
      type: String,
      required: true,
    },
  },
  setup(props, { root }) {
    const selectedForm = computed(() => {
      switch (props.applicationName) {
        case root.$t('application.sapTruckRoster.name'):
          return 'appApplicationFormSamTruckRoster'
        case 'test':
          return 'appApplicationFormTest'
        default:
          return 'Form not registered'
      }
    })
    return { selectedForm }
  },
  components: {
    appApplicationFormTest: () =>
      import('src/components/ApplicationFormTest.vue'),
    appApplicationFormSamTruckRoster: () =>
      import('src/components/ApplicationFormSapTruckRoster.vue'),
  },
})
</script>
