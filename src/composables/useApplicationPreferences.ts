import { reactive, computed } from 'vue'
import { Dark } from 'quasar'
import { useSetAppPreferenceMutation } from 'src/graphql/generated/operations'
import { useI18n } from 'vue-i18n'

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
    saveToBackend = true
  ) => {
    if (preference.darkMode != null) {
      Dark.set(preference.darkMode)
      state.preference.darkMode = preference.darkMode
    }
    if (preference.language) {
      locale.value = preference.language
      state.preference.language = preference.language
    }

    if (saveToBackend) {
      await mutate({
        ...preference,
      })
    }
  }

  const setDefaultPreferences = async () => {
    await setPreference({ ...defaultState().preference })
  }

  return {
    darkMode: computed(() => state.preference.darkMode),
    language: computed(() => state.preference.language),
    setDefaultPreferences,
    setPreference,
  }
}
