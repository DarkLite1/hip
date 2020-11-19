<template>
  <q-page padding>
    <app-application-form
      v-if="selectedComponent"
      :applicationName="selectedComponent"
    />

    <div v-else class="q-pa-md row items-start q-gutter-md cursor-pointer">
      <app-application-card
        v-for="card in applicationCards"
        :key="card.name"
        :name="card.name"
        :shortDescription="card.shortDescription"
        @selected-app="display"
      />

      <p>selected component: {{ selectedComponent }}</p>
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
    appApplicationForm: () => import('src/components/ApplicationForm.vue'),
    // appApplicationFormTest: () =>
    //   import('src/components/ApplicationFormTest.vue'),
    // appApplicationFormSamTruckRoster: () =>
    //   import('src/components/ApplicationFormSapTruckRoster.vue'),
  },
})
</script>
