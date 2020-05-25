<template>
  <q-page padding>
    <h1>Home</h1>
    <q-btn color="primary" label="Test" @click="onClick" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { getGraphProfile } from 'src/services/graph/graphService'

export default defineComponent({
  setup() {
    const onClick = () => {
      getGraphProfile()
        .then((response) => {
          console.log('response.data  ', response.data)
        })
        .catch(console.log.bind(console))
    }

    return { onClick }
  },
})
</script>
