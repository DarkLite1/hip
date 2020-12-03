import { useI18n } from 'vue-i18n-composable'

import { computed, reactive, ref, Ref } from '@vue/composition-api'

interface IApplication {
  [key: string]: {
    name: Ref
    shortDescription: Ref
    formComponentName: string
  }
}

export const useApplications = () => {
  const { t } = useI18n()

  const applications = reactive<IApplication>({
    1: {
      name: ref(t('application.sapTruckRoster.name')),
      shortDescription: ref(t('application.sapTruckRoster.shortDescription')),
      formComponentName: 'samTruckRoster',
    },
    2: {
      name: ref('Application 2'),
      shortDescription: ref('We do some cool stuff'),
      formComponentName: 'applicationTest',
    },
  })

  const getApplication = (id: string) => {
    return applications[id]
  }

  return {
    applications: computed(() => applications),
    getApplication,
  }
}
