import {
  computed,
  reactive,
  SetupContext,
  ref,
  Ref,
} from '@vue/composition-api'

interface IApplication {
  [key: string]: {
    name: Ref
    shortDescription: Ref
    formComponentName: string
  }
}

export const useApplications = (root: SetupContext['root']) => {
  const applications = reactive<IApplication>({
    1: {
      name: ref(root.$t('application.sapTruckRoster.name')),
      shortDescription: ref(
        root.$t('application.sapTruckRoster.shortDescription')
      ),
      formComponentName: 'appApplicationFormSamTruckRoster',
    },
    2: {
      name: ref('Application 2'),
      shortDescription: ref('We do some cool stuff'),
      formComponentName: 'appApplicationFormTest',
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
