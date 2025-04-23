import type { RouteRecordRaw } from 'vue-router'

/**
 * # 路由配置
 * @author Hamm.cn
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: '登录',
    // 如需启用Oauth2登录 请使用 @airpower/view/login.vue
    component: () => import('@/view/login.vue'),
  },
  {
    path: '/callback/:platform',
    name: 'Oauth2登录回调',
    component: () => import('@/view/callback.vue'),
  },
  {
    path: '/bind/:platform',
    name: '绑定',
    component: () => import('@/view/bind.vue'),
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/view/home.vue'),
  },
  {
    path: '/authorize',
    name: '授权',
    component: () => import('@/view/authorize.vue'),
  },
  {
    path: '/',
    name: 'console',
    redirect: '/home',
    component: () => import('@/component/Console.vue'),
    children: [
      {
        path: ':catchAll(.*)',
        component: () => import('@/view/error.vue'),
      },
    ],
  },
]
