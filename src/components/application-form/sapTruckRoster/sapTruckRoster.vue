<template>
  <div>
    <template v-if="showFormSubmitResult">
      <div class="row justify-left q-col-gutter-md">
        <div class="col-12 col-sm-3 col-md-2 col-lg-2">
          <q-btn
            outline
            color="primary"
            :label="t('button.back')"
            icon="arrow_back_ios"
            @click="showFormSubmitResult = false"
          />
        </div>
        <div class="col-12 col-sm-8 col-md-6 col-lg-5">
          <div class="row q-col-gutter-x-sm">
            <div class="col-12 col-sm-4">{{ t('general.fromDate') }}:</div>
            <div class="col-12 col-sm-8">{{ fromDate }}</div>
          </div>
          <div class="row q-col-gutter-x-sm">
            <div class="col-12 col-sm-4">
              {{ t('application.sapTruckRoster.label.driverId') }}:
            </div>
            <div class="col-12 col-sm-8">{{ driverId }}</div>
          </div>
          <div class="row q-col-gutter-x-sm">
            <div class="col-12 col-sm-4">
              {{ t('application.sapTruckRoster.label.truckId') }}:
            </div>
            <div class="col-12 col-sm-8">{{ truckId }}</div>
          </div>
        </div>
      </div>

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
    const fromDate = ref()

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
      fromDate,
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
