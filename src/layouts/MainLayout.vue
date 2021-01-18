<template>
  <div v-if="loading" class="fixed-center">
    <q-spinner color="primary" size="15em" /><br />
    <q-icon
      class="fixed-center text-center"
      name="img:icons/favicon-96x96.png"
      size="6em"
    />
  </div>
  <q-layout v-else view="hHh lpR fFf">
    <app-header />
    <app-SidebarNavigationMenu
      v-if="isAuthenticated"
      :links="mainNavigationLinks"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
    <app-footer v-if="isAuthenticated" :links="mainNavigationLinks" />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useMainNavigationLinks } from 'src/composables/useNavigationLinks'
import { isAuthenticated } from 'src/store/authStore'
import { useApplicationPreferences } from 'src/composables/useApplicationPreferences'
import { useViewerQuery } from 'src/graphql/generated/operations'
import { loading } from 'src/store/authStore'
import { Dark } from 'quasar'

export default defineComponent({
  setup() {
    const { mainNavigationLinks } = useMainNavigationLinks()
    const { setDefaultPreferences, setPreference } = useApplicationPreferences()

    Dark.set(true)

    const { onResult, onError } = useViewerQuery(() => ({
      fetchPolicy: 'no-cache',
      enabled: isAuthenticated.value,
    }))

    onResult((result) => {
      void (async () => {
        try {
          // await new Promise((resolve) => setTimeout(resolve, 5000))
          if (result.data.viewer.preference) {
            await setPreference({ ...result.data.viewer.preference }, false)
          } else {
            await setDefaultPreferences()
          }
        } finally {
          loading.value = false
        }
      })()
    })

    onError((error) => {
      console.error('error retrieving viewer preferences: ', error)
      loading.value = false
    })

    return {
      loading,
      mainNavigationLinks,
      isAuthenticated,
    }
  },
  components: {
    appHeader: () => import('components/Header.vue'),
    appFooter: () => import('components/Footer.vue'),
    appSidebarNavigationMenu: () =>
      import('components/SidebarNavigationMenu.vue'),
  },
})
</script>

<style lang="scss">
.body--light {
  background: $grey-4;
}
</style>
