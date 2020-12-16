<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <div class="q-gutter-sm" style="max-width: 300px">
      <request-roster-form-truck-input
        v-if="showTruckId"
        @update:truck-id="truckId = $event"
        :queryEnabled="query.truck.enabled"
        :id="truckId"
      />
      <request-roster-form-driver-input
        v-else
        @update:driver-id="driverId = $event"
        @driver-id-query-result="query.driver.result = $event"
        :queryEnabled="query.driver.enabled"
        :id="driverId"
      />
      <q-checkbox
        v-model="showTruckId"
        :label="t('application.sapTruckRoster.question.driverIdUnknown')"
      />
      <div>
        <q-btn
          :label="t('button.submit')"
          type="submit"
          color="primary"
          @click="enableQuery"
        />
        <q-btn
          :label="t('button.reset')"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n-composable'
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'

export default defineComponent({
  setup(_, { emit }) {
    const submitted = ref(false)
    const showTruckId = ref(false)
    const driverId = ref('')
    const truckId = ref('')
    const query = reactive({
      driver: { enabled: false, result: null },
      truck: { enabled: false, result: null },
    })

    watch(showTruckId, () => {
      truckId.value = ''
      driverId.value = ''
    })

    const enableQuery = () => {
      if (showTruckId.value) query.truck.enabled = true
      if (!showTruckId.value) query.driver.enabled = true
    }

    const onSubmit = () => {
      submitted.value = true

      if (truckId.value) query.driver.result = null
      emit('driver-id-query-result', query.driver.result)

      emit('form-submitted', {
        // fromDate: new Date(),
        fromDate: new Date('2020-10-24'),
        driverId: driverId.value,
        truckId: truckId.value,
      })
    }
    const onReset = () => {
      showTruckId.value = false
      truckId.value = ''
      driverId.value = ''
    }

    return {
      ...useI18n(),
      showTruckId,
      onReset,
      onSubmit,
      submitted,
      driverId,
      truckId,
      enableQuery,
      query,
    }
  },
  components: {
    requestRosterFormTruckInput: () =>
      import(
        'src/components/application-form/sapTruckRoster/requestRosterFormTruckInput.vue'
      ),
    requestRosterFormDriverInput: () =>
      import(
        'src/components/application-form/sapTruckRoster/requestRosterFormDriverInput.vue'
      ),
  },
})
</script>
