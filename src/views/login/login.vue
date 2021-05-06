<template>
  <div class="login-body">
    <div class="login-header">
      <img class="logo" src="@/assets/images/login/login-logo.png" />
    </div>
    <div class="login-content">
      <div class="login-title">欢迎登录项目管理平台</div>
      <a-form-model ref="loginForm" :model="form" class="login-form" @submit="handleSubmit">
        <a-form-model-item>
          <a-input v-model="form.name" placeholder="用户名/手机号" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="form.password" placeholder="密码" />
          <span class="login-form-forgot" @click="handleGotoPage">忘记密码？</span
          >
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            block
            :class="form.name === '' || form.password === '' ? 'btn-disabled' : ''"
            html-type="submit"
            >登录</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
      rules: {
        // name: [{ required: true, message: '请输入用户名/手机号', trigger: 'blur' }],
        // password: [{ required: true, message: '请输入密码', trigger: 'change' }],
      },
    };
  },
  methods: {
    handleGotoPage() {
        this.$router.push({
            path: '/forgetpwd'
        })
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
  mounted() {},
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
    margin: 80px auto 0 auto;
    padding: 32px 40px 40px 40px;
    width: 364px;
    height: 400px;
    background: #fff;
    border-radius: 16px;
    .login-title {
      margin-bottom: 32px;
      font-size: 24px;
      line-height: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #25272b;
    }
    .login-form {
      position: relative;
      width: 100%;
      height: 264px;
      .ant-input {
        height: 40px;
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
