<template>
  <q-card
    v-ripple
    bordered
    class="my-card cursor-pointer q-hoverable non-selectable"
    @click="applicationSelected(id)"
  >
    <span class="q-focus-helper"></span>
    <q-card-section>
      <div class="text-h6">
        {{ name }}
      </div>
      <div class="text-subtitle2">
        {{ shortDescription }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ApplicationCard',
  props: {
    name: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  setup() {
    const router = useRouter()

    const applicationSelected = async (id: string) => {
      await router.push({
        name: 'applicationForm',
        params: { appId: id },
      })
    }
    return { applicationSelected }
  },
})
</script>

<style lang="scss" scoped>
.my-card {
  border-radius: 32px;
}
</style>
