<template>
  <q-card
    v-ripple
    class="my-card bg-grey-3 cursor-pointer q-hoverable non-selectable"
    @click="applicationSelected(name, formComponentName)"
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
import { defineComponent } from '@vue/composition-api'

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
    formComponentName: {
      type: String,
      required: true,
    },
  },
  setup(_, { root }) {
    const applicationSelected = async (
      name: string,
      formComponentName: string
    ) => {
      await root.$router.push({
        name: 'application',
        params: { appName: name, formComponentName: formComponentName },
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
