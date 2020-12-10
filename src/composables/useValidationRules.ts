import { useI18n } from 'vue-i18n-composable'

export const useValidationRules = () => {
  const { t } = useI18n()

  const requiredRule = (val: string) =>
    !!val || t('validationRules.requiredField')

  return { requiredRule }
}
