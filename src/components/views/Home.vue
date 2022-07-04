<template>
  <el-container style="height: 100vh">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <!-- tag标签 -->
        <CommonHeader></CommonHeader>
      </el-header>
      <CommonTag></CommonTag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 按需引入组件
import CommonAside from '@/components/CommonAside/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader/CommonHeader.vue'
import CommonTag from '@/components/CommonTag/CommonTag.vue'

export default {
  name: 'Home',
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
