<template>
  <div>
    <template v-if="showFormSubmitResult">
      <q-btn
        outline
        color="primary"
        :label="t('button.back')"
        icon="arrow_back_ios"
        @click="showFormSubmitResult = false"
      />
      <roster-query-result
        :truckId="truckId"
        :driverId="driverId"
        class="q-pt-md"
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
import { useI18n } from 'vue-i18n-composable'
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
      driverId.value = formResponse.driverId
      truckId.value = formResponse.truckId
      showFormSubmitResult.value = true
    }

    return {
      ...useI18n(),
      showFormSubmitResult,
      formSubmitted,
      truckId,
      driverId,
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
  },
})
</script>
