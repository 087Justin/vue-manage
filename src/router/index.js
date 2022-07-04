import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/components/views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },

    {
      path: '/home',
      name: 'Home',
      // component采用的路由懒加载，按需导入
      component: () => import('@/components/views/Home.vue'),
      redirect: '/MyHome',
      children: [
        // {
        //   path: '/Myhome',
        //   name: 'home',
        //   component: () => import('@/components/MyHome/MyHome.vue')
        // },
        // {
        //   path: '/user',
        //   name: 'user',
        //   component: () => import('@/components/views/user/user.vue')
        // },
        // {
        //   path: '/mall',
        //   name: 'mall',
        //   component: () => import('@/components/views/mall/mall.vue')
        // },
        // {
        //   path: '/page1',
        //   name: 'page1',
        //   component: () => import('@/components/views/other/pageOne.vue')
        // },
        // {
        //   path: '/page2',
        //   name: 'page2',
        //   component: () => import('@/components/views/other/pageTwo.vue')
        // }
      ]
    },
    // 登录页面路由规则
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/views/Login/login.vue')
    }
  ]
})

export default router
