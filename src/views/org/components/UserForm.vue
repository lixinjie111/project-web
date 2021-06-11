<template>
  <Modal :isShow="isShow" :title="modal.modalTitle" :okText="modal.okText" :cancelText="modal.cancelText" headeralgin="center" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
    <a-form-model slot="content" ref="userForm"  class="user-form" layout="vertical" :model="form" :rules="rules">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="用户名" prop="username">
            <a-input v-model="form.username" placeholder="用户名" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="真实姓名" prop="realName">
            <a-input v-model="form.realName" placeholder="真实姓名" />
          </a-form-model-item>
        </a-col>
      </a-row>
      
      <a-form-model-item label="部门" prop="deptId">
        <a-tree-select
          v-model="form.deptId"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :default-value ="form.deptId"
          :tree-data="treeList"></a-tree-select>
      </a-form-model-item>

      <a-form-model-item prop="roleList">
        <template slot="label">
          <span>角色分组</span>
          <span class="second-title">(分组决定用户的权限列表)</span>
        </template>
        <a-select v-model="form.roleList" mode="multiple" :default-value="form.roleList" :filter-option="handleFilterRole">
          <a-select-option v-for="item in roleList" :key="item.roleName" :value="item.roleId">{{ item.roleName }}</a-select-option>
        </a-select>
      </a-form-model-item>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item prop="password">
            <template slot="label">
              <span>密码</span>
              <!-- <span class="second-title">(6位以上，包含大小写字母和数字)</span> -->
            </template>
            <a-input-password disabled v-model="form.password" placeholder="密码"></a-input-password>
            <a-button v-if="isInPermission('sys_user_reset')" :class="['reset', form.userId ? '': 'reset-disabled']" type="link" ghost @click="handleResetPassWord(form.userId)">重置密码</a-button>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="电话" prop="phone">
            <a-input v-model="form.phone" placeholder="电话" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item prop="position">
            <template slot="label">
              <span>职位</span>
              <span class="second-title">(职位影响内容和用户列表的顺序)</span>
            </template>
            <a-input v-model="form.position" placeholder="职位"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="性别" prop="gender">
            <a-radio-group v-model="form.gender">
              <a-radio :style="radioStyle" :value="0">男</a-radio>
              <a-radio :style="radioStyle" :value="1">女</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </Modal>
</template>
<script>
import Modal from '@/components/Modal/Modal.vue'
import {isInPermission} from '@/utils/common.js'
export default {
  name: 'UserForm',
  components: {Modal},
  props: ['isShow', 'modal', 'roleList', 'treeList', 'form'],
  data() {
    return {
      radioStyle: {
        display: 'inline-block',
        height: '30px',
        lineHeight: '30px',
      }, 
      // form数据
      // form: {
      //   userId: '',
      //   username: '',
      //   realName: '',
      //   deptId: '',
      //   password: '',
      //   phone: '',
      //   position: '',
      //   roleList: [],
      //   gender: 0
      // },
       rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 3, max: 5, message: '用户名长度3 到 5', trigger: 'blur' },
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          // { min: 3, max: 5, message: '真实姓名长度3 到 5', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    isInPermission,
    // 筛选下拉框
    handleFilterRole(value, option){
      return option?.key.indexOf(value) != -1;
    },
    // 校验新增 编辑用户信息
    handleSubmit() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          // 保存 新增和编辑
          let {userId, username, realName, deptId, roleList, phone, position, gender} = this.form;
          let {code} = await this.$api.org.handlePostPutAdminUser(userId, username, realName, deptId, roleList, phone, position, gender);
          if(code === 0) {
            this.$message.success('保存成功！');
            this.$emit('submitUserForm')
          }
        } else {
          return false;
        }
      });
    },
    // 重置密码
    async handleResetPassWord(userId) {
      if(!userId) return;
      try {
        let {code} = await this.$api.org.handleResetPassWord(userId);
        if(code === 0) {
          this.$message.success('密码重置成功！')
        }
      }catch (error) {
        console.log(error)
      }
    },
    // 取消新增、编辑用户信息
    handleCancel() {
      this.$emit('closeUserForm')
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.ant-modal .user-form {
  .second-title {
    margin-left: 8px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #97A0C3;
  }
  .ant-form-item-required{
    &:before {
      display: none;
    }
    &:after {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
  }
  .reset{
    position: absolute;
    right: 16px;
    margin: 4px 0;
    color: #2373FF;
    font-size: 12px;
    &.reset-disabled{
      cursor: not-allowed;
    }
  }
}
</style>