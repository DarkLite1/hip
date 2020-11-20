import { computed, reactive, SetupContext, ref } from '@vue/composition-api'

export const useApplications = (root: SetupContext['root']) => {
  const applications = reactive({
    1: {
      name: ref(root.$t('application.sapTruckRoster.name')),
      shortDescription: ref(
        root.$t('application.sapTruckRoster.shortDescription')
      ),
      formComponentName: 'appApplicationFormSamTruckRoster',
    },
    2: {
      name: ref(root.$t('application.sapTruckRoster.name')),
      shortDescription: ref(
        root.$t('application.sapTruckRoster.shortDescription')
      ),
      formComponentName: 'appApplicationFormSamTruckRoster',
    },
    3: {
      name: ref('test'),
      shortDescription: ref('test short description'),
      formComponentName: 'appApplicationFormTest',
    },
  })

  return {
    applications: computed(() => applications),
  }
}
