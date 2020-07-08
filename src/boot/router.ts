import { boot } from 'quasar/wrappers'
import { isAuthenticated } from 'src/store/authStore'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    console.log('isAuthenticated ', isAuthenticated.value)
    console.log('router from', from.path)
    console.log('router to', to.path)
    if (isAuthenticated.value || to.path === '/' || to.path === '/login') {
      console.log('router next to', to.path)
      next()
    } else {
      console.log('router force to /login')
      next('/login')
    }
  })
})
