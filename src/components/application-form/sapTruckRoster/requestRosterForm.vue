<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="q-gutter-sm" style="max-width: 300px">
        <div>
          <q-intersection
            v-if="showTruckId"
            transition="flip-right"
            class="example-item"
          >
            <request-Roster-Form-Truck-Input
              @update:truckId="truckId = $event"
              :queryEnabled="queryEnabled.truck"
            />
          </q-intersection>
          <q-intersection v-else transition="flip-right" class="example-item">
            <request-Roster-Form-Driver-Input
              @update:driver-id="driverId = $event"
              :queryEnabled="queryEnabled.driver"
            />
          </q-intersection>
        </div>

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
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n-composable'
import {
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from '@vue/composition-api'
import { QInput } from 'quasar'

export default defineComponent({
  setup(_, { emit }) {
    const { t } = useI18n()
    const submitted = ref(false)
    const showTruckId = ref(false)
    const question = ref()
    const answer = ref<string>('')
    const label = ref()
    const qInputRef = ref<QInput>()

    const driverId = ref('')
    const truckId = ref('')
    const queryEnabled = reactive({ driver: false, truck: false })

    watchEffect(() => {
      console.log('truckId: ', truckId.value)
      console.log('driverId: ', driverId.value)
      console.log('queryEnabled driver: ', queryEnabled.driver)
      console.log('queryEnabled truck: ', queryEnabled.truck)
    })

    watch(
      showTruckId,
      () => {
        qInputRef.value?.resetValidation()
        answer.value = ''

        if (showTruckId.value) {
          question.value = t('application.sapTruckRoster.question.truckId')
          label.value = t('application.sapTruckRoster.label.truckId')
        } else {
          question.value = t('application.sapTruckRoster.question.driverId')
          label.value = t('application.sapTruckRoster.label.driverId')
        }
      },
      { immediate: true }
    )

    const clearField = () => {
      answer.value = ''
      qInputRef.value?.resetValidation()
    }
    const resetValidation = () => {
      qInputRef.value?.resetValidation()
    }
    const enableQuery = () => {
      console.log('enable query')
      if (showTruckId.value) queryEnabled.truck = true
      if (!showTruckId.value) queryEnabled.driver = true
    }

    const onSubmit = () => {
      console.log('form submit')

      submitted.value = true
      emit('form-submitted', {
        driverId: driverId.value,
        truckId: truckId.value,
      })
    }
    const onReset = () => {
      showTruckId.value = false
      answer.value = ''
    }

    return {
      ...useI18n(),
      resetValidation,
      showTruckId,
      onReset,
      onSubmit,
      submitted,
      question,
      answer,
      label,
      qInputRef,
      clearField,
      driverId,
      truckId,
      enableQuery,
      queryEnabled,
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
