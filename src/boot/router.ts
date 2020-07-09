import { boot } from 'quasar/wrappers'
import { isAuthenticated } from 'src/store/authStore'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    if (isAuthenticated.value || to.path === '/' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  })
})
