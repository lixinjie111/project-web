<template>
  <ModalNoFooter :isShow="isShow" :width="980" :maskClosable="false" :footer="null" @modal-cancel="handleCancel" centered>
    <template slot="title">
      <i class="iconfont iconxiezuo"></i>
      编辑任务
      <span v-if="parentId">
        <i class="iconfont iconyou2"></i>
        <a @click="handleBackParent">返回上级</a>
        <a-divider type="vertical" />
        {{form.taskName}}
      </span>
    </template>
    <template  slot="content">
      <div class="title-row">
        <ToggleInput v-model="form.taskName" overClass="title" @commit="saveData({taskName: form.taskName})">
          <div>{{form.taskName}}
          </div>
        </ToggleInput>
        <a-checkbox :checked="!!form.weeklyShow" @change="e => handleSave('weeklyShow', e.target.checked ? 1 : 0)" v-if="!parentId">在周报中显示</a-checkbox>
      </div>
      <a-row :gutter="[16, 16]">
        <a-col :span="6"><StatusSelect :value="form.status" @change="val => handleSave('status', val)"/></a-col>
        <a-col :span="6"><!--<UserSelect :form="0"/>-->
              <UserSelect :options="memberList" :value="form.incharge" @change="val => handleSave('incharge', val)" subtitle="负责人" />
        </a-col>
<!--        <a-col :span="6"><PrioritySelect :value="form.priority"/></a-col>-->
        <a-col :span="6">
          <DateSelect title="计划开始" icon="iconrili" :value="form.planBeginTime" @select="val => handleSave('planBeginTime', val)" />
        </a-col>
        <a-col :span="6">
          <DateSelect title="计划结束" icon="iconjihua" :value="form.planEndTime" @select="val => handleSave('planEndTime', val)" />
        </a-col>
      </a-row>
      <a-row :gutter="[16, 16]">
        <a-col :span="6">
          <DateSelect title="实际开始" icon="iconrili" :value="form.actualBeginTime" @select="val => handleSave('actualBeginTime', val)" />
        </a-col>
        <a-col :span="6">
          <DateSelect title="实际结束" icon="iconjihua" :value="form.actualEndTime" @select="val => handleSave('actualEndTime', val)" />
        </a-col>
        <a-col :span="6">
          <HoursSelect title="预计工时" icon="iconmiaobiao" :value="form.planHour" @change="val => handleSave('planHour', val)"/>
        </a-col>
        <a-col :span="6">
          <HoursSelect title="实际工时" icon="iconzhexian" :value="form.actualHour" @change="val => handleSave('actualHour', val)"/>
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
              <a-select style="width: 150px" :value="form.taskType" :options="types" size="small" @change="val => handleSave('taskType', val)">
              </a-select>
            </a-col>
            <a-col span="10">
              <PrioritySelect :value="form.priority" @change="val => handleSave('priority', val)"/>
            </a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="8">参与人:</a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="8"><UserSelect :options="memberList" :value="form.executorList" @change="val => handleSave('executorList', val)" multiple/></a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="8">任务描述:</a-col>
          </a-row>
          <a-row :gutter="[16, 16]">
            <a-col span="24">
              <ToggleArea v-model="form.taskDescription" :auto-size="{ minRows: 3, maxRows: 8 }" @commit="saveDescription" over-class="toggle-desc">{{form.taskDescription}}</ToggleArea>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" v-if="!parentId">
          <span slot="tab">
            <i class="iconfont iconzirenwu"></i>子任务
          </span>
          <a-row :gutter="[16, 16]">
            <a-col span="20">共 {{childrenList.length}} 个子任务</a-col>
            <a-col span="4">
              <FlatButton @click="handleCreateChildTask">
                添加子任务
                <MyIcon slot="icon" name="iconjia" type="main"/>
              </FlatButton>
            </a-col>
          </a-row>
          <div>
            <div v-for="child in childrenList" :key="child.id" class="child-item">
              <a @click="handleEditChild(child)">{{child.taskName}}</a>
              <div>
                <i class="iconfont iconxiezuo" @click="handleEditChild(child)"></i>
                <i class="iconfont iconshanchu" @click="handleDeleteChild(child)"></i>
              </div>
            </div>
            <div v-if="createChild">
              <a-input v-model="childTaskName" @pressEnter="handleCreateChild" />
            </div>
          </div>
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
              <a-upload
                  name="file"
                  multiple
                  :showUploadList="false"
                  :action="uploadUrl"
                  :headers="uploadHeaders"
                  :data="uploadData"
                  @change="handleUpload"
                  :before-upload="handleBeforeUpload"
              >
                <FlatButton>
                  添加附件
                  <MyIcon slot="icon" name="iconjia" type="main"/>
                </FlatButton>
              </a-upload>
            </a-col>
          </a-row>
          <div>
            <div v-for="child in attachment" :key="child.id" class="child-item">
              <a target="_blank" :href="child.link">{{child.name}}</a>
              <div>
                <i class="iconfont iconshanchu" @click="handleDeleteAttachment(child)"></i>
              </div>
            </div>
            <div v-if="createChild">
              <a-input v-model="childTaskName" @pressEnter="handleCreateChild" />
            </div>
          </div>
          <div>
            <a-divider></a-divider>
          </div>
        </a-tab-pane>
      </a-tabs>
    <a-row :gutter="[16, 16]" v-if="form.history">
      <a-col span="8"><i class="iconfont iconlishijilu"></i>历史记录</a-col>
      <a-divider></a-divider>
    </a-row>
    <div v-if="form.history">
      1, 2021-04-01 上午09:15，由 谢东 创建
    </div>
    </template>
  </ModalNoFooter>
</template>

<script>
  import ModalNoFooter from '@/components/Modal/ModalNoFooter.vue'
  import UserSelect from "@/components/business/UserSelect";
  import PrioritySelect from "@/components/business/PrioritySelect";
  import TwoValue from "@/components/business/TwoValue";
  import UserIcon from "@/components/business/UserIcon";
  import HoursSelect from "@/components/business/HoursSelect";
  import DateSelect from "@/components/business/DateSelect";
  import StatusSelect from "@/components/business/StatusSelect";
  import MyIcon from "@/components/others/MyIcon";
  import FlatButton from "@/components/buttons/FlatButton";
  import ToggleInput from "@/components/forms/ToggleInput";
  import {taskTypes} from "@/const/data";
  import {createChildTask, deleteAttachment, deleteTask, getTaskDetail, saveTask} from "@/api/task";
  import moment from "moment";
  import { message } from 'x-intelligent-ui'
  import ToggleArea from "@/components/forms/ToggleArea";

  export default {
    name: "TaskEdit",
    components: {ModalNoFooter, UserSelect, PrioritySelect, TwoValue, UserIcon, HoursSelect, DateSelect, StatusSelect, FlatButton, MyIcon, ToggleInput, ToggleArea },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      // 如果是子任务，则父节点不为0
      parentId: {
        type: Number,
        default: 0
      },
      value: {
        type: Object,
        default: () => {return {}},
      },
      projectId: {
        type: Number
      },
      taskId: {
        type: Number
      },
    },
    data() {
      return {
        form: {
          incharge: null,
          executorList:[],
          status: 1,
          priority: 1,
        },
        types: taskTypes.map((label, key) => {
          return {label, key}
        }),
        createChild: false,
        childTaskName: '',
        childrenList: [],
        attachment: [],
        uploadUrl: '/api/business/attachment/file/uploadAndSave',
      }
    },
    watch: {
      taskId() {
        this.getDetail();
      },
    },
    computed: {
      memberList() {
        return this.$store.state.task.memberList;
      },
      uploadData() {
        return {
          projectId: this.projectId,
          taskId: this.taskId,
          type: 'attachment',
        }
      },
      uploadHeaders() {
        let token = this.$store.state.users.accessToken;
        return {
          Authorization: `Bearer ${token}`
        }
      },
    },
    methods: {
      handleSave(key, value) {
        // console.log('handleSave', key, value)
        // this.form[key] = value;
        let mValue = moment(value);
        if (key === 'planBeginTime' && this.form.planEndTime && mValue.isAfter(this.form.planEndTime, 'day')) {
          return;
        }
        if (key === 'planEndTime' && this.form.planBeginTime && mValue.isBefore(this.form.planBeginTime, 'day')) {
          return;
        }
        if (key === 'actualBeginTime' && this.form.actualEndTime && mValue.isAfter(this.form.actualEndTime, 'day')) {
          return;
        }
        if (key === 'actualEndTime' && this.form.actualBeginTime && mValue.isBefore(this.form.actualBeginTime, 'day')) {
          return;
        }
        this.$set(this, 'form', {...this.form, [key]: value});
        if (key === 'incharge') {
          this.saveData({masterList: [value]});
          return;
        }
        this.saveData({[key]: value});
      },

      // 关闭编辑用户信息
      handleCancel() {
        this.$emit('cancel');
      },
      handleCreateChildTask() {
        // this.$emit('create-child');
        // this.form.childrenList.push({id: -1, taskName: ''});
        this.childTaskName = '';
        this.createChild = true;
      },
      handleEditChild(child) {
        this.$emit('editChild', child.id, this.taskId)
      },
      handleDeleteChild(child) {
        let that = this;
        this.$confirms({
          title: '提示',
          message: `您确定要删除子任务 ${child.taskName} 吗？`,
          okText: '确认删除',
          icon: 'none',
          onOk() {
            deleteTask(child.id).then(res => {
              if (res.code === 0 && res.data) {
                that.childrenList.splice(that.childrenList.indexOf(child), 1);
              }
            }).catch(err => {
            })
          }
        });
      },
      handleDeleteAttachment(child) {
        let that = this;
        this.$confirms({
          title: '提示',
          message: `您确定要删除附件 ${child.name} 吗？`,
          okText: '确认删除',
          icon: 'none',
          onOk() {
            deleteAttachment(child.id).then(res => {
              if (res.code === 0 && res.data) {
                this.attachment.splice(this.attachment.indexOf(child), 1);
              }
            }).catch(err => {
            })
          }
        });
      },
      handleCreateChild() {
        this.createChild = false;
        createChildTask(this.projectId, this.taskId, this.childTaskName).then(res => {
          if (res.code === 0 && res.data) {
            this.childrenList = this.childrenList.concat({id: res.data, taskName: this.childTaskName});
          }
        }).catch(err => {});
      },
      saveData(data) {
        for (let key in data) {
          if (data.hasOwnProperty(key) && key.indexOf('Time') > 0) {
            if (key.indexOf('begin') >= 0)
              data[key] = moment(data[key]).format('YYYY-MM-DD 00:00:00');
            else
              data[key] = moment(data[key]).format('YYYY-MM-DD 23:59:59');
          }
        }
        data.id = this.taskId;
        saveTask(data).then(res => {

        }).catch(err => {});
      },
      getDetail() {
        if (! this.taskId)
          return;

        getTaskDetail(this.taskId).then(res => {
          if (res.code === 0 && res.data) {
            this.form = res.data;
            this.form.incharge = res.data.taskMaster ? res.data.taskMaster[0] : null;
            if (this.form.childrenList) {
              this.childrenList = this.form.childrenList;
            }
            if (this.form.attachment) {
              this.attachment = this.form.attachment;
            }
          }
        }).catch(err => {});
      },
      saveDescription() {
        this.saveData({taskDescription: this.form.taskDescription});
      },
      handleUpload({file}) {
        console.log(file)
        if (file.status === 'done' && file.response.code === 0)
          this.attachment = this.attachment.concat({id: file.response.data.attachmentId, link: file.response.data.filePath, name: file.name})
        else if (file.status === 'error') {
          message.error(file.name + '上传失败')
        }
      },
      handleBeforeUpload(file) {
        console.log(file)
        if (file.size > 100*1024*1024) {
          message.error(file.name + '超过100M，不允许上传');
          return false;
        }
        return true;
      },
      handleBackParent() {
        this.$emit('back');
      }
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
    align-items: center;
  }

.ant-tabs {
  width: 100%;
}
  .child-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    line-height: 36px;
    .iconfont {
      margin-right: 12px;
      cursor: pointer;
    }
    .iconxiezuo {
      color: #1470FF;
    }
    .iconshanchu {
      color: #FF4C60;
    }
  }
</style>
<style lang="scss">
  .title-row {
    .title {
      height: 29px;
      font-size: 21px;
      font-weight: 500;
      color: #242F57;
      line-height: 29px;
      margin-right: 8px;
      min-width: 60px;
    }
  }
  .toggle-desc {
    min-height: 24px;
    white-space: pre;
    max-height: 220px;
    overflow: hidden auto;
    line-height: 22px;
  }
</style>
