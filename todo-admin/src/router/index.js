import VueRouter from 'vue-router'
import Vue from 'vue'
import { setItem } from '@/utils/auth'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/Login/Login')
    },
    {
      path: '/layout',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '/home',
          component: () => import('@/views/Home')
        }
      ]
    }

  ]
})
// 配置路由守卫 不登录 不能进入
router.beforeEach((to, from, next) => {
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = setItem()
  // 非登录页
  if (to.path !== '/login') {
    if (!userInfo) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    // 登录页
    if (!userInfo) {
      next()
    } else {
      next({ name: 'home' })
    }
  }
})
export default router
