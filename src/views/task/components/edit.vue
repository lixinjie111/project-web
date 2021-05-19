<template>
  <Modal v-bind="$attrs" width="800" title="任务编辑" okText="确定" cancelText="取消" headeralgin="center" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
    <div slot="content">
      <div>
        <div class="title">{{value.name}}</div>
        <a-checkbox>在周报中显示</a-checkbox>
      </div>
      <a-row :gutter="[16, 16]">
        <a-col :span="6"><Status :value="value.status"/></a-col>
        <a-col :span="6"><UserSelect :value="0"/></a-col>
<!--        <a-col :span="6"><PrioritySelect :value="value.priority"/></a-col>-->
        <a-col :span="6">
          <a-date-picker v-model="value.begin_date" placeholder="请选择开始日期" allowClear />
        </a-col>
        <a-col :span="6">
          <a-date-picker v-model="value.end_date" placeholder="请选择截止日期" allowClear />
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="6">
          <a-date-picker v-model="value.begin_date" placeholder="请选择开始日期" allowClear />
        </a-col>
        <a-col :span="6">
          <a-date-picker v-model="value.end_date" placeholder="请选择截止日期" allowClear />
        </a-col>
        <a-col :span="6">
          {{value.hours}}小时
        </a-col>
        <a-col :span="6">
          {{value.used_hours}}小时
        </a-col>
      </a-row>

      <a-tabs>
        <a-tab-pane key="1">
          <span slot="tab">
            <i class="iconfont icondagangshitu"></i>任务信息
          </span>
          Content of Tab Pane 1
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <i class="iconfont iconzirenwu"></i>子任务
          </span>
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <i class="iconfont iconlianjie"></i>附件
          </span>
          Content of Tab Pane 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </Modal>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import UserSelect from "@/components/business/UserSelect";
  import PrioritySelect from "@/components/business/PrioritySelect";
  import Status from "@/components/business/Status";

  export default {
    name: "TaskEdit",
    components: { Modal, UserSelect, PrioritySelect, Status },
    props: {
      // isShow: {
      //   type: Boolean,
      //   default: false
      // },
      value: {
        type: Object,
        default: {},
      }
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
.iconfont {
  margin-right: 4px;
}
</style>
