<template>
  <a-modal :visible="isShow" :width="980" :maskClosable="false" :footer="null" title="任务编辑" @cancel="handleCancel" centered>
      <div class="title-row">
        <ToggleInput v-model="value.name">
          <div class="title">{{value.name}}
          </div>
        </ToggleInput>
        <a-checkbox>在周报中显示</a-checkbox>
      </div>
      <a-row :gutter="[16, 16]">
        <a-col :span="6"><StatusSelect v-model="value.status"/></a-col>
        <a-col :span="6"><!--<UserSelect :value="0"/>-->
              <TwoValue title="谢冬" subtitle="负责人">
                <UserIcon value="谢冬" :length="1" :size="1"/>
              </TwoValue>
        </a-col>
<!--        <a-col :span="6"><PrioritySelect :value="value.priority"/></a-col>-->
        <a-col :span="6">
          <DateSelect title="计划开始" icon="iconrili" v-model="value.begin_date" />
        </a-col>
        <a-col :span="6">
          <DateSelect title="计划结束" icon="iconjihua" v-model="value.end_date" />
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="6">
          <DateSelect title="实际开始" icon="iconrili" v-model="value.begin_date" />
        </a-col>
        <a-col :span="6">
          <DateSelect title="实际结束" icon="iconjihua" v-model="value.end_date" />
        </a-col>
        <a-col :span="6">
          <HoursSelect title="预计工时" icon="iconmiaobiao" :value="value.hours"/>
        </a-col>
        <a-col :span="6">
          <HoursSelect title="实际工时" icon="iconzhexian" :value="value.used_hours"/>
        </a-col>
      </a-row>

      <a-tabs>
        <a-tab-pane key="1">
          <span slot="tab">
            <i class="iconfont icondagangshitu"></i>任务信息
          </span>
          <a-row :gutter="[16, 16]">
            <a-col span="8">所属项目:</a-col>
            <a-col span="6">任务类型:</a-col>
            <a-col span="10">优先级:</a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="8">智能营销方案整体设计</a-col>
            <a-col span="6">
              <a-select style="width: 150px">
                <a-select-option key="1">开发</a-select-option>
              </a-select>
            </a-col>
            <a-col span="10">
              <PrioritySelect v-model="value.priority"/>
            </a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="8">参与人:</a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="8"><UserSelect v-model="value.participates"/></a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="8">任务描述:</a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="24"><a-textarea v-model="value.desc" :autosize="{ minRows: 3, maxRows: 8 }"/></a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="2"><a-button type="primary">保存</a-button></a-col>
            <a-col span="2"><a-button>取消</a-button></a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <i class="iconfont iconzirenwu"></i>子任务
          </span>
          <a-row :gutter="[16, 16]">
            <a-col span="20">共 0 个子任务</a-col>
            <a-col span="4">
              <FlatButton @click="handleCreateChildTask">
                添加子任务
                <MyIcon slot="icon" name="iconjia" type="main"/>
              </FlatButton>
            </a-col>
          </a-row>
          <div>
            <a-divider></a-divider>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <i class="iconfont iconlianjie"></i>附件
          </span>
          <a-row :gutter="[16, 16]">
            <a-col span="20">共 0 个附件</a-col>
            <a-col span="4">
              <FlatButton @click="handleCreate">
                添加附件
                <MyIcon slot="icon" name="iconjia" type="main"/>
              </FlatButton>
            </a-col>
          </a-row>
          <div>
            <a-divider></a-divider>
          </div>
        </a-tab-pane>
      </a-tabs>
    <a-row :gutter="[16, 16]">
      <a-col span="8"><i class="iconfont iconlishijilu"></i>历史记录</a-col>
      <a-divider></a-divider>
    </a-row>
    <div>
      1, 2021-04-01 上午09:15，由 谢东 创建
    </div>
  </a-modal>
</template>

<script>
  import Modal from '@/components/Modal.vue'
  import UserSelect from "@/components/business/UserSelect";
  import PrioritySelect from "@/components/business/PrioritySelect";
  import TwoValue from "@/components/business/TwoValue";
  import UserIcon from "@/components/business/UserIcon";
  import HoursSelect from "@/components/business/HoursSelect";
  import DateSelect from "@/components/business/DateSelect";
  import StatusSelect from "@/components/business/StatusSelect";
  import ATextarea from "x-intelligent-ui/es/input/TextArea";
  import MyIcon from "@/components/others/MyIcon";
  import FlatButton from "@/components/buttons/FlatButton";
  import ToggleInput from "@/components/forms/ToggleInput";

  export default {
    name: "TaskEdit",
    components: {ATextarea, Modal, UserSelect, PrioritySelect, TwoValue, UserIcon, HoursSelect, DateSelect, StatusSelect, FlatButton, MyIcon, ToggleInput },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
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
      handleCreateChildTask() {
        this.$emit('create-child');
      },
    },
  }
</script>

<style lang="scss" scoped>
.iconfont {
  margin-right: 4px;
}
  .title-row {
    display: flex;
    height: 50px;
  }

.ant-tabs {
  width: 100%;
}
</style>
