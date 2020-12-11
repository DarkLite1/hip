<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset">
      <div class="q-gutter-sm" style="max-width: 300px">
        <template>
          <p class="text-bold">{{ question }}</p>
          <q-input
            :label="label"
            ref="qInputRef"
            v-model="answer"
            outlined
            hide-bottom-space
            debounce
            lazy-rules
            :rules="answerInputValidationRules"
          >
            <template v-if="answer" v-slot:append>
              <q-icon
                name="close"
                @click.stop="clearField()"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </template>

        <q-checkbox
          v-model="showTruckId"
          :label="t('application.sapTruckRoster.question.driverIdUnknown')"
        />

        <div>
          <q-btn :label="t('button.submit')" type="submit" color="primary" />
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
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { QInput } from 'quasar'
import { useValidationRules } from 'src/composables/useValidationRules'
import {
  useSapTruckRosterDriverQuery,
  useSapTruckRosterTruckQuery,
} from 'src/graphql/generated/operations'

export default defineComponent({
  setup(_, { emit }) {
    const { t } = useI18n()
    const {
      requiredFieldRule,
      minimumStringCharactersRule,
    } = useValidationRules()
    const submitted = ref(false)
    const showTruckId = ref(false)
    const question = ref()
    const answer = ref<string>('')
    const label = ref()
    const qInputRef = ref<QInput>()

    const truckId = computed(() => (showTruckId.value ? answer.value : ''))
    const driverId = computed(() => (!showTruckId.value ? answer.value : ''))
    const queryEnabled = ref<'driver' | 'truck'>()

    const { refetch: getDriverQuery } = useSapTruckRosterDriverQuery(
      () => ({ id: 'initialDriverQueryActivationCall' }),
      () => ({ enabled: queryEnabled.value === 'driver' && !!driverId.value })
    )

    const { refetch: getTruckQuery } = useSapTruckRosterTruckQuery(
      () => ({ id: 'initialTruckQueryActivationCall' }),
      () => ({ enabled: queryEnabled.value === 'truck' && !!truckId.value })
    )

    const driverRule = async (value: string) => {
      console.log('driverRule :', value)

      const result = await getDriverQuery({ id: value })

      if (result.data.driver.__typename === 'DriverArray') {
        console.log('driverRule result: ', result.data.driver.data)
        return result.data.driver.data?.length
          ? true
          : t('application.sapTruckRoster.error.driverId')
      }
      if (result.data.driver.__typename === 'ApiError') {
        return t('general.errorMessage', {
          message: `SAP API error code '(${result.data.driver.code})' message '${result.data.driver.message}'`,
        })
      }
    }

    const truckRule = async (value: string) => {
      const result = await getTruckQuery({ id: value })

      console.log('truckRule result: ', result)

      if (result.data.truck.__typename === 'TruckArray') {
        console.log('driverRule result: ', result.data.truck.data)
        return result.data.truck.data?.length
          ? true
          : t('application.sapTruckRoster.error.truckId')
      }
      if (result.data.truck.__typename === 'ApiError') {
        return t('general.errorMessage', {
          message: `SAP API error code '(${result.data.truck.code})' message '${result.data.truck.message}'`,
        })
      }
    }

    const answerInputValidationRules = computed(() => {
      if (showTruckId.value) {
        return [
          requiredFieldRule,
          (value: string) => minimumStringCharactersRule(value, 3),
          truckRule,
        ]
      } else {
        return [
          requiredFieldRule,
          (value: string) => minimumStringCharactersRule(value, 10),
          driverRule,
        ] as QInput['rules']
        // return []
      }
    })

    const clearField = () => {
      answer.value = ''
      qInputRef.value?.resetValidation()
    }
    const onSubmit = () => {
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

    watch(
      showTruckId,
      () => {
        qInputRef.value?.resetValidation()
        answer.value = ''

        if (showTruckId.value) {
          queryEnabled.value = 'truck'
          question.value = t('application.sapTruckRoster.question.truckId')
          label.value = t('application.sapTruckRoster.label.truckId')
        } else {
          queryEnabled.value = 'driver'
          question.value = t('application.sapTruckRoster.question.driverId')
          label.value = t('application.sapTruckRoster.label.driverId')
        }
      },
      {
        immediate: true,
      }
    )

    return {
      ...useI18n(),
      showTruckId,
      onReset,
      onSubmit,
      submitted,
      question,
      answer,
      label,
      qInputRef,
      clearField,
      answerInputValidationRules,
      driverId,
      truckId,
    }
  },
})
</script>
