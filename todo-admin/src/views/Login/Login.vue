<template>
  <div class="form-login">
    <el-form ref="form" :model="form" class="form-wrap">
      <div class = 'login-ico'>
        <img src="./logo_index.png" alt>
      </div>
      <el-form-item>
        <el-input v-model="form.name" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-input v-model="form.name" placeholder="验证码"></el-input>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-button>获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang='less'>
.form-login {
  width: 400px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2b3e4a;
  border-radius:8px;
  .login-ico {
    vertical-align: middle;
    padding:10px;
  }
  .btn-login {
    width: 100%;
  }
}
</style>
