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

    <!-- 
    <q-icon name="img:img/face.svg" size="9em" />
    <q-icon name="img:img/face.svg"  />

    <q-icon
      name="img:data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' height='140' width='500'><ellipse cx='200' cy='80' rx='100' ry='50' style='fill:yellow;stroke:purple;stroke-width:2' /></svg>"
    />

    <q-icon :name="matMenu" size="9em" />
    <q-icon name="face" size="9em" />

    <q-icon color="accent" size="5rem">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"
        />
      </svg>
    </q-icon> -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { profile } from 'src/store/graphStore'
import { useI18n } from 'vue-i18n-composable'
import { matMenu } from '@quasar/extras/material-icons'

export default defineComponent({
  setup() {
    console.log('MatMenu: ', matMenu)

    return { profile, ...useI18n(), matMenu }
  },
})
</script>
