<template>
  <div class="q-pb-sm">
    <p class="text-bold">
      {{ t('application.sapTruckRoster.rosterQueryResult.title') }}
    </p>

    <p>fromDate: {{ convertToDate(fromDate, locale) }}</p>
    <p>driverId: {{ driverId }}</p>
    <p>truckId: {{ truckId }}</p>

    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="apiError">Error: {{ apiError.message }}</div>

    <div v-else-if="trips" style="max-width: 500px">
      <table
        v-for="trip of trips"
        :key="trip.startPlantLoadingDateTime"
        class="q-pb-md"
      >
        <tr>
          <th>Date</th>
          <td>{{ trip.date }}</td>
        </tr>
        <tr>
          <th>Time</th>
          <td>{{ trip.time }}</td>
        </tr>
        <tr>
          <th>DriverId</th>
          <td>{{ trip.driverId }}</td>
        </tr>
        <tr>
          <th>TruckId</th>
          <td>{{ trip.truckId }}</td>
        </tr>
        <tr>
          <th>Plant name</th>
          <td>{{ trip.plantName }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n-composable'
import { useResult } from '@vue/apollo-composable'
import { computed, defineComponent } from '@vue/composition-api'
import {
  Roster,
  useSapTruckRosterRosterQuery,
} from 'src/graphql/generated/operations'
import { convertToDate, convertToTime } from 'src/services/utils/utilsService'

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
    const { locale } = useI18n()

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

    const rosterQueryResult = useResult(result, [], (data) => {
      if (data.roster.__typename === 'RosterArray') return data.roster.data
    })

    const trips = computed(() => {
      if (!rosterQueryResult.value) return []

      const trips = (rosterQueryResult.value as Roster[]).map((obj) => ({
        ...obj,
        date: (() => {
          if (obj.startPlantLoadingDateTime) {
            return convertToDate(obj.startPlantLoadingDateTime, locale.value)
          }
        })(),
        time: (() => {
          if (obj.startPlantLoadingDateTime) {
            return convertToTime(obj.startPlantLoadingDateTime, locale.value)
          }
        })(),
      }))

      return trips
    })

    const apiError = useResult(result, null, (data) => {
      if (data.roster.__typename === 'ApiError') {
        return data.roster
      }
    })

    return {
      ...useI18n(),
      convertToDate,
      convertToTime,
      apiError,
      // RosterQueryResult,
      trips,
      error,
      loading,
    }
  },
})
</script>

<style lang="scss" scoped>
table {
  th {
    text-align: left;
  }
}
</style>
