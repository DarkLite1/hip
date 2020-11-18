<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md cursor-pointer">
      <q-card
        v-ripple
        class="my-card bg-grey-3 cursor-pointer q-hoverable non-selectable"
        @click="GetSapRoster"
      >
        <span class="q-focus-helper"></span>
        <q-card-section>
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

<style lang="scss" scoped>
.my-card {
  border-radius: 32px;
}
</style>
