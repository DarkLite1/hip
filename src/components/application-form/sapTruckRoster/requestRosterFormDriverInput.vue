<template>
  <div>
    <p class="text-bold" key="text">
      {{ t('application.sapTruckRoster.question.driverId') }}
    </p>
    <q-input
      :label="t('application.sapTruckRoster.label.driverId')"
      ref="qInputRef"
      mask="##########"
      v-model="driverId"
      :hint="t('application.sapTruckRoster.hint.driverId')"
      outlined
      hide-bottom-space
      debounce
      lazy-rules="ondemand"
      :rules="validationRules"
      @click="resetValidation"
    >
      <template v-if="driverId" v-slot:append>
        <q-icon
          name="close"
          @click.stop="clearField()"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n-composable'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { QInput } from 'quasar'
import { useValidationRules } from 'src/composables/useValidationRules'
import { useSapTruckRosterDriverQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  props: {
    queryEnabled: {
      type: Boolean,
    },
    id: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const { requiredFieldRule, exactStringLengthRule } = useValidationRules()

    const driverId = computed({
      get: () => props.id,
      set: (value) => emit('update:driver-id', value),
    })
    const qInputRef = ref<QInput>()

    const { refetch } = useSapTruckRosterDriverQuery(
      () => ({ id: 'initialDriverQueryActivationCall' }),
      () => ({ enabled: props.queryEnabled })
    )

    const driverRule = async (value: string) => {
      const result = await refetch({ id: value })
      if (result.data.driver.__typename === 'DriverArray') {
        if (result.data.driver.data?.length) {
          emit('driver-id-query-result', result.data.driver.data)
        }
        return (
          result.data.driver.data?.length ||
          t('application.sapTruckRoster.error.driverId')
        )
      }
      if (result.data.driver.__typename === 'ApiError') {
        return t('general.errorMessage', {
          message: `SAP API error code '(${result.data.driver.code})' message '${result.data.driver.message}'`,
        })
      }
    }

    const validationRules = computed(() => {
      return [
        requiredFieldRule,
        (value: string) => exactStringLengthRule(value, 10),
        driverRule,
      ]
    })

    const clearField = () => {
      driverId.value = ''
      qInputRef.value?.resetValidation()
    }
    const resetValidation = () => {
      qInputRef.value?.resetValidation()
    }

    return {
      ...useI18n(),
      resetValidation,
      qInputRef,
      clearField,
      validationRules,
      driverId,
    }
  },
})
</script>
