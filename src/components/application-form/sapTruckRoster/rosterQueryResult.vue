<template>
  <div>
    <p class="text-bold">
      {{ t('application.sapTruckRoster.rosterQueryResult.title') }}
    </p>

    <q-spinner v-if="loading" color="primary" size="9em" />
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="apiError">
      Error: {{ apiError.code }} {{ apiError.message }}
    </div>
    <div v-else-if="trips" class="q-gutter-md row items-start">
      <q-list
        v-for="(dateCollection, date) in trips"
        :key="date"
        class="shadow-2 rounded-borders"
        style="max-width: 300px; width: 100%"
        bordered
      >
        <q-item class="q-pt-md">
          <q-tooltip>{{
            t('application.sapTruckRoster.label.date')
          }}</q-tooltip>
          <q-item-section avatar>
            <q-icon name="today" size="md" />
          </q-item-section>
          <q-item-section class="text-bold"> {{ date }} </q-item-section>
        </q-item>

        <q-item v-for="(trip, index) of dateCollection" :key="index">
          <q-item-section>
            <q-separator inset class="q-mb-md" />
            <table>
              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.time')
                }}</q-tooltip>
                <th><q-icon name="schedule" size="xs" /></th>
                <td>{{ trip.time }}</td>
              </tr>

              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.driverId')
                }}</q-tooltip>
                <th><q-icon name="person" size="xs" /></th>
                <td>{{ trip.driverFirstName }} {{ trip.driverLastName }}</td>
              </tr>
              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.truckId')
                }}</q-tooltip>
                <th><q-icon name="local_shipping" size="xs" /></th>
                <td>{{ trip.truckId }}</td>
              </tr>
              <tr>
                <q-tooltip>{{
                  t('application.sapTruckRoster.label.plantName')
                }}</q-tooltip>
                <th><q-icon name="mdi-factory" size="xs" /></th>
                <td>{{ trip.plantName }}</td>
              </tr>
            </table>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div v-else>
      <q-icon name="fas fa-parking" size="100px" />
      <q-icon name="mdi-tanker-truck" size="100px" />
      <q-icon name="alarm_off" size="100px" />
      <br />
      <br />
      {{ t('application.sapTruckRoster.error.noTripsPlanned') }}
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { useResult } from '@vue/apollo-composable'
import { defineComponent } from 'vue'
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
      default: () => new Date(),
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
        truckId: props.truckId,
        driverId: props.driverId,
      }),
      {
        fetchPolicy: 'no-cache',
      }
    )

    const trips = useResult(result, null, (data) => {
      if (data.roster.__typename === 'RosterArray') {
        if (!data.roster.data?.length) return null
        const trips = (data.roster.data as Roster[]).map((obj) => ({
          ...obj,
          date: (() => {
            if (!obj.startPlantLoadingDateTime) return 'NA'
            return convertToDate(obj.startPlantLoadingDateTime, locale.value)
          })(),
          time: (() => {
            if (!obj.startPlantLoadingDateTime) return 'NA'
            return convertToTime(obj.startPlantLoadingDateTime, locale.value)
          })(),
        }))

        return groupBy(trips, 'date')
      }
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
    text-align: center;
    width: 30px;
  }
}
.body--dark {
  .q-list {
    background: $grey-9;
  }
}
.body--light {
  .q-list {
    background: $teal-9;
    color: white;
    .q-separator {
      background: white;
    }
  }
}
</style>
