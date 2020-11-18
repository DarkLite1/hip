import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      {
        path: 'applications',
        component: () => import('pages/Applications.vue'),
      },
      { path: 'test', component: () => import('pages/Test.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') },
      { path: 'profile', component: () => import('pages/Profile.vue') },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
