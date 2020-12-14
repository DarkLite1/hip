import { useI18n } from 'vue-i18n-composable'

export const useValidationRules = () => {
  const { t } = useI18n()

  const requiredFieldRule = (value: string) =>
    !!value || t('validationRules.requiredField')

  const minimumStringLengthRule = (value: string, count = 5) =>
    value.length >= count
      ? true
      : t('validationRules.minimumStringLength', { number: count })

  const exactStringLengthRule = (value: string, count = 5) =>
    value.length === count
      ? true
      : t('validationRules.exactStringLength', { number: count })

  return { requiredFieldRule, minimumStringLengthRule, exactStringLengthRule }
}
