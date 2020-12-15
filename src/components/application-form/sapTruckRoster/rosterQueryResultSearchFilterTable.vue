<template>
  <div class="row justify-left q-col-gutter-md">
    <div class="col-12 col-sm-3 col-md-2 col-lg-2">
      <q-btn
        outline
        color="primary"
        :label="t('button.back')"
        icon="arrow_back_ios"
        @click="$emit('navigate-back')"
      />
    </div>
    <div class="col-12 col-sm-8 col-md-6 col-lg-5">
      <div class="row q-col-gutter-x-sm">
        <div class="col-12 col-sm-4">{{ t('general.fromDate') }}:</div>
        <div class="col-12 col-sm-8">{{ fromDate }}</div>
      </div>
      <div class="row q-col-gutter-x-sm">
        <div class="col-12 col-sm-4">
          {{ t('application.sapTruckRoster.label.driverId') }}:
        </div>
        <div class="col-12 col-sm-8">{{ driverId }}</div>
      </div>
      <div class="row q-col-gutter-x-sm">
        <div class="col-12 col-sm-4">
          {{ t('application.sapTruckRoster.label.truckId') }}:
        </div>
        <div class="col-12 col-sm-8">{{ truckId }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n-composable'
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    fromDate: {
      type: Date,
      required: false,
    },
    driverId: {
      type: String,
      required: false,
    },
    truckId: {
      type: String,
      required: false,
    },
  },
  setup() {
    const showFormSubmitResult = ref(false)

    return {
      ...useI18n(),
      showFormSubmitResult,
    }
  },
})
</script>
