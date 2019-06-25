<template>
<div class = 'form-app'>
  <div class="form-login">
    <el-form ref="form" :model="form" class="form-wrap" :rules = 'rules'>
      <div class="login-ico">
        <img src="./logo_index.png" alt>
      </div>
      <el-form-item prop = 'mobile'>
        <el-input v-model="form.mobile" placeholder="手机号" ></el-input>
      </el-form-item>
      <el-form-item prop = 'code'>
        <el-col :span="11" >
          <el-input v-model="form.code" placeholder="验证码" ></el-input>
        </el-col>
        <el-col :span="11" :offset="1" prop = 'argee'>
          <el-button @click="handleSendCode">获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-login" type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt.js'
import { setItem } from '@/utils/auth'

export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /\d{11}/, message: '请输入11位手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请先获取验证码', trigger: 'blur' },
          { pattern: /\d{6}/, message: '验证码无效', trigger: 'blur' }
        ],
        argee: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]

      }
    }
  },
  methods: {
    handleLogin () {
    // 登录 验证 手机号 是否 有效
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return
        }
        //  登录到主页
        this.submintLogin()
      })
    },
    // 请求 接口
    submintLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then((res) => {
        // console.log(res.data.data)   // 测试 能否接受到返回值 ，能否成功
        console.log(res.data.message)
        // 获取用户信息  保存到客户端
        // window.localStorage.setItem('user_info', JSON.stringify(res.data.data))
        setItem(res.data.data)
      })
    },

    // 获取验证码 过程
    handleSendCode () {
      this.$refs['form'].validateField('mobile', (errorMessage) => {
        if (errorMessage.trim().length > 0) {
          return
        }
        // 显示验证框
        this.showGeetest()
      })
    },
    showGeetest () {
      const mobile = this.form.mobile
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        // console.log(res.data)
        const { data } = res.data // 根据端口的要求 获取参数 所以只能接管赋值取出 其中的 data 对象中的参数
        console.log(data)

        window.initGeetest(
          {
            // 省略必须的配置参数
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
            product: 'bind'
          },
          function (captchaObj) {
            captchaObj.onReady(function () {
              // 验证码ready之后才能调用verify方法显示验证码
              captchaObj.verify()
            })
              .onSuccess(function () {
                const {
                  geetest_challenge: challenge,
                  geetest_validate: validate,
                  geetest_seccode: seccode
                } = captchaObj.getValidate()
                axios({
                  method: 'GET',
                  url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                  params: {
                    challenge,
                    validate,
                    seccode
                  }
                }).then((res) => {
                  console.log(res.data)
                })
              })
              .onError(function () {
                // your code
              })
          }
        )
        // window.initGeetest({
        //   // 以下配置参数来自服务端 SDK
        //   gt: data.gt,
        //   challenge: data.challenge,
        //   offline: !data.success,
        //   new_captcha: true,
        //   product: 'bind'
        // }, function (captchaObj) {

        // })
      })
    }
  }
}
</script>

<style scoped lang='less'>
.form-app{
  width: 100%;
  height:100%;
  display:flex;
  background:skyblue;
  justify-content: center;
  align-items: center;
}
.form-login {
  width: 400px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2b3e4a;
  border-radius: 8px;
  .login-ico {
    vertical-align: middle;
    padding: 10px;
  }
  .btn-login {
    width: 100%;
  }
}
</style>
