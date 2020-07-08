import { boot } from 'quasar/wrappers'
import { isAuthenticated } from 'src/store/authStore'
// import { handleResponse } from 'src/services/auth/authService'

export default boot(({ router }) => {
  // console.log('call handleResponse')
  // handleResponse
  // console.log('call handleResponse done')

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
