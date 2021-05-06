<template>
  <div class="forgetpwd-body">
    <div class="forgetpwd-header">
      <img class="logo" src="../../assets/images/login/login-logo.png" />
    </div>
    <div class="forgetpwd-content">
      <div class="forgetpwd-title">{{formTitle[this.step-1]}}</div>
      <a-form-model ref="form" :model="form" class="forgetpwd-form" :rules="rules" @submit="handleSubmit">
        <a-form-model-item v-if="step === 1">
          <a-input v-model="form.name" placeholder="输入账号关联手机号" />
        </a-form-model-item>
        <a-form-model-item v-if="step === 1">
          <a-row>
            <a-col :span="14">
              <a-input v-model="form.code" placeholder="验证码"/>
            </a-col>
            <a-col :span="8" :offset="2">
             <a-button type="primary" block  :class="form.name === '' ? 'btn-disabled' : ''" @click="handleGetVerifyCode">发送验证码</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item v-if="step === 2">
          <a-input-password v-model="form.password" type="password" placeholder="新密码"></a-input-password>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            block
            :class="submitStatus ? 'btn-disabled' : ''"
            html-type="submit"
            >{{formBtn[this.step - 1]}}</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd",
  data() {
    return {
      step: 1, // 设置忘记密码第几步
      formTitle: ['<-重置密码', '<-输入新的密码', ''],
      formBtn: ['下一步', '重置密码', ''],
      form: {
        name: "",
        code: "", // 验证码
        password: "", // 新密码
      },
      rules: {
        name: [{ required: true, message: '请输入用户名/手机号', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
      },
      stepRules: [
        {
          password: [{ required: true, message: '请输入密码', trigger: 'change' }],
        }
      ]
    };
  },
  computed: {
    submitStatus() {
      if(this.step === 1){
        return this.form.name === '' || this.form.code === '';
      } else if(this.step === 2){
        return this.form.password === '';
      } else if(this.step === 3){
        return this.form.name === '' || this.form.code === '';
      } else {
        return false;
      }
    }
  },
  methods: {
    // 获取验证码 是否需要校验手机在何处校验？
    handleGetVerifyCode() {

    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.form.validate(valid => {
        if (valid) {
          if(this.step < 3){
            this.step ++;
            this.$set(this, 'rules', this.stepRules[this.step - 2])
          } else {
            this.handleLogin()
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    handleLogin() {

    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.forgetpwd-body {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/login/login-bg.png") no-repeat 100%;
  .forgetpwd-header {
    text-align: center;
    .logo {
      margin: 142px auto 0 auto;
      width: 307px;
    }
  }
  .forgetpwd-content {
    margin: 80px auto 0 auto;
    padding: 32px 40px 40px 40px;
    width: 364px;
    height: 400px;
    background: #fff;
    border-radius: 16px;
    .forgetpwd-title {
      margin-bottom: 32px;
      font-size: 24px;
      line-height: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #25272b;
    }
    .forgetpwd-form {
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
      .ant-col{
        .ant-btn {
          padding: 0;
          text-align: center;
        }
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
