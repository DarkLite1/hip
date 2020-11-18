<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md cursor-pointer">
      <q-card class="my-card" clickable @click="GetSapRoster">
        <q-card-section class="bg-primary text-white">
          <!-- <q-card-section class="bg-secondary text-white"> -->
          <div class="text-h6">SAP Truck Roster</div>
          <div class="text-subtitle2">Get the truck planning</div>
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
