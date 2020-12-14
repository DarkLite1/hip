<template>
  <div>
    <p class="text-bold">
      {{ t('application.sapTruckRoster.question.driverId') }}
    </p>
    <q-input
      :label="t('application.sapTruckRoster.label.driverId')"
      ref="qInputRef"
      v-model="driverId"
      outlined
      hide-bottom-space
      debounce
      lazy-rules="ondemand"
      :rules="validationRules"
      @click="resetValidation"
    >
      <!-- filled -->
      <!-- mask="##########"
            fill-mask -->
      <!-- placeholder="9800000000" -->
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
import {
  computed,
  defineComponent,
  onUnmounted,
  ref,
  watchEffect,
} from '@vue/composition-api'
import { QInput } from 'quasar'
import { useValidationRules } from 'src/composables/useValidationRules'
import { useSapTruckRosterDriverQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  props: {
    queryEnabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const {
      requiredFieldRule,
      minimumStringCharactersRule,
    } = useValidationRules()

    const driverId = ref()
    const question = ref()
    const qInputRef = ref<QInput>()

    watchEffect(() => {
      emit('update:driver-id', driverId.value)
    })

    onUnmounted(() => {
      emit('update:driver-id', '')
    })

    const { refetch } = useSapTruckRosterDriverQuery(
      () => ({ id: 'initialDriverQueryActivationCall' }),
      () => ({ enabled: props.queryEnabled })
    )

    const driverRule = async (value: string) => {
      const result = await refetch({ id: value })
      if (result.data.driver.__typename === 'DriverArray') {
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
        (value: string) => minimumStringCharactersRule(value, 10),
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
      question,
      qInputRef,
      clearField,
      validationRules,
      driverId,
    }
  },
})
</script>
