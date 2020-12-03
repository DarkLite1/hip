<template>
  <q-layout view="hHh lpR fFf">
    <div v-if="isAuthenticated">
      <div v-if="loading">Loading preferences...</div>
      <div v-if="error">{{ error }}</div>
      <div v-else>done</div>
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
import {
  useSetPreferenceDefaultMutation,
  useViewerQuery,
} from 'src/graphql/generated/operations'

export default defineComponent({
  setup() {
    const {
      loading: queryLoading,
      error: queryError,
      onResult: onQueryResult,
    } = useViewerQuery(() => ({
      enabled: isAuthenticated.value,
    }))

    const {
      mutate: setDefaultPreferences,
      loading: mutationLoading,
      error: mutationError,
    } = useSetPreferenceDefaultMutation({
      variables: {
        language: 'en-us',
        darkMode: false,
      },
    })

    onQueryResult((result) => {
      if (!result.data.viewer.preference) {
        console.log('MainLayout SET DEFAULT PREFERENCE')
        void setDefaultPreferences()
      }
    })

    const { mainNavigationLinks } = useMainNavigationLinks()

    return {
      mainNavigationLinks,
      isAuthenticated,
      loading: queryLoading || mutationLoading,
      error: queryError || mutationError,
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
