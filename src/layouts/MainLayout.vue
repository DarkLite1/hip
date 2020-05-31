<template>
  <q-layout view="hHh lpR fFf">
    <app-header />

    <app-SidebarNavigationMenu :links="mainNavigationLinks" />

    <q-page-container>
      <router-view />
    </q-page-container>

    <app-footer :links="mainNavigationLinks" />
  </q-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useMainNavigationLinks } from 'src/composables/useNavigationLinks'

export default defineComponent({
  setup(_, { root }) {
    const { mainNavigationLinks } = useMainNavigationLinks(root)

    return {
      mainNavigationLinks,
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
