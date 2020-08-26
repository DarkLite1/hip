import { boot } from 'quasar/wrappers'
import { isAuthenticated } from 'src/store/authStore'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    console.log(`route to '${to.path}' authenticated`, isAuthenticated.value)

    if (isAuthenticated.value) {
      if (to.path === '/login') next('/')
      else next()
    } else {
      if (to.path !== '/login') next('/login')
      else next()
    }
  })
})
