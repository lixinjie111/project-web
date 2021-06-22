<template>
  <Modal width="400" :isShow="isShow" title="修改密码" okText="确定" cancelText="取消" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
    <a-form-model slot="content" ref="forgetForm" class="forget-form" layout="vertical" :model="form" :rules="rules">
      <a-form-model-item label="请输入登录密码" prop="oldPassword">
        <a-input type="password" v-model="form.oldPassword"/>
      </a-form-model-item>
      <a-form-model-item label="请输入新密码" prop="newPassword">
        <a-input type="password" v-model="form.newPassword" placeholder="6-8位数字和字母的组合"/>
      </a-form-model-item>
      <a-form-model-item label="再次输入新密码" prop="confirmPassword">
        <a-input type="password" v-model="form.confirmPassword" placeholder="6-8位数字和字母的组合"/>
      </a-form-model-item>
    </a-form-model>
  </Modal>
</template>
<script>
import Modal from '@/components/Modal/Modal.vue'
export default {
  name: 'ForgetForm',
  components: {Modal},
  props: ['isShow'],
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          {required: true, message: '请输入登录密码', trigger: 'blur'},
          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}$/, message: '6-8位数字和字母的组合', trigger: 'blur' }
        ],
        newPassword: [
          {
            validator: (rule, value, callback) => {
              let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,8}$/;
              if (value === '') {
                callback(new Error('请输入新密码'));
              } else if (!reg.test(value)) {
                callback(new Error('6-8位数字和字母的组合'));
              } else {
                if (this.form.confirmPassword !== '') {
                  this.$refs.forgetForm.validateField('confirmPassword');
                }
                callback();
              }
            }, 
            trigger: 'change'
          }
        ],
        confirmPassword: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入新密码'));
              } else if (value !== this.form.newPassword) {
                callback(new Error("两次密码不匹配"));
              } else {
                callback();
              }
            }, 
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.forgetForm.validate(async (valid) => {
        if (valid) {
          let {code} = await this.$api.mine.handlePutPassWord(this.form);
          if(code === 0){
            this.$message.success('保存成功！');
            this.$emit('closePwd')
          }
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.$emit('closePwd')
    }
  }
}
</script>