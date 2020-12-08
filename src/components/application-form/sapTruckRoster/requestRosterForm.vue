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

export default defineComponent({
  setup(_, { emit }) {
    const { t } = useI18n()
    const { requiredRule } = useValidationRules()
    const submitted = ref(false)
    const showTruckId = ref(false)
    const question = ref()
    const answer = ref<string>()
    const label = ref()
    const qInputRef = ref<QInput>()

    const clearField = () => {
      answer.value = ''
      qInputRef.value?.resetValidation()
    }

    const onSubmit = () => {
      console.log('form submitted')
      submitted.value = true
      emit('form-submitted', {
        driverId: driverId.value,
        truckId: truckId.value,
      })
    }
    const onReset = () => {
      console.log('form reset')
      showTruckId.value = false
      answer.value = ''
    }

    /*
:rules="[
  (val) =>
  (val &&
    val.length > 3 &&
    val.length < 13 &&
    /[a-zA-Z]/g.test(val)) ||
  t('application.sapTruckRoster.error.truckId'),]

:rules="[
    (val) =>
      (val && val > 9799999999 && val < 9999999999) ||
      t('application.sapTruckRoster.error.driverId'),
  ]"
*/

    const driverRule = (val: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`driverRule val: ${val}`)

          resolve(true)
          //     --> content is valid
          //  resolve(false)
          //     --> content is NOT valid, no error message
          //  resolve(error_message)
          //     --> content is NOT valid, we have error message
          // resolve(`${val} * Required`)
          // resolve(`${val} ${t('application.sapTruckRoster.error.driverId')}`)
        }, 1000)
      })
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
        // return [requiredRule, driverRule]
        return []
      }
    })

    const truckId = computed(() => (showTruckId.value ? answer.value : ''))
    const driverId = computed(() => (!showTruckId.value ? answer.value : ''))

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
