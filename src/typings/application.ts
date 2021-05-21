import { TranslateResult } from 'vue-i18n'

export interface IApplication {
  [key: string]: {
    name: TranslateResult
    shortDescription: TranslateResult
    formComponentName: string
  }
}
