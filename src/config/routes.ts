import { RouteRecordRaw } from 'vue-router'

/**
 * # 路由配置
 * @author Hamm
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: '登录',
    // 如需启用Oauth2登录 请使用 @/airpower/view/login.vue
    component: () => import('@/view/login.vue'),
  },
  {
    // 如需启用Oauth2登录 这里这个是必须
    path: '/callback',
    name: 'Oauth2登录回调',
    component: () => import('@/view/callback.vue'),
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/view/home.vue'),
  },
  {
    path: '/',
    name: 'console',
    redirect: '/home',
    component: () => import('@/component/Console.vue'),
    children: [
      {
        path: ':catchAll(.*)',
        component: () => import('@/airpower/view/error.vue'),
      },
    ],
  },
]
