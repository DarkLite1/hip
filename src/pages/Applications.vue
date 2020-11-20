<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md cursor-pointer">
      <app-application-card
        v-for="card in applicationCards"
        :key="card.name"
        :name="card.name"
        :shortDescription="card.shortDescription"
        @selected-app="display"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  setup(_, { root }) {
    const selectedComponent = ref()
    const applicationCards = reactive([
      {
        name: 'test',
        shortDescription: 'kiwi is great!',
      },
      {
        name: root.$t('application.sapTruckRoster.name'),
        shortDescription: root.$t(
          'application.sapTruckRoster.shortDescription'
        ),
      },
    ])

    const display = (value: string) => {
      console.log('selected app: ', value)
      selectedComponent.value = value
    }

    const GetSapRoster = () => {
      console.log('get SAP roster clicked')
    }
    return { applicationCards, GetSapRoster, selectedComponent, display }
  },
  components: {
    appApplicationCard: () => import('src/components/ApplicationCard.vue'),
  },
})
</script>
