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
            debounce
            hide-bottom-space
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
import { useSapTruckRosterDriverQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  setup(_, { emit }) {
    const { t } = useI18n()
    const { requiredRule } = useValidationRules()
    const submitted = ref(false)
    const showTruckId = ref(false)
    const question = ref()
    const answer = ref<string>('')
    const label = ref()
    const qInputRef = ref<QInput>()

    const truckId = computed(() => (showTruckId.value ? answer.value : ''))
    const driverId = computed(() => (!showTruckId.value ? answer.value : ''))

    const queryDriverId = ref(false)

    const { refetch: getDriverQuery } = useSapTruckRosterDriverQuery(
      () => ({ id: driverId.value }),
      () => ({ enabled: queryDriverId.value })
    )

    const driverRule = async (val: string) => {
      queryDriverId.value = true
      const result = await getDriverQuery({ id: val })

      if (result.data.driver.__typename === 'DriverArray') {
        return result.data.driver.data?.length
          ? true
          : t('application.sapTruckRoster.error.driverId')
      }
    }

    const truckRule = (val: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`${val} ${t('application.sapTruckRoster.error.truckId')}`)
        }, 1000)
      })
    }

    const answerInputValidationRules = computed(() => {
      if (showTruckId.value) {
        return [requiredRule, truckRule]
      } else {
        return [requiredRule, driverRule]
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
          question.value = t('application.sapTruckRoster.question.truckId')
          label.value = t('application.sapTruckRoster.label.truckId')
        } else {
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
