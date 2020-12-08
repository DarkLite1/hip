<template>
  <div class="q-pb-md">
    <p class="text-bold">
      {{ t('application.sapTruckRoster.rosterQueryResult.title') }}
    </p>

    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="apiError">Error: {{ apiError.message }}</div>

    <div v-else-if="trips" class="q-gutter-md row items-start">
      <q-list
        v-for="(value, name) in trips"
        :key="name"
        class="bg-grey-10 text-white shadow-2 rounded-borders"
        style="max-width: 300px; width: 100%"
      >
        <q-item class="q-pt-md">
          <q-tooltip>{{
            t('application.sapTruckRoster.label.date')
          }}</q-tooltip>
          <q-item-section avatar>
            <q-icon name="today" size="md" />
          </q-item-section>
          <q-item-section class="text-bold"> {{ name }} </q-item-section>
        </q-item>

        <q-item v-for="trip of value" :key="trip.startPlantLoadingDateTime">
          <q-item-section>
            <q-separator dark inset class="q-mb-md" />
            <table>
              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.time')
                }}</q-tooltip>
                <q-icon name="schedule" size="xs" />
                <td>{{ trip.time }}</td>
              </tr>
              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.driverId')
                }}</q-tooltip>
                <q-icon name="person" size="xs" />
                <td>{{ trip.driverId }}</td>
              </tr>
              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.truckId')
                }}</q-tooltip>
                <q-icon name="local_shipping" size="xs" />
                <td>{{ trip.truckId }}</td>
              </tr>
              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.plantName')
                }}</q-tooltip>
                <q-icon name="local_parking" size="xs" />
                <td>{{ trip.plantName }}</td>
              </tr>
            </table>
          </q-item-section>
        </q-item>
      </q-list>
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
import {
  convertToDate,
  convertToTime,
  groupBy,
} from 'src/services/utils/utilsService'

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
          return 'NA'
        })(),
        time: (() => {
          if (obj.startPlantLoadingDateTime) {
            return convertToTime(obj.startPlantLoadingDateTime, locale.value)
          }
          return 'NA'
        })(),
      }))

      const tripsGroupedByDate = groupBy(trips, 'date')

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
