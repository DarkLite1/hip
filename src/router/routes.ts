import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
      {
        path: 'applicationForm',
        name: 'applicationForm',
        component: () => import('pages/ApplicationForm.vue'),
        props: true,
      },
      { path: 'test', component: () => import('pages/Test.vue') },
      { path: 'settings', component: () => import('pages/Settings.vue') },
      { path: 'profile', component: () => import('pages/Profile.vue') },
    ],
  },
  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
