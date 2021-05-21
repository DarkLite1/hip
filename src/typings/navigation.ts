import { ComputedRef } from 'vue'
import { TranslateResult } from 'vue-i18n'

export interface IMainNavigationLinks {
  label: ComputedRef<TranslateResult>
  name: string
  to: string
  icon: string
}
