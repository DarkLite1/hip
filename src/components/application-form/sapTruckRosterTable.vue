<template>
  <div class="q-pb-sm">
    <p class="text-bold">
      {{ $t('application.sapTruckRoster.processedDispatchGroupTable.title') }}
    </p>

    <div class="q-pb-md" style="max-width: 500px">
      <p>Monday (30 November)</p>
      <div class="q-gutter-xs">
        <q-btn color="secondary" label="AAA" v-for="n in 7" :key="`xs-${n}`" />
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'ApplicationForm',
  setup() {
    const availableDispatchGroupNames = reactive([
      {
        date: '2020-10-28',
        despatchGroup: 'AAAA',
      },
      {
        date: '2020-11-03',
        despatchGroup: 'BBBB',
      },
      {
        date: '2020-11-18',
        despatchGroup: 'CCCC',
      },
      {
        date: '2020-11-24',
        despatchGroup: 'DDDD',
      },
    ])

    return { availableDispatchGroupNames }
  },
})
</script>
