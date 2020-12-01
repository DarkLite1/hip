<template>
  <div class="q-pb-sm">
    <p class="text-bold">
      {{ $t('application.sapTruckRoster.processedDispatchGroupTable.title') }}
      <q-btn
        color="primary"
        padding="xs sm"
        @click="refetch()"
        :loading="loading"
        icon="refresh"
        outline
      >
        <q-tooltip
          >The list is automatically updated every 15 minutes</q-tooltip
        >
      </q-btn>
    </p>

    <div v-if="loading">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else-if="error">Error: {{ error.message }}</div>

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

    <hr />
  </div>
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable'
import { defineComponent, watch } from '@vue/composition-api'
import { useRosterDispatchGroupQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  name: 'ApplicationForm',
  setup(_, context) {
    const { result, loading, error, refetch } = useRosterDispatchGroupQuery(
      () => {
        return { fromDate: new Date('2020-10-28') }
      },
      {
        pollInterval: 15 * 60 * 1000, // every 15 min
      }
    )
    // const { result, loading, error } = useRosterDispatchGroupQuery(() => {
    //   return { fromDate: new Date() }
    // })

    const convertDate = (
      isoDate: string,
      locale = context.root.$i18n.locale
    ) => {
      const date = new Date(isoDate)

      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }

      return date.toLocaleDateString(locale, options)
    }

    const dispatchGroups = useResult(
      result,
      [],
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      (data) => data.rosterDispatchGroup.data
    )

    watch(result, () => {
      console.log('result.value: ', result.value)
    })

    watch(dispatchGroups, () => {
      console.log('dispatchGroups.value: ', dispatchGroups.value)
    })

    return { dispatchGroups, loading, error, convertDate, refetch }
  },
})
</script>
