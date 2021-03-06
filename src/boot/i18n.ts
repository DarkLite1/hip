import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
// import VueI18n from 'vue-i18n'

// declare module 'vue/types/vue' {
//   interface Vue {
//     i18n: VueI18n
//   }
// }

const i18n = createI18n({
  locale: 'en-us',
  fallbackLocale: 'en-us',
  messages,
})

export default boot(({ app }) => {
  app.use(i18n)
})

export { i18n }
