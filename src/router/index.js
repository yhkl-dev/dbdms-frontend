import Vue from 'vue'
import VueRouter from 'vue-router'
import CommonPage from './common'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('@/components/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'homepage',
        component: () => import('../pages/homepage/index.vue')
      },
      {
        path: '/database',
        name: 'database',
        component: () => import('../pages/databases/docs/index.vue'),
        children: [
          {
            path: 'db-list',
            name: 'db-list',
            component: resolve => require(['@/pages/databases/db/index.vue'], resolve)
          },
          {
            path: 'db-docs',
            name: 'db-docs',
            component: resolve => require(['@/pages/databases/browse/index.vue'], resolve)
          },
          {
            path: 'compare',
            name: 'compare',
            component: resolve => require(['@/pages/databases/compare/index.vue'], resolve)
          },
          {
            path: 'monitor',
            name: 'monitor',
            component: resolve => require(['@/pages/databases/monitor/index.vue'], resolve)
          },
          {
            path: 'midware',
            name: 'midware',
            component: resolve => require(['@/pages/databases/midware/index.vue'], resolve)
          }
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/user/index.vue')
      }
    ]
  },
  CommonPage
]

const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
