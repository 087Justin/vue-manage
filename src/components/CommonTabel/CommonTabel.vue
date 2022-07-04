<template>
  <div class="common-tab">
    <el-table :data="tabelData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tabelLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 定义插槽中需要渲染的内容 -->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80">
        <template slot-scope="scope">
          <el-button size="mini" @click="handelEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handelDelete(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'CommonTabel',
  props: {
    tabelData: Array,
    tabelLabel: Array,
    config: Object
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page)
    },
    handelEdit(row) {
      this.$emit('edit', row)
    },
    handelDelete(row) {
      this.$emit('del', row)
    }
  }
}
</script>

<style lang="less" scoped>
.common-tab {
  height: 90%;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
