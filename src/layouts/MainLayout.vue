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
import { ENVIRONMENT } from 'src/environment'

export default defineComponent({
  setup(_, { root }) {
    const { mainNavigationLinks } = useMainNavigationLinks(root)

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
