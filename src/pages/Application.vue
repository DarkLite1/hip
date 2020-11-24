<template>
  <div v-if="$props.appId" class="q-pa-md">
    <!-- appId: {{ appId }} -->
    <h6>{{ application.name }}</h6>
    <component :is="application.formComponentName"> </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useApplications } from 'src/composables/useApplications'

export default defineComponent({
  name: 'Application',
  props: {
    appId: {
      type: String,
      required: false,
    },
  },
  setup(props, { root }) {
    if (!props.appId) {
      console.error('No application ID provided to load the correct form')
      ;void (async () => await root.$router.push({ path: 'applications' }))()
      return
    }

    const { getApplication } = useApplications(root)
    const application = getApplication(props.appId)
    return { application }
  },
  components: {
    appApplicationFormTest: () =>
      import('src/components/ApplicationFormTest.vue'),
    appApplicationFormSamTruckRoster: () =>
      import('src/components/ApplicationFormSapTruckRoster.vue'),
  },
})
</script>
