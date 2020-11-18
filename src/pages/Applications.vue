<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md cursor-pointer">
      <q-card v-ripple class="my-card ripple" clickable @click="GetSapRoster">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            {{ $t('application.sapTruckRoster.name') }}
          </div>
          <div class="text-subtitle2">
            {{ $t('application.sapTruckRoster.shortDescription') }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const GetSapRoster = () => {
      console.log('get SAP roster clicked')
    }
    return { GetSapRoster }
  },
})
</script>
