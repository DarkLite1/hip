<template>
  <div v-if="$props.appId" class="q-pa-md">
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
import { defineComponent } from 'vue'
import { useApplications } from 'src/composables/useApplications'
import { useRouter } from 'vue-router'

import samTruckRoster from 'src/components/application-form/sapTruckRoster/sapTruckRoster.vue'
import applicationTest from 'src/components/application-form/test.vue'

export default defineComponent({
  components: {
    samTruckRoster,
    applicationTest,
  },
  props: {
    appId: {
      type: String,
      required: false,
    },
    formPath: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const router = useRouter()

    if (!props.appId) {
      console.error('No application ID provided to load the correct form')
      void router.push({ path: 'applications' })
      return
    }

    const { getApplication } = useApplications()
    const application = getApplication(props.appId)

    return { application }
  },
})
</script>
