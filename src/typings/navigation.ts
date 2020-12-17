import { ComputedRef } from '@vue/composition-api'
import { TranslateResult } from 'vue-i18n'

export interface InterfaceMainNavigationLinks {
  label: ComputedRef<TranslateResult>
  name: string
  to: string
  icon: string
}