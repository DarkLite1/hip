<template>
  <div>
    <p class="text-bold">
      {{ t('application.sapTruckRoster.processedDispatchGroupTable.title') }}
      <q-btn
        color="primary"
        padding="xs sm"
        @click="refetch()"
        :loading="loading"
        :disable="loading"
        icon="refresh"
        outline
      >
        <q-tooltip
          >The data is automatically updated every 15 minutes</q-tooltip
        >
      </q-btn>
    </p>

    <q-spinner v-if="loading" color="primary" size="3em" />
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else-if="apiError">
      API Error: {{ apiError.code }} {{ apiError.message }}
    </div>

    <div v-else-if="dispatchGroups" style="max-width: 500px">
      <div v-for="group of dispatchGroups" :key="group.date" class="q-pb-md">
        <p>{{ convertToDate(group.date, locale) }}</p>
        <div class="q-gutter-xs">
          <q-chip
            v-for="name in group.dispatchGroup"
            :key="name"
            text-color="white"
            icon="group"
            :label="name"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <q-icon name="mdi-account-off" size="100px" />
      <br />
      <br />
      {{ t('application.sapTruckRoster.error.noDispatchGroups') }}
    </div>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { useResult } from '@vue/apollo-composable'
import { Notify } from 'quasar'
import { defineComponent } from 'vue'
import { useSapTruckRosterDispatchGroupQuery } from 'src/graphql/generated/operations'
import { convertToDate } from 'src/services/utils/utilsService'

export default defineComponent({
  name: 'ApplicationForm',
  setup() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { t } = useI18n()
    const { result, loading, error, refetch } =
      useSapTruckRosterDispatchGroupQuery(
        () => ({
          fromDate: new Date(),
        }),
        {
          pollInterval: 15 * 60 * 1000, // every 15 min
          fetchPolicy: 'no-cache',
        }
      )

    const dispatchGroups = useResult(result, [], (data) => {
      if (data.rosterDispatchGroup.__typename === 'RosterDispatchGroupArray') {
        if (!data.rosterDispatchGroup.data?.length) return null
        return data.rosterDispatchGroup.data
      }
    })

    const apiError = useResult(result, null, (data) => {
      if (data.rosterDispatchGroup.__typename === 'ApiError') {
        Notify.create({
          type: 'negative',
          icon: 'error_outline',
          message: t('application.sapTruckRoster.error.sapDown'),
          timeout: 0,
          actions: [
            {
              label: t('button.dismiss'),
              color: 'white',
              handler: () => {
                /* ... */
              },
            },
          ],
          caption:
            data.rosterDispatchGroup.code +
            ' - ' +
            data.rosterDispatchGroup.message,
          // color: 'secondary',
        })
        return data.rosterDispatchGroup
      }
    })

    return {
      ...useI18n(),
      dispatchGroups,
      apiError,
      loading,
      error,
      convertToDate,
      refetch,
    }
  },
})
</script>

<style lang="scss" scoped>
.body--dark {
  .q-chip {
    background: $grey-9;
  }
}
.body--light {
  .q-chip {
    background: $teal-9;
    color: white;
  }
}
</style>
