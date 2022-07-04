import cookie from 'js-cookie'
export default {
  // 展开按钮的状态
  state: {
    isCollapse: false,
    // 定义面包屑的数据
    tableList: [
      {
        path: '/MyHome',
        name: 'MyHome',
        label: '首页',
        icon: 'home'
      }
    ],
    // 点击对应面包屑高亮
    currentMenu: null,
    menu: []
  },
  // 展开按钮状态变化的方法
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 动态添加面包屑和高亮的函数
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        const result = state.tableList.findIndex(
          (item) => item.name === val.name
        )
        if (result === -1) {
          state.tableList.push(val)
        }
      } else {
        state.currentMenu = null
      }
    },
    // 定义tag标签删除程序
    closeTag(state, val) {
      const result = state.tableList.findIndex((item) => item.name === val.name)
      state.tableList.splice(result, 1)
    },
    // 动态获取menu路由数据
    setMenu(state, val) {
      state.menu = val
      cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      cookie.remove('menu')
    },
    addMenu(state, router) {
      if (!cookie.get('menu')) {
        return
      }
      const menu = JSON.parse(cookie.get('menu'))
      state.menu = menu
      const menuArry = []
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`@/components/views/${item.url}`)
            return item
          })
          menuArry.push(...item.children)
        } else {
          item.component = () => import(`@/components/views/${item.url}`)
          menuArry.push(item)
        }
      })
      // 路由的动态添加
      menuArry.forEach((item) => {
        router.addRoute('Home', item)
      })
    }
  }
}
