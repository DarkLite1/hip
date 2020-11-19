<template>
  <q-card
    v-ripple
    class="my-card bg-grey-3 cursor-pointer q-hoverable non-selectable"
    @click="$emit('selected-app', name)"
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
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.my-card {
  border-radius: 32px;
}
</style>
