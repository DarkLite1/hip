import { watch, reactive, toRefs } from '@vue/composition-api'
import { Dark } from 'quasar'
import { useSetAppPreferenceMutation } from 'src/graphql/generated/operations'
import { useI18n } from 'vue-i18n-composable'

const defaultState = () => ({
  preference: {
    darkMode: false,
    language: 'en-us',
  },
})

const state = reactive(defaultState())

export const useApplicationPreferences = () => {
  const { locale } = useI18n()

  const { mutate: setAppPreference } = useSetAppPreferenceMutation()

  const setDefaultPreferences = async () => {
    await setAppPreference({
      ...defaultState().preference,
    })
    state.preference = defaultState().preference
  }

  const startWatch = () => {
    watch(
      () => state.preference.darkMode,
      async (newDarkMode, oldDarkMode) => {
        try {
          await setAppPreference({ darkMode: newDarkMode })
          Dark.set(newDarkMode)
        } catch (error) {
          console.error('Failed setting darkMode: ', error)
          state.preference.darkMode = oldDarkMode
        }
      }
    )
    watch(
      () => state.preference.language,
      async (newLanguage, oldLanguage) => {
        try {
          await setAppPreference({ language: newLanguage })
          locale.value = newLanguage
        } catch (error) {
          console.error('Failed setting language: ', error)
          state.preference.language = oldLanguage
        }
      }
    )
  }

  return {
    ...toRefs(state.preference),
    startWatch,
    setDefaultPreferences,
  }
}
