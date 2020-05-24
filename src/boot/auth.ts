import { boot } from 'quasar/wrappers'
import { useAccount } from 'src/comp-functions/useAuth'

// page refresh keeps us on the same page when authenticated
export default boot(({ router }) => {
  const { isAuthenticated } = useAccount()

  router.beforeEach((to, from, next) => {
    if (isAuthenticated.value || to.path === '/' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  })
})
