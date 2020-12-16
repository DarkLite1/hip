<template>
  <q-footer elevated class="bg-primary text-light q-pr-md">
    <q-tabs class="lt-sm">
      <q-route-tab
        v-for="link in links"
        :key="link.name"
        :name="link.name"
        :to="link.to"
        :label="link.label.value"
        exact
      />
    </q-tabs>
  </q-footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { InterfaceMainNavigationLinks } from 'src/typings/navigation'

export default defineComponent({
  props: {
    links: {
      type: (Array as unknown) as PropType<InterfaceMainNavigationLinks[]>,
      required: true,
    },
  },
})
</script>
