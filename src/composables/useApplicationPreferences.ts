import { ref, watch } from '@vue/composition-api'
import {
  useSetDarkModeMutation,
  useSetLanguageMutation,
} from 'src/graphql/generated/operations'
import { useI18n } from 'vue-i18n-composable'

const darkMode = ref(false)
const language = ref('en-us')

export const useApplicationPreferences = () => {
    const { locale } = useI18n()

    const { mutate: darkModeMutation } = useSetDarkModeMutation(() => ({
    variables: {
      darkMode: darkMode.value,
    },
  }))
  const { mutate: languageMutation } = useSetLanguageMutation(() => ({
    variables: {
      language: language.value,
    },
  }))

  const startWatch = () => {
    watch(darkMode, async (newDarkMode, oldDarkMode) => {
      console.log('darkMode: ', newDarkMode)
      try {
        await darkModeMutation()
      } catch (error) {
        console.error('Failed setting darkMode: ', error)
        darkMode.value = oldDarkMode
      }
    })
    watch(language, async (newLanguage, oldLanguage) => {
      console.log('language: ', newLanguage)
      console.log('locale: ', locale.value)
      try {
        await languageMutation()
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
  }
}
