import { computed, reactive, SetupContext } from '@vue/composition-api'

export const useMainNavigationLinks = (root: SetupContext['root']) => {
  const mainNavigation = reactive([
    {
      label: computed(() => root.$t('navigationMenu.home')),
      name: 'home',
      to: '/',
      icon: 'mail_outline',
    },
    {
      label: computed(() => root.$t('navigationMenu.tickets')),
      name: 'tickets',
      to: '/tickets',
      icon: 'mail_outline',
    },
    {
      label: computed(() => root.$t('navigationMenu.settings')),
      name: 'settings',
      to: '/settings',
      icon: 'settings',
    },
  ])

  // mainNavigation.push({
  //   label: computed(() => root.$t('navigationMenu.settings')),
  //   name: 'kiwi',
  //   to: '/settings',
  //   icon: 'settings',
  // })

  return {
    mainNavigationLinks: computed(() => mainNavigation),
  }
}
