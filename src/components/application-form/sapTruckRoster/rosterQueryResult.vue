<template>
  <div class="q-pb-sm">
    <p>fromDate: {{ fromDate }}</p>
    <p>driverId: {{ driverId }}</p>
    <p>truckId: {{ truckId }}</p>

    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="apiError">Error: {{ apiError.message }}</div>

    <div v-else-if="RosterQueryResult" style="max-width: 500px">
      <div
        v-for="trip of RosterQueryResult"
        :key="trip.startPlantLoadingDateTime"
        class="q-pb-md"
      >
        <p>startPlantLoadingDateTime: {{ trip.startPlantLoadingDateTime }}</p>
        <p>driverId: {{ trip.driverId }}</p>
        <p>truckId: {{ trip.truckId }}</p>
        <p>plantId: {{ trip.plantId }}</p>
        <p>plantName: {{ trip.plantName }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable'
import { defineComponent } from '@vue/composition-api'
import { useSapTruckRosterRosterQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  props: {
    fromDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
    truckId: {
      type: String,
      required: false,
    },
    driverId: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const { result, error, loading } = useSapTruckRosterRosterQuery(
      () => ({
        fromDate: props.fromDate,
        // truckId: props.truckId,
        // driverId: props.driverId,
      }),
      {
        fetchPolicy: 'no-cache',
      }
    )

    const RosterQueryResult = useResult(result, [], (data) => {
      if (data.roster.__typename === 'RosterArray') return data.roster.data
    })

    const apiError = useResult(result, null, (data) => {
      if (data.roster.__typename === 'ApiError') {
        return data.roster
      }
    })

    return { apiError, RosterQueryResult, error, loading }
  },
})
</script>
