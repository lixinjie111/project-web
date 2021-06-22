<template>
  <Modal v-bind="$attrs" title="创建任务" okText="确定" cancelText="取消" headeralgin="center" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
    <a-form-model slot="content" ref="userForm"  class="user-form" layout="vertical" :model="form" :rules="rules">
      <a-form-model-item label="名称" prop="taskName">
        <a-input v-model="form.taskName" placeholder="名称" />
      </a-form-model-item>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="类型" prop="taskType">
            <a-select v-model="form.taskType" placeholder="" :options="types" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="负责人" prop="incharge">
            <UserSelect v-model="form.incharge" subtitle="负责人" :options="memberList" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="开始日期" prop="planBeginTime">
            <DateSelect :value="form.planBeginTime" :inputReadOnly="true" :range="{end: form.planEndTime}" @select="val => handleChange('planBeginTime', val)" placeholder="请选择开始日期" :original="true" allowClear />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="截止日期" prop="planEndTime">
            <DateSelect :value="form.planEndTime" :inputReadOnly="true" :range="{begin: form.planBeginTime}" @select="val => handleChange('planEndTime', val)" placeholder="请选择截止日期" :original="true" allowClear />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="参与人" prop="executorList">
            <UserSelect v-model="form.executorList" :options="memberList" multiple />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="优先级" prop="priority">
            <PrioritySelect v-model="form.priority" />
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="任务描述" prop="taskDescription">
        <a-textarea v-model="form.taskDescription" />
      </a-form-model-item>
    </a-form-model>
  </Modal>
</template>

<script>
  import Modal from '@/components/Modal/Modal.vue'
  import UserSelect from "@/components/business/UserSelect";
  import PrioritySelect from "@/components/business/PrioritySelect";
  import {createTask} from "@/api/task";
  import {taskTypes} from "@/const/data";
  import moment from "moment";
  import DateSelect from "@/components/business/DateSelect";

  export default {
    name: "TaskAdd",
    components: { Modal, UserSelect, PrioritySelect, DateSelect },
    props: {
      // isShow: {
      //   type: Boolean,
      //   default: false
      // },
      projectId: {
        type: Number
      },
      status: {
        type: Number
      },
    },
    data() {
      return {
        form: {
          taskName: '',
          taskType: 0,
          incharge: null,
          participates:[],
          priority: 2,
        },
        types: taskTypes.map((label, key) => {
          return {label, key}
        }),
        rules: {
          taskName: [
            {
              required: true,
              message: '请输入任务名',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      handleChange(key, val) {
        if (key === 'planBeginTime' && this.form.planEndTime && val > this.form.planEndTime) {
          return;
        }
        if (key === 'planEndTime' && this.form.planBeginTime && val < this.form.planBeginTime) {
          return;
        }
        // this.form[key] = val.toDate();
        this.$set(this, 'form', {...this.form, [key]: val});
      },
      // 校验新增 编辑用户信息
      handleSubmit() {
        this.$refs.userForm.validate((valid, data) => {
          if (valid) {
            console.log(data)
            console.log('submit!', this.form);
            // 接口提交成功 isShow
            this.form.projectId = this.projectId;
            if (this.form.incharge) {
              this.form.masterList = [
                this.form.incharge
              ]
            }
            if (this.form.planBeginTime) {
              this.form.planBeginTime = moment(this.form.planBeginTime).format('YYYY-MM-DD HH:mm:ss')
            }
            if (this.form.planEndTime) {
              this.form.planEndTime = moment(this.form.planEndTime).format('YYYY-MM-DD HH:mm:ss')
            }
            let data = this.form;
            if (this.status)
              data = {...this.form, status: this.status};
            createTask(data).then(res => {
              this.$emit('ok', data);
              this.form = {
                taskName: '',
                taskType: 0,
                incharge: null,
                participates:[],
                priority: 2,
              };
              // this.$refs.userForm.resetFields();
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
    computed: {
      memberList() {
        return this.$store.state.task.memberList;
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
