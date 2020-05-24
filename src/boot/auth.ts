import 'src/services/vue/CompositionApi'
import { boot } from 'quasar/wrappers'
import { useAccount } from 'src/comp-functions/useAuth'

export default boot(({ router }) => {
  const { setAccountID, isAuthenticated } = useAccount()
  setAccountID()

  router.beforeEach((to, from, next) => {
    if (isAuthenticated.value || to.path === '/' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  })
})
