import { reactive, computed } from '@vue/composition-api'
import { Dark } from 'quasar'
import { useSetAppPreferenceMutation } from 'src/graphql/generated/operations'
import { useI18n } from 'vue-i18n-composable'

const defaultState = () => ({
  preference: {
    darkMode: true,
    language: 'en-us',
  },
})

const state = reactive(defaultState())

export const useApplicationPreferences = () => {
  const { locale } = useI18n()

  const { mutate } = useSetAppPreferenceMutation()

  const setPreference = async (
    preference: {
      darkMode?: boolean
      language?: string
    },
    option?: { saveToBackend?: boolean }
  ) => {
    if (preference.darkMode != null) {
      console.log('set darkMode: ', preference.darkMode)
      Dark.set(preference.darkMode)
      state.preference.darkMode = preference.darkMode
    }
    if (preference.language) {
      console.log('set language: ', preference.language)
      locale.value = preference.language
      state.preference.language = preference.language
    }

    if (option?.saveToBackend) {
      console.log('save to backend: ', preference)
      await mutate({
        ...preference,
      })
    }
  }

  const setDefaultPreferences = async () => {
    await setPreference(
      { ...defaultState().preference },
      { saveToBackend: true }
    )
  }

  return {
    darkMode: computed(() => state.preference.darkMode),
    language: computed(() => state.preference.language),
    setDefaultPreferences,
    setPreference,
  }
}
