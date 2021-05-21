import { useI18n } from 'vue-i18n'
import { computed, reactive } from 'vue'
import { TranslateResult } from 'vue-i18n'

interface IApplication {
  [key: string]: {
    name: TranslateResult
    shortDescription: TranslateResult
    formComponentName: string
  }
}

export const useApplications = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t } = useI18n()

  const applications = reactive<IApplication>({
    1: {
      name: t('application.sapTruckRoster.name'),
      shortDescription: t('application.sapTruckRoster.shortDescription'),
      formComponentName: 'samTruckRoster',
    },
    // 2: {
    //   name: t('Application 2'),
    //   shortDescription: t('We do some cool stuff'),
    //   formComponentName: 'applicationTest',
    // },
  })

  const getApplication = (id: string) => {
    return applications[id]
  }

  return {
    applications: computed(() => applications),
    getApplication,
  }
}
