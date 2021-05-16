<template>
  <Modal v-bind="$attrs" title="创建任务" okText="确定" cancelText="取消" headeralgin="center" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
    <a-form-model slot="content" ref="userForm"  class="user-form" layout="vertical" :model="form" :rules="rules">
      <a-form-model-item label="名称" prop="username">
        <a-input v-model="form.title" placeholder="名称" />
      </a-form-model-item>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="类型" prop="name">
            <a-select v-model="form.type" placeholder="" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="负责人" prop="incharge">
            <UserSelect v-model="form.incharge" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="开始日期" prop="begin_date">
            <a-date-picker v-model="form.begin_date" placeholder="请选择开始日期" allowClear />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="截止日期" prop="end_date">
            <a-date-picker v-model="form.end_date" placeholder="请选择截止日期" allowClear />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="参与人" prop="participates">
            <UserSelect v-model="form.participates" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="优先级" prop="priority">
            <PrioritySelect v-model="form.priority" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="任务描述" prop="desc">
        <a-textarea v-model="form.desc" />
      </a-form-model-item>
    </a-form-model>
  </Modal>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import UserSelect from "@/components/business/UserSelect";

  export default {
    name: "TaskAdd",
    components: { Modal, UserSelect },
    props: {
      // isShow: {
      //   type: Boolean,
      //   default: false
      // },
    },
    data() {
      return {
        form: {
          incharge:[],
          participates:[],
        },
      }
    },
    methods: {
      // 校验新增 编辑用户信息
      handleSubmit() {
        this.$refs.userForm.validate((valid, data) => {
          if (valid) {
            console.log(data)
            console.log('submit!', this.form);
            // 接口提交成功 isShow
            this.$emit('ok', this.form);
          } else {
            return false;
          }
        });
      },

      // 取消新增、编辑用户信息
      handleCancel() {
        this.$emit('cancel');
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
