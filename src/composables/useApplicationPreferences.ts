import { ref, watch } from '@vue/composition-api'
import { useSetAppPreferenceMutation } from 'src/graphql/generated/operations'
import { useI18n } from 'vue-i18n-composable'

const darkMode = ref(false)
const language = ref('en-us')

export const useApplicationPreferences = () => {
  const { locale } = useI18n()

  const { mutate: setAppPreference } = useSetAppPreferenceMutation()

  const setDefaultPreferences = async () => {
    await setAppPreference({
      darkMode: darkMode.value,
      language: language.value,
    })
  }

  const startWatch = () => {
    watch(darkMode, async (newDarkMode, oldDarkMode) => {
      try {
        await setAppPreference({ darkMode: newDarkMode })
      } catch (error) {
        console.error('Failed setting darkMode: ', error)
        darkMode.value = oldDarkMode
      }
    })
    watch(language, async (newLanguage, oldLanguage) => {
      try {
        await setAppPreference({ language: newLanguage })
        locale.value = newLanguage
      } catch (error) {
        console.error('Failed setting language: ', error)
        language.value = oldLanguage
      }
    })
  }

  return {
    darkMode,
    language,
    startWatch,
    setDefaultPreferences,
  }
}
