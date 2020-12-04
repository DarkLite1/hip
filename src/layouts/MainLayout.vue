<template>
  <q-layout view="hHh lpR fFf">
    <div v-if="isAuthenticated">
      <!-- <div v-if="loading">Loading preferences...</div>
      <div v-if="error">{{ error }}</div>
      <div v-else>done</div> -->
    </div>
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
    const {
      startWatch,
      darkMode,
      language,
      setDefaultPreferences,
    } = useApplicationPreferences()
    startWatch()

    const { onResult, onError } = useViewerQuery(() => ({
      fetchPolicy: 'no-cache',
      enabled: isAuthenticated.value,
    }))

    onResult((result) => {
      console.log(
        'useApplicationPreferences onResult: ',
        result.data.viewer.preference
      )

      if (result.data.viewer.preference) {
        darkMode.value = result.data.viewer.preference.darkMode
        language.value = result.data.viewer.preference.language
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

<style lang="scss" scoped></style>
