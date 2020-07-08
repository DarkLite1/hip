import { boot } from 'quasar/wrappers'
import { isAuthenticated } from 'src/store/authStore'
import { handleResponse } from 'src/services/auth/authService'

handleResponse

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
