<template>
  <div class="login-body">
    <div class="login-header">
      <img class="logo" src="@/assets/images/login/login-logo.png" />
    </div>
    <div class="login-content">
      <div class="login-title">
        <p>欢迎登录</p>
        <p>元知项目协作管理平台</p>
      </div>
      <a-form-model ref="loginForm" class="login-form" :model="form" :rules="rules" @submit="handleValidate">
        <a-form-model-item prop="username">
          <a-input class="username" :value="form.username" v-model="form.username" placeholder="用户名" />
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input-password class="pwd" :value="form.password" v-model="form.password"  placeholder="6-8位数字和字母的组合" />
          <!-- <span class="login-form-forgot" @click="handleGotoPage">忘记密码？</span> -->
        </a-form-model-item>
        <a-form-model-item>
          <div class="error">{{errorMsg}}</div>
          <a-button
            type="primary"
            block
            html-type="submit"
            >登录</a-button>
            <!-- :class="form.username === '' || form.password === '' ? 'btn-disabled' : ''" -->
        </a-form-model-item>
      </a-form-model>
      <!-- <Verify 
        @success="handleSubmit" 
        mode="pop"     
        captchaType="blockPuzzle"    
        :imgSize="{ width: '330px', height: '155px' }" 
        ref="verify"
        ></Verify> -->
    </div>
  </div>
</template>

<script>
import Verify from '@/components/verifition/Verify.vue'
import {encryptByAES} from '@/utils/cryptoJS'
export default {
  name: 'login',
  components: {Verify},
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      errorMsg: '',
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'change'},
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'change'},
          // {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}$/, message: '6-8位数字和字母的组合', trigger: 'change'}
        ],
      }
    };
  },
  methods: {
    handleValidate(e) {
      e.preventDefault();
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.handleSubmit()
        } else {
          return false;
        }
      });
    },
    handleSubmit(){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let pwd = encryptByAES(this.form.password, 'yuanzhi2teamwork', 'yuanzhi2teamwork');
          this.$api.login.handleGetToken(this.form.username, pwd).then(response => {
            this.$store.dispatch('setAccessToken', response.access_token)
            this.$store.dispatch('setRefreshToken', response.refresh_token)
            this.$store.dispatch('setUserInfo', response.user_info);
            
            Promise.all([this.$store.dispatch('initTopMenu'), this.$store.dispatch('initPermission')]).then(() => { // 查询菜单成功跳转
              let {topMenu} = this.$store.state.system;
              if(topMenu?.length){
                this.$router.push({ path: '/' });
              }else{
                this.errorMsg='该账号尚未分配角色，请联系管理员分配角色！'
              }
            }).catch(error => {
              this.$message.error('未获取到菜单')
            })
          }).catch(error => {
            console.log(error)
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-body {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/login/login-bg.png") no-repeat 100%;
  .login-header {
    text-align: center;
    .logo {
      display: inline-block;
      margin: 142px auto 0 auto;
      width: 307px;
    }
  }
  .login-content {
    display: flex;
    flex-direction: column;
    margin: 80px auto 0 auto;
    padding: 32px 40px 40px 40px;
    width: 364px;
    height: 400px;
    background: #fff;
    border-radius: 16px;
    .login-title {
      margin-bottom: 32px;
      font-size: 20px;
      line-height: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #25272b;
      > p {
        text-align: center;
      }
    }
    .login-form {
      position: relative;
      width: 100%;
      height: 264px;
      .ant-input {
        height: 40px;
      }
      .ant-input-affix-wrapper .ant-input:not(:last-child) {
        height: 40px;
      }
      .error {
        font-size: 12px;
        color: #FF4C60;
        text-align: center;
      }
      .ant-btn {
        height: 40px;
        border-radius: 4px;
      }
      .btn-disabled {
        border-color: #9ECBFF;
        background: #9ECBFF;
        cursor: not-allowed;
        box-shadow: 4px 6px 12px 1px rgba(35, 115, 255, 0.15);
      }
      .login-form-forgot {
        float: right;
        margin-top: 8px;
        height: 18px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #7C88B1;
        line-height: 18px;
        cursor: pointer;
      }
      .ant-form-item:last-child {
        position: absolute;
        width: 100%;
        margin-bottom: 0;
        bottom: 0;
      }
    }
  }
}
</style>
