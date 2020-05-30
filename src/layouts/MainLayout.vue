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
import { defineComponent, computed } from '@vue/composition-api'
// import Vue from 'vue'

export default defineComponent({
  setup(_, context) {
    // const defaultState = () => {
    //   return {
    //     navigationLinks: () => {
    //       return [
    //         {
    //           label: context.root.$t('navigationMenu.home'),
    //           name: 'home',
    //           to: '/',
    //           icon: 'mail_outline',
    //         },
    //         {
    //           label: context.root.$t('navigationMenu.tickets'),
    //           name: 'tickets',
    //           to: '/tickets',
    //           icon: 'mail_outline',
    //         },
    //         {
    //           label: context.root.$t('navigationMenu.settings'),
    //           name: 'settings',
    //           to: '/settings',
    //           icon: 'settings',
    //         },
    //       ]
    //     },
    //   }
    // }

    // const state = reactive(defaultState())

    // state.navigationLinks.push({
    //   label: 'kiwi',
    //   name: 'kiwi',
    //   to: '/settings',
    //   icon: 'settings',
    // })

    // const mainNavigationLinks = reactive([
    //   {
        // label: (()=> context.root.$t('navigationMenu.home'))(),
      //   label: computed(()=> context.root.$t('navigationMenu.home')),
      //   name: 'home',
      //   to: '/',
      //   icon: 'mail_outline',
      // },
      // {
      //   label: computed(()=> context.root.$t('navigationMenu.tickets')),
      //   name: 'tickets',
      //   to: '/tickets',
      //   icon: 'mail_outline',
      // },
      // {
      //   label: computed(()=> context.root.$t('navigationMenu.settings')),
      //   name: 'settings',
      //   to: '/settings',
      //   icon: 'settings',
      // },
    // ])

    // const mainNavigationLinks = computed(() => mainNavigation)


    // const mainNavigation = reactive(() => {
    //   return [
    //     {
    //       label: context.root.$t('navigationMenu.home'),
    //       name: 'home',
    //       to: '/',
    //       icon: 'mail_outline',
    //     },
    //     {
    //       label: context.root.$t('navigationMenu.tickets'),
    //       name: 'tickets',
    //       to: '/tickets',
    //       icon: 'mail_outline',
    //     },
    //     {
    //       label: context.root.$t('navigationMenu.settings'),
    //       name: 'settings',
    //       to: '/settings',
    //       icon: 'settings',
    //     },
    //   ]
    // })

    // const mainNavigationLinks = computed(() => mainNavigation())

    // const mainNavigation = () => {
    //   return [
    //   {
    //     label: context.root.$t('navigationMenu.home'),
    //     name: 'home',
    //     to: '/',
    //     icon: 'mail_outline',
    //   },
    //   {
    //     label: context.root.$t('navigationMenu.tickets'),
    //     name: 'tickets',
    //     to: '/tickets',
    //     icon: 'mail_outline',
    //   },
    //   {
    //     label: context.root.$t('navigationMenu.settings'),
    //     name: 'settings',
    //     to: '/settings',
    //     icon: 'settings',
    //   },
    // ]
    // }

    // const mainNavigationLinks = computed(()=> mainNavigation())

    const mainNavigationLinks = computed(()=> [
      {
        label: context.root.$t('navigationMenu.home'),
        name: 'home',
        to: '/',
        icon: 'mail_outline',
      },
      {
        label: context.root.$t('navigationMenu.tickets'),
        name: 'tickets',
        to: '/tickets',
        icon: 'mail_outline',
      },
      {
        label: context.root.$t('navigationMenu.settings'),
        name: 'settings',
        to: '/settings',
        icon: 'settings',
      },
    ])

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
