<template>
  <div>
    <van-nav-bar
      title="用户注册"
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
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">注册</van-button>
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
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    // 表单验证方法
    checkForm () {
      let isOk = true
      if (this.userName.length < 5) {
        this.userNameErrorMsg = '用户名不能少于5位'
        isOk = false
      } else {
        this.userNameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    registerAction () {
      this.checkForm() && this.axiosRegisterUser()
    },
    axiosRegisterUser () {
      this.openLoading = true
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      }).then(response => {
        console.log(response)
        if (response.data.code === 200) {
          Toast.success('注册成功')
          this.$router.push('/')
        } else {
          console.log(response.data.message)
          Toast.fail('注册失败')
          this.openLoading = false
        }
      }).catch((error) => {
        Toast.fail('注册失败' + error)
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
