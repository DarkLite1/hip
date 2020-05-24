import 'src/services/vue/CompositionApi'
import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import routes from './routes'

console.log('load router')
import { useAccount } from 'src/comp-functions/useAuth'
const { setAccountID, isAuthenticated } = useAccount()
// page refresh sets the accountID and keeps the user on the page
setAccountID()

console.log('load router isAuthenticated', isAuthenticated.value)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route(function ({ Vue }) {
  Vue.use(VueRouter)

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })

  Router.beforeEach((to, from, next) => {
    console.log('router isAuthenticated', isAuthenticated.value)
    if (isAuthenticated.value || to.path === '/' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  })

  return Router
})
