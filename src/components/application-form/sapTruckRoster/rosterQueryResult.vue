<template>
  <div class="q-pb-sm">
    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="apiError">Error: {{ apiError.message }}</div>

    <div v-else-if="dispatchGroups" style="max-width: 500px">
      <div v-for="group of dispatchGroups" :key="group.date" class="q-pb-md">
        <p>{{ convertDate(group.date) }}</p>
        <div class="q-gutter-xs">
          <q-btn
            v-for="name in group.dispatchGroup"
            :key="name"
            color="secondary"
            :label="name"
            rounded
            padding="xs sm"
            :ripple="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useSapTruckRosterRosterQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  props: {
    truckId: String,
    driverId: String,
  },
  setup(props) {
    const { result, loading, error } = useSapTruckRosterRosterQuery(
      () => {
        return {
          fromDate: new Date('2020-10-28'),
          truckId: props.truckId,
          driverId: props.driverId,
        }
      },
      {
        fetchPolicy: 'no-cache',
      }
    )

    return { result, loading, error }
  },
})
</script>
