// 登录模拟token组件
import cookie from 'js-cookie'
export default {
  state: {
    token: ''
  },
  mutations: {
    // 设置token
    setToken(state, val) {
      state.token = val
      cookie.set('token', val)
    },
    // 清除token
    clearToken(state) {
      state.token = ''
      cookie.remove('token')
    },
    // 获取token
    getToken(state) {
      state.token = state.token || cookie.get('token')
    }
  }
}
