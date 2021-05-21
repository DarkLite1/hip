<template>
  <q-page padding>
    <h1>TEST</h1>
    <q-btn color="primary" label="Test" @click="onClick" />
    <!-- <p>the accountID is {{ accountId }}</p> -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { useAccount } from 'src/comp-functions/useAccount'
import { getGraphProfile } from 'src/services/graph/graphService'

export default defineComponent({
  setup() {
    // const { accountId } = useAccount()

    // return { accountId }
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
