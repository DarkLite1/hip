import { useI18n } from 'vue-i18n'

export const useValidationRules = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { t } = useI18n()

  const requiredFieldRule = (value: string) =>
    !!value || t('validationRules.requiredField')

  const minimumStringLengthRule = (value: string, count = 5) =>
    value.length >= count ||
    t('validationRules.minimumStringLength', { number: count })

  const exactStringLengthRule = (value: string, count = 5) =>
    value.length === count ||
    t('validationRules.exactStringLength', { number: count })

  return { requiredFieldRule, minimumStringLengthRule, exactStringLengthRule }
}
