import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/Home/Home')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/Login/Login')
    }
  ]
})
