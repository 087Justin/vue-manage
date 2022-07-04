<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></CommonForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 表单头部新增区域 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <CommonForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <!-- 插槽区域的搜索按钮 -->
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </CommonForm>
    </div>
    <CommonTabel
      :tabelData="tabelData"
      :tabelLabel="tabelLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></CommonTabel>
  </div>
</template>

<script>
// 导入表单组件
import CommonForm from '@/components/CommonForm/CommonForm.vue'
import CommonTabel from '@/components/CommonTabel/CommonTabel.vue'
import { getUser } from '@/API/data'

export default {
  name: 'user',
  data() {
    return {
      // 判断title提示新增用户还是更新用户
      operateType: 'add',
      // dialog弹窗是否为打开状态
      isShow: false,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tabelData: [],
      tabelLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          with: 200
        },
        {
          prop: 'addr',
          label: '地址',
          with: 320
        }
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  components: {
    CommonForm,
    CommonTabel
  },
  methods: {
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/user/edit', this.operateForm).then((res) => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/user/add', this.operateForm).then((res) => {
          this.isShow = false
          this.getList()
          console.log(res)
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    getList(name = ' ') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res }) => {
        console.log(res)
        this.tabelData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {
      this.$confirm('此操作将永久删除该文件,是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$http
          .get('/user/del', {
            params: { id }
          })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          })
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
