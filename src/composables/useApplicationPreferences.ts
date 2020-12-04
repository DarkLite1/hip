import { watch, reactive, toRefs } from '@vue/composition-api'
import { useSetAppPreferenceMutation } from 'src/graphql/generated/operations'
import { useI18n } from 'vue-i18n-composable'

const defaultState = () => ({
  darkMode: false,
  language: 'en-us',
})

const state = reactive(defaultState())

export const useApplicationPreferences = () => {
  const { locale } = useI18n()

  const { mutate: setAppPreference } = useSetAppPreferenceMutation()

  const setDefaultPreferences = async () => {
    await setAppPreference({
      darkMode: defaultState().darkMode,
      language: defaultState().language,
    })
  }

  const startWatch = () => {
    watch(
      () => state.darkMode,
      async (newDarkMode, oldDarkMode) => {
        try {
          await setAppPreference({ darkMode: newDarkMode })
        } catch (error) {
          console.error('Failed setting darkMode: ', error)
          state.darkMode = oldDarkMode
        }
      }
    )
    watch(
      () => state.language,
      async (newLanguage, oldLanguage) => {
        try {
          await setAppPreference({ language: newLanguage })
          locale.value = newLanguage
        } catch (error) {
          console.error('Failed setting language: ', error)
          state.language = oldLanguage
        }
      }
    )
  }

  return {
    ...toRefs(state),
    startWatch,
    setDefaultPreferences,
  }
}
