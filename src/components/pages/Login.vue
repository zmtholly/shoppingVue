<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="userName"
        label="用户名"
        placeholder="请输入用户名"
        clearable
        required
        :error-message="userNameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        clearable
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click="LoginAction" :loading="openLoading">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      userName: '',
      password: '',
      openLoading: false, // 是否开启用户的Loading
      userNameErrorMsg: '', // 当用户名出现错误的时候
      passwordErrorMsg: '' // 当密码出现错误的时候
    }
  },
  created () {
    if (localStorage.userInfo) {
      Toast.success('您已经登录')
      this.$router.push('/')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 注册用户的实行方法
    LoginAction () {
      this.checkForm() && this.axioLoginUser()
    },
    // 客户端验证
    checkForm () {
      let isOk = true
      if (this.userName.length < 5) {
        this.userNameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.userNameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    // axios注册用户方法
    axioLoginUser () {
      this.openLoading = true
      axios({
        url: url.login,
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 200 && response.data.message) {
          new Promise((resolve, reject) => {
            localStorage.userInfo = {userName: this.userName}
            setTimeout(() => {
              resolve()
            }, 500)
          }).then(() => {
            Toast.success('登录成功')
            this.$router.push('/')
          }).catch(err => {
            Toast.fail('登录状态保存失败')
            console.log(err)
          })
        } else {
          Toast.fail('登录失败')
          this.openLoading = false
        }
      }).catch((error) => {
        console.log(error)
        Toast.fail('登录失败')
        this.openLoading = false
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.register-panel
  width 96%
  border-radius 5px
  margin 20px auto
  padding-bottom 50px
  .register-button
    padding-top 10px
    .van-button--large
      height 36px
      line-height 34px
      font-size 14px
</style>
