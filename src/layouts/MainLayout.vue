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
import { defineComponent, reactive, onMounted } from '@vue/composition-api'
// import { setAccountID } from './../comp-functions/useAuth'

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const mainNavigationLinks = reactive([
      {
        label: 'Home',
        name: 'home',
        to: '/',
        icon: 'mail_outline',
      },
      {
        label: 'Tickets',
        name: 'tickets',
        to: '/tickets',
        icon: 'mail_outline',
      },
      {
        label: 'Settings',
        name: 'settings',
        to: '/settings',
        icon: 'settings',
      },
    ])

    onMounted(() => {
      console.log('load mainLayout')
      // setAccountID()
    })

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
