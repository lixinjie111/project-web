<template>
  <Modal v-bind="$attrs" title="创建任务" okText="确定" cancelText="取消" headeralgin="center" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
    <a-form-model slot="content" ref="userForm"  class="user-form" layout="vertical" :model="form" :rules="rules">
      <a-form-model-item label="名称" prop="username">
        <a-input v-model="form.title" placeholder="名称" />
      </a-form-model-item>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="类型" prop="name">
            <a-select v-model="form.type" placeholder="" :options="types" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="负责人" prop="incharge">
            <UserSelect v-model="form.incharge" subtitle="负责人" />
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
          <a-form-model-item label="参与人" prop="executorList">
            <UserSelect v-model="form.executorList" multiple />
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
  import PrioritySelect from "@/components/business/PrioritySelect";
  import {createTask} from "@/api/task";

  export default {
    name: "TaskAdd",
    components: { Modal, UserSelect, PrioritySelect },
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
          priority: 1,
        },
        types: [
          {
            key: 1,
            label: '开发',
          },
          {
            key: 2,
            label: '管理',
          },
        ],
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
            createTask({
              "executorList": [
                {
                  "userId": 88888,
                  "userName": "曹达隆"
                }
              ],
              "masterList": [
                {
                  "userId": 88888,
                  "userName": "曹达隆"
                }
              ],
              "planBeginTime": "2020-10-30 12:12:12",
              "planEndTime": "2020-10-30 12:12:12",
              "priority": 0,
              "projectId": 9393939,
              "taskDescription": "bbbb",
              "taskName": "这个是任务",
              "taskType": 0
            }).then(res => {
              this.$emit('ok', this.form);
            }).catch(err => {});
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
