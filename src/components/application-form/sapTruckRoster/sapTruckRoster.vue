<template>
  <div>
    <template v-if="showFormSubmitResult">
      <roster-query-result
        :truckId="truckId"
        :driverId="driverId"
        :fromDate="new Date('2020-10-24')"
      />
    </template>
    <template v-else>
      <request-roster-form class="q-pb-sm" @form-submitted="formSubmitted" />
      <hr />
      <list-dispatch-groups />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const showFormSubmitResult = ref(false)
    const driverId = ref()
    const truckId = ref()

    const formSubmitted = (formResponse: {
      truckId: string
      driverId: string
    }) => {
      console.log('form driver id: ', formResponse.driverId)
      console.log('form truck id: ', formResponse.truckId)

      driverId.value = formResponse.driverId
      truckId.value = formResponse.truckId
      showFormSubmitResult.value = true
    }

    return { showFormSubmitResult, formSubmitted, truckId, driverId }
  },
  components: {
    listDispatchGroups: () =>
      import(
        'src/components/application-form/sapTruckRoster/listDispatchGroups.vue'
      ),
    requestRosterForm: () =>
      import(
        'src/components/application-form/sapTruckRoster/requestRosterForm.vue'
      ),
    rosterQueryResult: () =>
      import(
        'src/components/application-form/sapTruckRoster/rosterQueryResult.vue'
      ),
  },
})
</script>
