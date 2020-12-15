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
      <div v-if="fromDate" class="row q-col-gutter-x-sm">
        <div class="col-12 col-sm-4">{{ t('general.fromDate') }}:</div>
        <div class="col-12 col-sm-8">{{ date }}</div>
      </div>
      <div v-if="driverId" class="row q-col-gutter-x-sm">
        <div class="col-12 col-sm-4">
          {{ t('application.sapTruckRoster.label.driverId') }}:
        </div>
        <div class="col-12 col-sm-8">{{ driverId }}</div>
      </div>
      <div v-if="truckId" class="row q-col-gutter-x-sm">
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
import { defineComponent, computed } from '@vue/composition-api'
import { convertToDate } from 'src/services/utils/utilsService'
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
  setup(props) {
    const { locale } = useI18n()

    const date = computed(() => {
      if (props.fromDate) {
        return convertToDate(props.fromDate, locale.value)
      }
      return 'NA'
    })

    return {
      ...useI18n(),
      date,
    }
  },
})
</script>
