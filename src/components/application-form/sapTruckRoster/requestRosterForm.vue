<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <div class="q-gutter-sm" style="max-width: 300px">
      <request-roster-form-truck-input
        v-if="showTruckId"
        @update:truck-id="truckId = $event"
        :queryEnabled="queryEnabled.truck"
        :id="truckId"
      />
      <request-roster-form-driver-input
        v-else
        @update:driver-id="driverId = $event"
        @driver-id-query-result="queryResult.driver = $event"
        :queryEnabled="queryEnabled.driver"
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
    const queryEnabled = reactive({ driver: false, truck: false })
    const queryResult = reactive({ driver: null, truck: false })

    // watchEffect(() => {
    //   console.log('truckId: ', truckId.value)
    //   console.log('driverId: ', driverId.value)
    //   console.log('queryEnabled driver: ', queryEnabled.driver)
    //   console.log('queryEnabled truck: ', queryEnabled.truck)
    // })

    watch(showTruckId, () => {
      truckId.value = ''
      driverId.value = ''
    })

    const enableQuery = () => {
      if (showTruckId.value) queryEnabled.truck = true
      if (!showTruckId.value) queryEnabled.driver = true
    }

    const onSubmit = () => {
      console.log('form submit')
      submitted.value = true

      if (truckId.value) queryResult.driver = null

      emit('driver-id-query-result', queryResult.driver)

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
      queryEnabled,
      queryResult,
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
