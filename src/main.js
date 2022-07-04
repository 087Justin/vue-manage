import Vue from 'vue'
import App from './App.vue'
// 配置element-ui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/index'
import '@/assets/less/index.less'
// 引入vuex
import store from '@/store'
// 引入并全局配置axios
import axios from 'axios'
// 引入mock模拟数据
import '@/API/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios

// 配置登录路由守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    next({ name: 'MyHome' })
  } else {
    next()
  }
})

new Vue({
  render: (h) => h(App),
  router,
  store,
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
