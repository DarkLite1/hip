import 'src/services/vue/CompositionApi'
import { route } from 'quasar/wrappers'
import VueRouter from 'vue-router'
import routes from './routes'

import { useAccount } from 'src/comp-functions/useAuth'
const { setAccountID, isAuthenticated } = useAccount()
// page refresh sets the accountID and keeps the user on the page
setAccountID()

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
    if (isAuthenticated.value || to.path === '/' || to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  })

  return Router
})
