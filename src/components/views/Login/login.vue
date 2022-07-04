<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    :ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">系统登录</h3>
    <!-- 账号区域 -->
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        v-model="form.username"
        type="input"
        auto-complete="off"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        v-model="form.password"
        type="password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login-submit">
      <!-- 登录按钮区域 -->
      <el-button type="primary" @click="login" class="login-submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
// import Mock from 'mockjs'
import { getMenu } from '@/API/data'

export default {
  name: 'login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 登录校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, message: '长度在 3 个字符以上', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      // 调用模拟好的接口实现账号验证
      getMenu(this.form).then(({ data: res }) => {
        if (res.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'MyHome' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
      // const token = Mock.Random.guid()
      // this.$store.commit('setToken', token)
      // this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-submit {
  margin: 10px auto 0 auto;
}
</style>
