<template>
  <Modal width="400" :isShow="isShow" title="修改密码" okText="确定" cancelText="取消" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
    <a-form-model slot="content" ref="forgetForm" class="forget-form" layout="vertical" :model="form" :rules="rules">
      <a-form-model-item label="请输入登录密码" prop="pwd">
        <a-input type="password" v-model="form.pwd" />
      </a-form-model-item>
      <a-form-model-item label="请输入新密码" prop="newpwd">
        <a-input type="password" v-model="form.newpwd" />
      </a-form-model-item>
      <a-form-model-item label="再次输入新密码" prop="aginnewpwd">
        <a-input type="password" v-model="form.aginnewpwd" />
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
        pwd: '',
        newpwd: '',
        aginnewpwd: ''
      },
      rules: {
        pwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ],
        newpwd: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入新密码'));
              } else {
                if (this.form.aginnewpwd !== '') {
                  this.$refs.forgetForm.validateField('aginnewpwd');
                }
                callback();
              }
            }, 
            trigger: 'change'
          }
        ],
        aginnewpwd: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入新密码'));
              } else if (value !== this.form.newpwd) {
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
          // let {code} = await this.$api.org.handlePostPutRoleInfo(this.form);
          // if(code === 0){
          //   this.$message.success('保存成功！');
          // }
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