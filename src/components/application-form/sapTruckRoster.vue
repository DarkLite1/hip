<template>
  <q-form @submit="onSubmit" @reset="onReset">
    <div class="q-gutter-sm" style="max-width: 300px">
      <template v-if="showTruckId">
        <p class="text-bold">
          {{ $t('application.sapTruckRoster.question.truckId') }}
        </p>
        <q-input
          :label="$t('application.sapTruckRoster.label.truckId')"
          v-model="truckId"
          outlined
          hide-bottom-space
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length == 10) ||
              $t('application.sapTruckRoster.error.truckId'),
          ]"
        >
          <template v-if="truckId" v-slot:append>
            <q-icon name="close" @click="truckId = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </template>

      <template v-else>
        <p class="text-bold">
          {{ $t('application.sapTruckRoster.question.driverId') }}
        </p>
        <q-input
          :label="$t('application.sapTruckRoster.label.driverId')"
          v-model="driverId"
          outlined
          hide-bottom-space
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 3) ||
              $t('application.sapTruckRoster.error.driverId'),
          ]"
        >
          <template v-if="driverId" v-slot:append>
            <q-icon
              name="close"
              @click="driverId = ''"
              class="cursor-pointer"
            />
          </template>
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
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'ApplicationForm',
  setup() {
    const showTruckId = ref(false)
    const truckId = ref()
    const driverId = ref()

    const onSubmit = () => {
      console.log('form submitted')
    }
    const onReset = () => {
      console.log('form reset')
      truckId.value = null
      driverId.value = null
      showTruckId.value = false
    }

    return { showTruckId, onReset, onSubmit, driverId, truckId }
  },
})
</script>
