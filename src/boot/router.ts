import { boot } from 'quasar/wrappers'
import { isAuthenticated } from 'src/store/authStore'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    console.log('router isAuthenticated: ', isAuthenticated.value)

    if (isAuthenticated.value) {
      if (to.path === '/login') next('/')
      else next()
    } else {
      if (to.path === '/login' || to.path === '/') next()
      else next('/login')
    }
  })
})
