<template>
  <q-page padding>
    <div class="q-pa-md row items-start q-gutter-md cursor-pointer">
      <app-application-card
        v-for="(card, id) in applicationCards"
        :key="id"
        :name="card.name"
        :shortDescription="card.shortDescription"
        :id="id"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useApplications } from 'src/composables/useApplications'

export default defineComponent({
  setup(_, { root }) {
    const { applications: applicationCards } = useApplications(root)

    return { applicationCards }
  },
  components: {
    appApplicationCard: () => import('src/components/ApplicationCard.vue'),
  },
})
</script>
