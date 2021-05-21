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
import { defineComponent } from 'vue'
import { useApplications } from 'src/composables/useApplications'
import appApplicationCard from 'src/components/ApplicationCard.vue'

export default defineComponent({
  setup() {
    const { applications: applicationCards } = useApplications()

    return { applicationCards }
  },
  components: {
    appApplicationCard,
  },
})
</script>
