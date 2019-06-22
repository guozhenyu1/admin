<template>
  <div class="form-login">
    <el-form ref="form" :model="form" class="form-wrap">
      <div class="login-ico">
        <img src="./logo_index.png" alt>
      </div>
      <el-form-item>
        <el-input v-model="form.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-input v-model="form.code" placeholder="验证码"></el-input>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-button @click="handleCode">获取验证码</el-button>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button class="btn-login" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt.js'

export default {
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleCode () {
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
