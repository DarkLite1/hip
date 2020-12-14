<template>
  <div>
    <p class="text-bold">
      {{ t('application.sapTruckRoster.question.truckId') }}
    </p>
    <q-input
      :label="t('application.sapTruckRoster.label.truckId')"
      ref="qInputRef"
      v-model="truckId"
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
      <template v-if="truckId" v-slot:append>
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
import { useSapTruckRosterTruckQuery } from 'src/graphql/generated/operations'

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

    const truckId = ref()
    const question = ref()
    const qInputRef = ref<QInput>()

    watchEffect(() => {
      emit('update:truckId', truckId.value)
    })

    onUnmounted(() => {
      emit('update:truckId', '')
    })

    const { refetch } = useSapTruckRosterTruckQuery(
      () => ({ id: 'initialTruckQueryActivationCall' }),
      () => ({ enabled: props.queryEnabled })
    )

    const truckRule = async (value: string) => {
      const result = await refetch({ id: value })
      if (result.data.truck.__typename === 'TruckArray') {
        return (
          result.data.truck.data?.length ||
          t('application.sapTruckRoster.error.truckId')
        )
      }
      if (result.data.truck.__typename === 'ApiError') {
        return t('general.errorMessage', {
          message: `SAP API error code '(${result.data.truck.code})' message '${result.data.truck.message}'`,
        })
      }
    }

    const validationRules = computed(() => {
      return [
        requiredFieldRule,
        (value: string) => minimumStringCharactersRule(value, 3),
        truckRule,
      ]
    })

    const clearField = () => {
      truckId.value = ''
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
      truckId,
    }
  },
})
</script>
