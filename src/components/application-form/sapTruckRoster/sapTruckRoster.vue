<template>
  <div>
    <template v-if="showFormSubmitResult">
      <roster-query-result-search-filter-table
        :fromDate="fromDate"
        :driverId="driverId"
        :truckId="truckId"
        :drivers="driverIdQueryResult"
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
import { useI18n } from 'vue-i18n-composable'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
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
    rosterQueryResultSearchFilterTable: () =>
      import(
        'src/components/application-form/sapTruckRoster/rosterQueryResultSearchFilterTable.vue'
      ),
  },
})
</script>
