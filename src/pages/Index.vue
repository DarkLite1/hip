<template>
  <q-page padding>
    <div>
      <div>
        <div class="text-h6 text-left">
          {{ t('general.welcome') }} {{ profile.givenName }}
        </div>
        <div class="q-py-sm q-my-md">
          We're still working on some good content here...
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { profile } from 'src/store/graphStore'
import { useI18n } from 'vue-i18n-composable'

export default defineComponent({
  setup() {
    return { profile, ...useI18n() }
  },
})
</script>
