import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from '@/store/user'
// 全局注册配置vuex管理组件通讯
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 引入配置好的规则
    tab,
    user
  }
})
