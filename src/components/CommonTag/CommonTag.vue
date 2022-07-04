<template>
  <div class="tabs">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      size="small"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script>
// 导入vuex事件总线
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'CommonTag',
  computed: {
    ...mapState({
      tags: (state) => state.tab.tableList
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    // 点击tag实现路由切换
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    // 点击删除tag实现焦点左移，并且路由跳转
    handleClose(tag, index) {
      // 当tags中的长度-1与index的相等时，证明当前tag为最后一个
      const length = this.tags.length - 1
      // 调用事件总线的删除tag函数
      this.close(tag)
      if (tag.name !== this.$route.name) {
        return
      }
      if (length === index) {
        // 删除最后一个标签向左跳转
        this.$router.push({ name: this.tags[index - 1].name })
      } else {
        // 删除中间的标签向右跳转
        this.$router.push({ name: this.tags[index].name })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
