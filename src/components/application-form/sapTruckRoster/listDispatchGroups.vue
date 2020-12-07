<template>
  <div class="q-pb-sm">
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
    <div v-else-if="apiError">Error: {{ apiError.message }}</div>

    <div v-else-if="dispatchGroups" style="max-width: 500px">
      <div v-for="group of dispatchGroups" :key="group.date" class="q-pb-md">
        <p>{{ convertDate(group.date, locale) }}</p>
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
import { useI18n } from 'vue-i18n-composable'
import { useResult } from '@vue/apollo-composable'
import { defineComponent } from '@vue/composition-api'
import { useSapTruckRosterDispatchGroupQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  name: 'ApplicationForm',
  setup() {
    const {
      result,
      loading,
      error,
      refetch,
    } = useSapTruckRosterDispatchGroupQuery(
      () => ({
        fromDate: new Date('2020-10-28'),
        // fromDate: new Date()
      }),
      {
        pollInterval: 15 * 60 * 1000, // every 15 min
        fetchPolicy: 'no-cache',
      }
    )

    const convertDate = (isoDate: string, locale: string) => {
      const date = new Date(isoDate)

      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }

      return date.toLocaleDateString(locale, options)
    }

    const dispatchGroups = useResult(result, [], (data) => {
      if (data.rosterDispatchGroup.__typename === 'RosterDispatchGroupArray') {
        return data.rosterDispatchGroup.data
      }
    })

    const apiError = useResult(result, null, (data) => {
      if (data.rosterDispatchGroup.__typename === 'ApiError') {
        return data.rosterDispatchGroup
      }
    })

    return {
      ...useI18n(),
      dispatchGroups,
      apiError,
      loading,
      error,
      convertDate,
      refetch,
    }
  },
})
</script>
