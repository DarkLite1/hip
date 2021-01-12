import { boot } from 'quasar/wrappers'
import { isAuthenticated, loading } from 'src/store/authStore'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    // console.log('route is authenticated: ', isAuthenticated.value)
    // console.log('route from: ', from.path)
    // console.log('route to: ', to.path)

    if (isAuthenticated.value) {
      if (to.path === '/login') next('/')
      else next()
    } else {
      if (to.path !== '/login') next('/login')
      else {
        next()
        loading.value = false
      }
    }
  })
})
