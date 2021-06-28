<template>
  <div class="task-list">
    <!-- 列表 -->
    <TreeTable :columns="tableColumns" :data-source="tableData" v-if="viewType===0" :current-page="page" :total="total" :page-size="pageSize" @pageChange="handlePageChange"/>

    <!-- 看板 -->
    <div class="board" v-else>
      <div class="group" :class="{droparea: dragging}">
        <div class="name">未开始</div>
        <draggable v-model="status0" group="site" @start="handleDragStart" @end="handleDragEnd">
          <transition-group>
            <div class="item" v-for="item in status0" :key="item.id">
              <div class="title" @click="handleEdit(item)">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan" v-if="item.planBeginTime || item.planEndTime">{{item.planBeginTime}} - {{item.planEndTime}}</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate(0)" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group" :class="{droparea: dragging}">
        <div class="name">进行中</div>
        <draggable v-model="status1" group="site" @start="handleDragStart" @end="handleDragEnd">
          <transition-group>
            <div class="item" v-for="item in status1" :key="item.id">
              <div class="title" @click="handleEdit(item)">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan" v-if="item.planBeginTime || item.planEndTime">{{item.planBeginTime}} - {{item.planEndTime}}</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate(1)" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group" :class="{droparea: dragging}">
        <div class="name">已完成</div>
        <draggable v-model="status2" group="site" @start="handleDragStart" @end="handleDragEnd">
          <transition-group>
            <div class="item" v-for="item in status2" :key="item.id">
              <div class="title" @click="handleEdit(item)">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan" v-if="item.planBeginTime || item.planEndTime">{{item.planBeginTime}} - {{item.planEndTime}}</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate(2)" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group" :class="{droparea: dragging}">
        <div class="name">已延期</div>
        <draggable v-model="status3" group="site" @start="handleDragStart" @end="handleDragEnd">
          <transition-group>
            <div class="item" v-for="item in status3" :key="item.id">
              <div class="title" @click="handleEdit(item)">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan" v-if="item.planBeginTime || item.planEndTime">{{item.planBeginTime}} - {{item.planEndTime}}</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate(3)" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group" :class="{droparea: dragging}">
        <div class="name">已搁置</div>
        <draggable v-model="status4" group="site" @start="handleDragStart" @end="handleDragEnd">
          <transition-group>
            <div class="item" v-for="item in status4" :key="item.id">
              <div class="title" @click="handleEdit(item)">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan" v-if="item.planBeginTime || item.planEndTime">{{item.planBeginTime}} - {{item.planEndTime}}</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate(4)" block><i class="iconfont iconjia"></i></a-button>
      </div>

    </div>

    <TaskAdd :isShow="showCreate" @cancel="showCreate = false" @ok="handleCreateOK" :project-id="curProjectId" :status="curStatus" />
    <TaskEdit :isShow="showEdit" @cancel="handleEditClose" :task-id="editTaskId" :parent-id="parentTaskId" @create-child="handleCreate" :project-id="curProjectId" @editChild="handleEditChild" @back="handleBackParent" />
  </div>
</template>

<script>
  import TreeTable from '@/components/tables/TreeTable';
  import TaskAdd from "./add";
  import TaskEdit from "./edit";
  import draggable from 'vuedraggable';
  import {taskTypes} from "@/const/data";
  import {isInPermission} from "@/utils/common";
  import {changeTaskStatus, deleteTask} from "@/api/task";

  const widthDate = 120;
  const widthStatus = 90;

  export default {
    name: "TaskList",
    components: { TreeTable, TaskAdd, TaskEdit, draggable },
    data() {
      let canEdit = isInPermission('business_task_edit');
      let canDelete = isInPermission('business_task_del');
      let canEditChild = isInPermission('business_child_task_edit');
      let canDeleteChild = isInPermission('business_child_task_del');
      let operation = [];
      if (canEdit || canDelete || canEditChild || canDeleteChild) {
        operation.push(          {
          dataIndex: 'type',
          title: '操作',
          fixed: 'right',
          width: widthStatus,
          customRender: (text, record, index) => {
            let ops = [];
            if ((!record.parentId && canEdit) || (record.parentId && canEditChild))
              ops.push(this.$createElement('i', {
                'class': 'iconfont iconxiezuo',
                on: {click: () => this.handleEdit(record)}}, ''));
            if ((!record.parentId && canDelete) || (record.parentId && canDeleteChild))
              ops.push(this.$createElement('i', {
                'class': 'iconfont iconshanchu',
                on: {click: () => this.handleDelete(record)}}, ''));
            return {
              attrs:{},
              props:{},
              class:{},
              style:{},
              children: this.$createElement('div', ops)
            }
          }
        },);
      }
      return {
        curProjectId: this.projectId || 0,
        editTaskId: 0,
        parentTaskId: 0,  // 编辑子节点时，的父节点ID
        tableColumns: [
          // {
          //   type: 'checkbox',
          //   width: 60,
          // },
          {
            dataIndex: 'id',
            title: '编号',
            fixed: 'left',
            width: 60,
            align: 'center',
          },
          {
            dataIndex: 'taskName',
            title: '任务名称',
            fixed: 'left',
            width: 360,
            treeNode: true,
            ellipsis: true,
            // customRender: (text, record, index) => {
            //   return canEdit ? {
            //     attrs:{},
            //     props:{},
            //     class:{},
            //     style:{},
            //     children: this.$createElement('a', {on: {click: () => this.handleEdit(record)}}, text)
            //   } : text
            // }
          },
          {
            dataIndex: 'status',
            title: '状态',
            width: 96,
            // align: 'center',
            scopedSlots: {
              customRender: 'status'
            }
          },
          {
            dataIndex: 'priority',
            title: '优先级',
            width: 72,
            // align: 'center',
            scopedSlots: {
              customRender: 'priority'
            }
          },
          {
            dataIndex: 'taskType',
            title: '任务类型',
            width: 88,
            customRender(text) {
              return taskTypes[text];
            }
          },
          {
            dataIndex: 'taskMaster',
            width: 120,
            ellipsis: true,
            title: '负责人',
          },
          {
            dataIndex: 'taskExecutor',
            title: '执行者',
            ellipsis: true,
            width: 120,
          },
          {
            dataIndex: 'planHour',
            title: '预计工时',
            width: 96,
          },
          {
            dataIndex: 'actualHour',
            title: '消耗工时',
            width: 96,
          },
          {
            dataIndex: 'restHour',
            title: '剩余工时',
            width: 96,
          },
          {
            dataIndex: 'progress',
            title: '进度',
            width: 132,
            scopedSlots: {
              customRender: 'progress'
            }
          },
          {
            dataIndex: 'planBeginTime',
            title: '计划开始',
            // width: 120,
          },
          {
            dataIndex: 'planEndTime',
            title: '计划结束',
            // width: 120,
          },
          {
            dataIndex: 'actualBeginTime',
            title: '实际开始',
            // width: 120,
          },
          {
            dataIndex: 'actualEndTime',
            title: '实际结束',
            // width: 120,
          },
          ...operation
        ],
        showCreate: false,
        showEdit: false,
        curStatus: 0, // 默认创建任务的状态
        dragging: false,  // 正在拖拽
      }
    },
    props: {
      enterType: {
        type: String,
        default: ''
      },
      projectId: Number,
      tableData: Array,
      page: Number,
      pageSize: Number,
      total: Number,
      // 可选参数
      boardData: {
        type: Array,
        default: () => {
          return [];
        },
      },
      viewType: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      status0: {
        get() {
          let st = this.boardData.filter(item => item.status===0)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => {
            this.updateStatus(item, 0);
          });
        }
      },
      status1: {
        get() {
          let st = this.boardData.filter(item => item.status===1)
          // console.log(st)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => {
            this.updateStatus(item, 1);
          })
        }
      },
      status2: {
        get() {
          let st = this.boardData.filter(item => item.status===2)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => {
            this.updateStatus(item, 2);
          })
        }
      },
      status3: {
        get() {
          let st = this.boardData.filter(item => item.status===3)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => {
            this.updateStatus(item, 3);
          })
        }
      },
      status4: {
        get() {
          let st = this.boardData.filter(item => item.status===4)
          return st;
        },
        set(val) {
          val.forEach(item => {
            this.updateStatus(item, 4);
          })
        }
      },
    },
    watch: {
      viewType(n, o) {
        this.curStatus = 0;
      },
    },
    methods: {
      updateStatus(item, newStatus) {
        if (item.status !== newStatus) {
          let oldStatus = item.status;
          item.status = newStatus;
          changeTaskStatus(item.id, newStatus).then(res => {
            // if (res.code !== 0)
            //   item.status = oldStatus;
          }).catch(err => {
            item.status = oldStatus
          });
        }
      },
      handleCreate(status) {
        this.curStatus = status;
        this.showCreate = true;
      },
      handleEdit(record) {
        this.editTaskId = record.id;
        this.parentTaskId = record.parentId;
        this.showEdit = true;
        // 我的任务编辑的时候,需要获取projectId
        if (this.enterType=='mine') {
          this.curProjectId = record.projectId;
        }
      },
      handleDelete(record) {
        let that = this;
        this.$confirms({
          title: '提示',
          message: `您确定要删除任务 ${record.taskName} 吗？`,
          okText: '确认删除',
          icon: 'none',
          onOk() {
            deleteTask(record.id).then(res => {
              if (res.code === 0 && res.data) {
                that.$emit('change');
              }
            }).catch(err => {});
          },
          onCancel() {},
        })
      },
      handleCreateOK(data) {
        this.showCreate = false;
        // 我的任务新建更新状态
        this.$emit('update');
        this.$emit('change');
      },
      handleEditClose() {
        this.showEdit = false;
        this.$emit('change');
      },
      handlePageChange(page, size) {
        this.$emit('pageChange', page, size);
      },
      handleDragStart(e) {
        // console.log('handleDragStart', e)
        this.dragging = true;
      },
      handleDragEnd(e) {
        // console.log('handleDragEnd', e)
        this.dragging = false;
      },
      handleEditChild(taskId, parentId) {
        this.showEdit = false;
        this.$nextTick( () => {
          this.showEdit = true;
          this.editTaskId = taskId;
          this.parentTaskId = parentId;
        });
      },
      handleBackParent() {
        this.showEdit = false;
        this.$nextTick( () => {
          this.showEdit = true;
          this.editTaskId = this.parentTaskId;
          this.parentTaskId = 0;
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
.task-list {

  .tree-table-wrapper {
    .iconfont {
      cursor: pointer;
    }
    .iconxiezuo {
      color: #1470FF;
    }
    .iconshanchu {
      margin-left: 12px;
      color: #FF4C60;
    }
  }

  .board {
    display: flex;
    padding: 8px;

    .droparea {
      >div {
        > span {
          min-height: 118px;
        }
      }
    }
    .group {
      margin: 8px;
      width: 264px;
      >div {
        >span {
          width: 100%;
          height: 100%;
          display: inline-block;
          margin-top: 12px;
        }
      }
      .name {
        height: 22px;
        font-size: 16px;
        font-weight: 500;
        color: #242F57;
        line-height: 22px;
      }
      .item {
        min-height: 106px;
        background: #FFFFFF;
        border-radius: 4px;
        padding: 12px;
        margin: 8px 0;
      }

      .title {
        /*height: 22px;*/
        font-size: 14px;
        font-weight: 400;
        color: #242F57;
        line-height: 22px;
        cursor: pointer;

        &:hover {
          color: #0064FF;
          text-decoration: underline;
        }
      }

      .incharge {
        height: 20px;
        font-size: 12px;
        font-weight: 400;
        color: #242F57;
        line-height: 20px;
        margin-top: 8px;
      }

      .plan {
        height: 20px;
        background: #FEDFE1;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #FF4C60;
        line-height: 20px;
        margin-top: 8px;
        display: inline-block;
        padding: 0 8px;
      }

      .ant-btn {
        border: none;
      }
    }
  }
}
</style>
