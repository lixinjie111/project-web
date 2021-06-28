<template>
  <ModalNoFooter :isShow="isShow" :width="980" :maskClosable="false" :footer="null" @modal-cancel="handleCancel" :body-style="{padding: '6px 22px'}" centered>
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
        <ToggleInput v-model="form.taskName" overClass="title" @commit="saveData({taskName: form.taskName})" :max-length="50">
          <div>{{form.taskName}}
          </div>
        </ToggleInput>
        <a-checkbox :checked="!!form.weeklyShow" @change="e => handleSave('weeklyShow', e.target.checked ? 1 : 0)" v-if="!parentId">周报显示</a-checkbox>
      </div>
      <a-row :gutter="[16, 30]">
        <a-col :span="6"><StatusSelect :value="form.status" @change="val => handleSave('status', val)"/></a-col>
        <a-col :span="6"><!--<UserSelect :form="0"/>-->
              <UserSelect :options="memberList" :value="form.incharge" @change="val => handleSave('incharge', val)" subtitle="负责人" />
        </a-col>
<!--        <a-col :span="6"><PrioritySelect :value="form.priority"/></a-col>-->
        <a-col :span="6">
          <DateSelect title="计划开始" icon="iconrili" :value="form.planBeginTime" @select="val => handleSave('planBeginTime', val)" :range="{end: form.planEndTime}" />
        </a-col>
        <a-col :span="6">
          <DateSelect title="计划结束" icon="iconjihua" :value="form.planEndTime" @select="val => handleSave('planEndTime', val)" :range="{begin: form.planBeginTime}" />
        </a-col>
      </a-row>
      <a-row :gutter="[16, 30]">
        <a-col :span="6">
          <DateSelect title="实际开始" icon="iconrili" :value="form.actualBeginTime" @select="val => handleSave('actualBeginTime', val)" :range="{end: form.actualEndTime}" />
        </a-col>
        <a-col :span="6">
          <DateSelect title="实际结束" icon="iconjihua" :value="form.actualEndTime" @select="val => handleSave('actualEndTime', val)" :range="{begin: form.actualBeginTime}" />
        </a-col>
        <a-col :span="6">
          <HoursSelect title="预计工时" icon="iconmiaobiao" :value="form.planHour" @change="val => handleSave('planHour', val)"/>
        </a-col>
        <a-col :span="6">
          <HoursSelect title="消耗工时" icon="iconzhexian" :value="form.actualHour" @change="val => handleSave('actualHour', val)"/>
        </a-col>
      </a-row>

      <a-tabs class="task-edit-tabs">
        <a-tab-pane key="1">
          <span slot="tab">
            <i class="iconfont icondagangshitu"></i>任务信息
          </span>
          <div class="panel-1">
            <div class="block">
              <a-row :gutter="[16, 4]">
                <a-col span="8" class="prj-title">所属项目:</a-col>
                <a-col span="6" class="prj-title">任务类型:</a-col>
                <a-col span="10" class="prj-title">优先级:</a-col>
              </a-row>
              <a-row :gutter="[16, 4]">
                <a-col span="8">{{form.projectName}}</a-col>
                <a-col span="6">
                  <a-select style="width: 150px" :value="form.taskType" :options="types" size="small" @change="val => handleSave('taskType', val)">
                  </a-select>
                </a-col>
                <a-col span="10">
                  <PrioritySelect :value="form.priority" @change="val => handleSave('priority', val)"/>
                </a-col>
              </a-row>
            </div>
            <div class="block">
              <a-row :gutter="[16, 8]">
                <a-col span="8">参与人:</a-col>
              </a-row>
              <a-row :gutter="[16, 8]">
                <a-col span="24"><UserSelect :options="memberList" :value="form.executorList" @change="val => handleSave('executorList', val)" multiple/></a-col>
              </a-row>
            </div>
            <div class="block">
              <a-row :gutter="[16, 4]">
                <a-col span="8">任务描述:</a-col>
              </a-row>
              <a-row :gutter="[16, 4]">
                <a-col span="24">
                  <ToggleArea v-model="form.taskDescription" :auto-size="{ minRows: 4, maxRows: 7 }" @commit="saveDescription" over-class="toggle-desc">{{form.taskDescription}}</ToggleArea>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" v-if="!parentId">
          <span slot="tab">
            <i class="iconfont iconzirenwu"></i>子任务
          </span>
          <div class="child-tit">
            <div>共 {{childrenList.length}} 个子任务</div>
            <div>
              <FlatButton @click="handleCreateChildTask" v-if="canCreateChild">
                添加子任务
                <MyIcon slot="icon" name="iconjia" type="main"/>
              </FlatButton>
            </div>
          </div>
          <div class="child-cont" ref="childCont">
<!--            <div class="child-item">-->
            <a-row :gutter="[16, 12]" v-if="createChild">
              <a-col span="24">
                <a-input class="edit" v-model="childTaskName" @pressEnter="handleCreateChild" placeholder="输入子任务名称…" style="border: none;"/>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 12]" v-if="createChild">
              <a-col span="19"></a-col>
              <a-col span="5" style="text-align: right;">
                <a-config-provider :auto-insert-space-in-button="false">
                  <a-button style="margin-right: 8px" @click="handleCancelCreateChild">取消</a-button>
                </a-config-provider>
                <a-config-provider :auto-insert-space-in-button="false">
                  <a-button type="primary" @click="handleCreateChild">保存</a-button>
                </a-config-provider>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 16]" v-for="child in childrenList" :key="child.id" class="child-item">
                <a-col span="3">
                  <Status :value="child.status"/>
                </a-col>
                <a-col span="19">
                  <a @click="handleEditChild(child)" v-if="canEditChild">{{child.taskName}}</a>
                  <span v-else>{{child.taskName}}</span>
                </a-col>
                <a-col span="2">
                  <i class="iconfont iconxiezuo" @click="handleEditChild(child)" v-if="canEditChild"></i>
                  <i class="iconfont iconshanchu" @click="handleDeleteChild(child)" v-if="canDeleteChild"></i>
                </a-col>
              </a-row>
            </div>
<!--          </div>-->
<!--          <div>-->
<!--            <a-divider></a-divider>-->
<!--          </div>-->
        </a-tab-pane>
        <a-tab-pane key="3">
          <span slot="tab">
            <i class="iconfont iconlianjie"></i>附件
          </span>
          <a-row :gutter="[16, 4]">
            <a-col span="20" v-if="form.attachment">共 1 个附件</a-col>
            <a-col span="20" v-else>共 0 个附件
              <span class="remark">附件大小不超过50MB</span>
            </a-col>
            <a-col span="4" v-if="!form.attachment">
              <a-upload
                  name="file"
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
          <div class="child-cont">
            <a-row :gutter="[16, 4]" v-if="form.attachment" class="child-item">
              <a-col span="22">
                <a @click="handleDownloadAttachment">{{form.attachment.name}}</a>
              </a-col>
              <a-col span="2">
                <i class="iconfont iconshanchu" @click="handleDeleteAttachment"></i>
              </a-col>
            </a-row>
            <div v-if="createChild">
              <a-input v-model="childTaskName" @pressEnter="handleCreateChild" />
            </div>
          </div>
          <div>
            <a-divider></a-divider>
          </div>
        </a-tab-pane>
      </a-tabs>
    <a-row :gutter="[16, 4]" v-if="form.history">
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
  import Status from "@/components/business/Status";
  import StatusSelect from "@/components/business/StatusSelect";
  import MyIcon from "@/components/others/MyIcon";
  import FlatButton from "@/components/buttons/FlatButton";
  import ToggleInput from "@/components/forms/ToggleInput";
  import {taskTypes} from "@/const/data";
  import {createChildTask, deleteAttachment, deleteTask, getTaskDetail, saveTask, saveChildTask, deleteChildTask} from "@/api/task";
  import moment from "moment";
  import { message } from 'x-intelligent-ui'
  import ToggleArea from "@/components/forms/ToggleArea";
  import {isInPermission} from "@/utils/common";

  export default {
    name: "TaskEdit",
    components: {ModalNoFooter, UserSelect, PrioritySelect, TwoValue, UserIcon, HoursSelect, DateSelect, Status, StatusSelect, FlatButton, MyIcon, ToggleInput, ToggleArea },
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
        uploadUrl: '/api/business/attachment/file/uploadAndSave',
        canCreateChild: isInPermission('business_child_task_add'),
        canEditChild: isInPermission('business_child_task_edit'),
        canDeleteChild: isInPermission('business_child_task_del'),
      }
    },
    watch: {
      taskId() {
        this.getDetail();
      },
      projectId(val) {
        this.$store.dispatch('projectMemberList', val);
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
        let oldStatus;
        if (key === 'status')
          oldStatus = this.form.status;
        this.$set(this, 'form', {...this.form, [key]: value});
        if (key === 'incharge') {
          this.saveData({masterList: [value]});
          return;
        }
        this.saveData({[key]: value}, () => {
          if (key === 'status')
            this.form.status = oldStatus;
        });
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
        this.$refs.childCont.scroll(0, 0);
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
            deleteChildTask(child.id).then(res => {
              if (res.code === 0 && res.data) {
                that.childrenList.splice(that.childrenList.indexOf(child), 1);
              }
            }).catch(err => {
            })
          }
        });
      },
      handleDeleteAttachment() {
        let that = this;
        this.$confirms({
          title: '提示',
          message: `您确定要删除附件 ${this.form.attachment.name} 吗？`,
          okText: '确认删除',
          icon: 'none',
          onOk() {
            deleteAttachment(that.form.attachment.id).then(res => {
              if (res.code === 0 && res.data) {
                that.form.attachment = null;
                that.saveData({attachments: ''});
              }
            }).catch(err => {
            })
          },
          onCancel() {}
        });
      },
      handleDownloadAttachment() {
        let att = this.form.attachment;
        if (att) {
          let a = document.createElement("a");
          a.href = att.link;
          a.target = '_blank';
          a.click();
        }
      },
      handleCancelCreateChild() {
        this.createChild = false;
      },
      handleCreateChild() {
        this.createChild = false;
        createChildTask(this.projectId, this.taskId, this.childTaskName).then(res => {
          if (res.code === 0 && res.data) {
            this.childrenList = this.childrenList.concat({id: res.data, taskName: this.childTaskName});
          }
        }).catch(err => {});
      },
      saveData(data, failCallback) {
        for (let key in data) {
          if (data.hasOwnProperty(key) && key.indexOf('Time') > 0) {
            if (key.indexOf('begin') >= 0)
              data[key] = moment(data[key]).format('YYYY-MM-DD 00:00:00');
            else
              data[key] = moment(data[key]).format('YYYY-MM-DD 23:59:59');
          }
        }
        data.id = this.taskId;
        if (this.parentId) {
          saveChildTask(data).then(res => {
          }).catch(err => {
            failCallback && failCallback();
          });
        }
        else {
          saveTask(data).then(res => {
          }).catch(err => {
            failCallback && failCallback();
          });
        }
      },
      getDetail() {
        if (! this.taskId)
          return;

        getTaskDetail(this.taskId).then(res => {
          if (res.code === 0 && res.data) {
            this.form = res.data;
            this.form.incharge = res.data.masterList ? res.data.masterList[0] : null;
            if (this.form.childrenList) {
              this.childrenList = this.form.childrenList;
            }
          }
        }).catch(err => {});
      },
      saveDescription() {
        this.saveData({taskDescription: this.form.taskDescription});
      },
      handleUpload({file}) {
        // console.log(file)
        if (file.status === 'done' && file.response.code === 0) {
          this.hideLoading && this.hideLoading();
          this.hideLoading = null;
          this.form.attachment = {id: file.response.data.attachmentId, link: file.response.data.filePath, name: file.name};
          this.saveData({attachments: parseInt(file.response.data.attachmentId)});
        }
        else if (file.status === 'error') {
          message.error(file.name + '上传失败')
        }
      },
      handleBeforeUpload(file) {
        // console.log(file)
        this.hideLoading = this.$message.loading('上传中...');
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
        margin-bottom: 16px;

        .ant-checkbox-wrapper {
          color: #636E95;
        }
      }
  .ant-tabs {
      width: 100%;
    }
  .block {
  width: 100%;
  margin-bottom: 24px;
}
  .child-item {
    /*display: flex;*/
    /*justify-content: space-between;*/
    color: #242F57;
    font-size: 14px;
    width: 100%;
    line-height: 32px;
    border-bottom: 1px solid #EAEDF7;
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
  $bottomHeight: 360px;
  .child-tit {
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .child-cont {
    height: $bottomHeight;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;

    .edit {
      height: 48px;
      background: #F4F7FC;
      border-radius: 4px;
    }
  }
  .panel-1 {
    height: $bottomHeight + 72px;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100%;
  }
  .prj-title {
    color: #636E95;
  }
  .remark {
    color: #97A0C3;
    margin-left: 6px;
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
      max-width: 800px;
      >div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      >input {
        width: 500px;
      }
    }
  }
  .toggle-desc {
    min-height: 24px;
    white-space: pre;
    max-height: 220px;
    overflow: hidden auto;
    line-height: 22px;
  }
  .task-edit-tabs {
    .ant-tabs-nav .ant-tabs-tab {
      padding-left: 0;
    }
  }
</style>
