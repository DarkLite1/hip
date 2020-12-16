<template>
  <q-layout view="hHh lpR fFf">
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

<script>
import { defineComponent } from '@vue/composition-api'
import { useMainNavigationLinks } from 'src/composables/useNavigationLinks'
import { isAuthenticated } from 'src/store/authStore'
import { useApplicationPreferences } from 'src/composables/useApplicationPreferences'
import { useViewerQuery } from 'src/graphql/generated/operations'

export default defineComponent({
  setup() {
    const { mainNavigationLinks } = useMainNavigationLinks()
    const { setDefaultPreferences, setPreference } = useApplicationPreferences()

    const { onResult, onError } = useViewerQuery(() => ({
      fetchPolicy: 'no-cache',
      enabled: isAuthenticated.value,
    }))

    onResult((result) => {
      if (result.data.viewer.preference) {
        void setPreference({ ...result.data.viewer.preference }, false)
      } else {
        void setDefaultPreferences()
      }
    })

    onError((error) => {
      console.error('error retrieving viewer preferences: ', error)
    })

    return {
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
