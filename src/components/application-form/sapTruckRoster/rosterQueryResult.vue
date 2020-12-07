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
      <div v-for="(value, name) in trips" :key="value">
        <p class="text-bold">{{ name }}</p>

        <table
          v-for="trip of value"
          :key="trip.startPlantLoadingDateTime"
          class="q-pb-md"
        >
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
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n-composable'
import { useResult } from '@vue/apollo-composable'
import { computed, defineComponent, watchEffect } from '@vue/composition-api'
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

    // const groupBy = <TItem>(
    //   items: TItem[],
    //   key: string
    // ): { [key: string]: TItem[] } =>
    //   items.reduce(
    //     (result, item) => ({
    //       ...result,
    //       [item[key]]: [...(result[item[key]] || []), item],
    //     }),
    //     {}
    //   )

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

      const tripsGroupedByDate = trips.reduce(
        (groups, item) => ({
          ...groups,
          [item.date as string]: [...((groups[item.date] || []) as []), item],
        }),
        {}
      )

      return tripsGroupedByDate
    })

    watchEffect(() => {
      console.log('trips grouped: ', trips.value)
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
