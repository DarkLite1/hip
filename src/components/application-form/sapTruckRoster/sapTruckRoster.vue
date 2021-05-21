<template>
  <div>
    <template v-if="showFormSubmitResult">
      <roster-query-result-search-filter-table
        :fromDate="fromDate"
        :drivers="driverIdQueryResult"
        :truckId="truckId"
        @navigate-back="showFormSubmitResult = false"
      />
      <roster-query-result
        :fromDate="fromDate"
        :truckId="truckId"
        :driverId="driverId"
        class="q-pt-md"
      />
    </template>
    <template v-else>
      <request-roster-form
        class="q-pb-sm"
        @form-submitted="formSubmitted"
        @driver-id-query-result="driverIdQueryResult = $event"
      />
      <hr />
      <list-dispatch-groups />
    </template>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { defineComponent, ref } from 'vue'

import listDispatchGroups from 'src/components/application-form/sapTruckRoster/listDispatchGroups.vue'
import requestRosterForm from 'src/components/application-form/sapTruckRoster/requestRosterForm.vue'
import rosterQueryResult from 'src/components/application-form/sapTruckRoster/rosterQueryResult.vue'
import rosterQueryResultSearchFilterTable from 'src/components/application-form/sapTruckRoster/rosterQueryResultSearchFilterTable.vue'

export default defineComponent({
  components: {
    listDispatchGroups,
    requestRosterForm,
    rosterQueryResult,
    rosterQueryResultSearchFilterTable,
  },
  setup() {
    const showFormSubmitResult = ref(false)
    const driverId = ref()
    const truckId = ref()
    const fromDate = ref()
    const driverIdQueryResult = ref()

    const formSubmitted = (formResponse: {
      fromDate: Date
      truckId: string
      driverId: string
    }) => {
      driverId.value = formResponse.driverId
      truckId.value = formResponse.truckId
      fromDate.value = formResponse.fromDate
      showFormSubmitResult.value = true
    }

    return {
      ...useI18n(),
      showFormSubmitResult,
      formSubmitted,
      truckId,
      driverId,
      fromDate,
      driverIdQueryResult,
    }
  },
})
</script>
