import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export const useMainNavigationLinks = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t } = useI18n()
  const mainNavigation = reactive([
    {
      label: computed(() => t('page.home.name')),
      name: 'home',
      to: '/',
      icon: 'home',
    },
    {
      label: computed(() => t('page.applications.name')),
      name: 'applications',
      to: '/applications',
      icon: 'widgets',
    },
    {
      label: computed(() => t('page.settings.name')),
      name: 'settings',
      to: '/settings',
      icon: 'settings',
    },
  ])

  // mainNavigation.push({
  //   label: computed(() => t('page.settings')),
  //   name: 'kiwi',
  //   to: '/settings',
  //   icon: 'settings',
  // })

  return {
    mainNavigationLinks: computed(() => mainNavigation),
  }
}
