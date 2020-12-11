import { useI18n } from 'vue-i18n-composable'

export const useValidationRules = () => {
  const { t } = useI18n()

  const requiredFieldRule = (value: string) =>
    !!value || t('validationRules.requiredField')

  const minimumStringCharactersRule = (value: string, count = 5) =>
    value.length >= count
      ? true
      : t('validationRules.minimumStringCharacters', { number: count })

  return { requiredFieldRule, minimumStringCharactersRule }
}
