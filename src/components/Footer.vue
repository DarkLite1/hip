<template>
  <q-footer elevated class="bg-priary text-light q-pr-md">
    <q-tabs class="lt-sm">
      <q-route-tab
        v-for="link in links"
        :key="link.name"
        :name="link.name"
        :to="link.to"
        :label="link.label"
        exact
      />
    </q-tabs>
  </q-footer>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: false
    }
  }
}
</script>
