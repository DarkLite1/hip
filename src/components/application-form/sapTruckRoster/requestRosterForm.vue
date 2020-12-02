<template>
  <div class="q-pb-sm">
    <roster-query-result
      v-if="submitted"
      :truckId="truckId"
      :driverId="driverId"
    />
    <q-form v-else @submit="onSubmit" @reset="onReset" ref="form">
      <div class="q-gutter-sm" style="max-width: 300px">
        <template v-if="showTruckId">
          <p class="text-bold">
            {{ $t('application.sapTruckRoster.question.truckId') }}
          </p>
          <q-input
            :label="$t('application.sapTruckRoster.label.truckId')"
            ref="truckIdInput"
            v-model="truckId"
            outlined
            hide-bottom-space
            lazy-rules
            :rules="[
              (val) =>
                (val &&
                  val.length > 3 &&
                  val.length < 13 &&
                  /[a-zA-Z]/g.test(val)) ||
                $t('application.sapTruckRoster.error.truckId'),
            ]"
          >
            <template v-if="truckId" v-slot:append>
              <q-icon
                name="close"
                @click.stop="clearTruckId()"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </template>

        <template v-else>
          <p class="text-bold">
            {{ $t('application.sapTruckRoster.question.driverId') }}
          </p>
          <q-input
            :label="$t('application.sapTruckRoster.label.driverId')"
            ref="driverIdInput"
            v-model="driverId"
            outlined
            hide-bottom-space
            lazy-rules
            :rules="[
              (val) =>
                (val && val > 9799999999 && val < 9999999999) ||
                $t('application.sapTruckRoster.error.driverId'),
            ]"
          >
            <template v-if="driverId" v-slot:append>
              <q-icon
                name="close"
                @click.stop="clearDriverId()"
                class="cursor-pointer"
              />
            </template>
            <!-- <q-input
:label="$t('application.sapTruckRoster.label.driverId')"
v-model="driverId"
ref="driverIdInput"
outlined
clearable
clear-icon="close"
hide-bottom-space
lazy-rules
:rules="[
(val) =>
(val && val > 9799999999 && val < 9999999999) ||
$t('application.sapTruckRoster.error.driverId'),
]"
> -->
          </q-input>
        </template>

        <q-checkbox
          v-model="showTruckId"
          :label="$t('application.sapTruckRoster.question.driverIdUnknown')"
        />

        <div>
          <q-btn :label="$t('button.submit')" type="submit" color="primary" />
          <q-btn
            :label="$t('button.reset')"
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
import { defineComponent, ref, watch } from '@vue/composition-api'
import { QForm, QInput } from 'quasar'

export default defineComponent({
  setup() {
    const submitted = ref(false)
    const showTruckId = ref(false)
    const truckId = ref()
    const driverId = ref()
    const form = ref<QForm>()
    const driverIdInput = ref<QInput>()
    const truckIdInput = ref<QInput>()

    const clearDriverId = () => {
      driverId.value = null
      driverIdInput.value?.resetValidation()
    }
    const clearTruckId = () => {
      truckId.value = null
      truckIdInput.value?.resetValidation()
    }

    const onSubmit = () => {
      console.log('form submitted')
      submitted.value = true
    }
    const onReset = () => {
      console.log('form reset')
      truckId.value = null
      driverId.value = null
      showTruckId.value = false
    }

    watch(showTruckId, () => {
      form.value?.resetValidation()
    })

    return {
      showTruckId,
      onReset,
      onSubmit,
      driverId,
      truckId,
      submitted,
      form,
      clearDriverId,
      clearTruckId,
      driverIdInput,
      truckIdInput,
    }
  },
  components: {
    rosterQueryResult: () =>
      import(
        'src/components/application-form/sapTruckRoster/rosterQueryResult.vue'
      ),
  },
})
</script>
