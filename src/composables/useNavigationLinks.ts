import { computed, reactive, SetupContext } from '@vue/composition-api'

export const useMainNavigationLinks = (root: SetupContext['root']) => {
  const mainNavigation = reactive([
    {
      label: computed(() => root.$t('navigationMenu.home')),
      name: 'home',
      to: '/',
      icon: 'home',
    },
    {
      label: computed(() => root.$t('navigationMenu.applications')),
      name: 'applications',
      to: '/applications',
      icon: 'widgets',
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
