import { boot } from 'quasar/wrappers'
import { isAuthenticated, setAccountId } from 'src/store/authStore'

// page refresh keeps us on the same page when authenticated
setAccountId()

export default boot(({ router }) => {

  router.beforeEach((to, from, next) => {
    console.log('isAuthenticated ', isAuthenticated.value)
    if (isAuthenticated.value || to.path === '/' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  })
})
