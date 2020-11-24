<template>
  <div v-if="$props.appId" class="q-px-md">
    <div class="text-h6 q-pb-md">
      {{ application.name }}
    </div>
    <component
      v-if="application.formComponentName"
      :is="application.formComponentName"
    />
    <h3 v-else>No form available for application id {{ $props.appId }}</h3>
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
      void (async () => await root.$router.push({ path: 'applications' }))()
      return
    }

    const { getApplication } = useApplications(root)
    const application = getApplication(props.appId)
    return { application }
  },
  components: {
    appApplicationFormTest: () =>
      import('src/components/application-form/test.vue'),
    appApplicationFormSamTruckRoster: () =>
      import('src/components/application-form/sapTruckRoster.vue'),
  },
})
</script>
