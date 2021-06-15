<template>
  <div class="task-home">
    <TaskMenu @change="handleProjectChange" />
    <div class="header">
      <div class="left">
        <a-radio-group default-value="a" size="large" @change="handleQueryFilter">
          <a-radio-button class="all" v-for="item in tabList" :value="item.status" :key="item.status">
            {{item.name}}
            <span v-if="queryType===item.status">{{total}}</span>
          </a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            {{ viewTypes[viewType] }} <a-icon type="down" />
          </a>
          <a-menu slot="overlay" @click="handleViewType">
            <a-menu-item :key="index" v-for="(item, index) in viewTypes">
              {{item}}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <FlatButton @click="handleCreate" v-if="canCreate">
          新建任务
          <MyIcon slot="icon" name="icontianjia" type="main"/>
        </FlatButton>
        <a-divider type="vertical" v-if="canCreate && canExport" />
        <FlatButton v-if="canExport" @click="handleExport">
          导出
          <MyIcon slot="icon" name="icondaochu"/>
        </FlatButton>
      </div>
    </div>

    <!-- 列表 -->
    <TreeTable :columns="tableColumns" :data-source="tableData" v-if="viewType===0" :current-page="page" :total="total" :page-size="pageSize" @pageChange="handlePageChange"/>
    <!-- 看板 -->
    <div class="board" v-else>
      <div class="group" :class="{droparea: dragging}">
        <div class="name">未开始</div>
        <draggable v-model="status0" group="site" @start="handleDragStart" @end="handleDragEnd">
          <transition-group>
            <div class="item" v-for="item in status0" :key="item.id">
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
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
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
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
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
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
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
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
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan" v-if="item.planBeginTime || item.planEndTime">{{item.planBeginTime}} - {{item.planEndTime}}</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate(4)" block><i class="iconfont iconjia"></i></a-button>
      </div>

    </div>
    <TaskAdd :isShow="showCreate" @cancel="showCreate = false" @ok="handleCreateOK" :project-id="projectId" :status="curStatus" />
    <TaskEdit :isShow="showEdit" @cancel="handleEditClose" :task-id="editTaskId" @create-child="handleCreate" :project-id="projectId" @editChild="handleEditChild" />
  </div>
</template>

<script>
  import TreeTable from '@/components/tables/TreeTable';
  import FlatButton from '@/components/buttons/FlatButton';
  import MyIcon from "@/components/others/MyIcon";
  import TaskAdd from "./components/add";
  import TaskEdit from "./components/edit";
  import TaskMenu from "./components/menu";
  import draggable from 'vuedraggable';
  import {
    changeTaskStatus,
    deleteTask, exportTask,
    getProjectBoard,
    getTaskList
  } from "@/api/task";
  import {taskTypes} from "@/const/data";
  import moment from "moment";
  import BasicTabs from "@/components/tabs/BasicTabs";
  import {isInPermission} from "@/utils/common";

  export default {
    name: 'TaskHome',
    components: { TreeTable, FlatButton, MyIcon, TaskAdd, TaskEdit, draggable, BasicTabs, TaskMenu },
    data() {
      let canEdit = isInPermission('business_task_edit');
      let canDelete = isInPermission('business_task_del');
      let operation = [];
      if (canEdit && canDelete) {
        operation.push(          {
            dataIndex: 'type',
            title: '操作',
            fixed: 'right',
            customRender: (text, record, index) => {
              let ops = [];
              if (canEdit)
                ops.push(this.$createElement('i', {
                  'class': 'iconfont iconxiezuo',
                  on: {click: () => this.handleEdit(record)}}, ''));
              if (canDelete)
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
      let projectId = parseInt(this.$router.currentRoute.query.id)
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        canCreate: isInPermission('business_task_add'),
        canExport: isInPermission('business_task_view'),
        tabList: [
          {
            name: '全部',
            status: 'all'
          },
          {
            name: '指派给我',
            status: 'myTaskFlag'
          },
          {
            name: '在周报中显示',
            status: 'weeklyShow'
          },
        ],
        projectId,
        editTaskId: 0,
        tableData: [],
        tableColumns: [
          // {
          //   type: 'checkbox',
          //   width: 60,
          // },
          {
            dataIndex: 'id',
            title: 'ID',
            fixed: 'left',
          },
          {
            dataIndex: 'taskName',
            title: '任务名称',
            fixed: 'left',
            width: 200,
            treeNode: true,
            customRender: (text, record, index) => {
              return canEdit ? {
                attrs:{},
                props:{},
                class:{},
                style:{},
                children: this.$createElement('a', {on: {click: () => this.handleEdit(record)}}, text)
              } : text
            }
          },
          {
            dataIndex: 'status',
            title: '状态',
            scopedSlots: {
              customRender: 'status'
            }
          },
          {
            dataIndex: 'priority',
            title: '优先级',
            scopedSlots: {
              customRender: 'priority'
            }
          },
          {
            dataIndex: 'taskType',
            title: '任务类型',
            customRender(text) {
              return taskTypes[text];
            }
          },
          {
            dataIndex: 'taskMaster',
            title: '负责人',
          },
          {
            dataIndex: 'taskExecutor',
            title: '执行者',
          },
          {
            dataIndex: 'workHour',
            title: '工时/预计',
          },
          {
            dataIndex: 'usedHour',
            title: '工时/消耗',
          },
          {
            dataIndex: 'restHour',
            title: '工时/剩余',
          },
          {
            dataIndex: 'progress',
            title: '进度',
            width: 120,
            scopedSlots: {
              customRender: 'progress'
            }
          },
          {
            dataIndex: 'planBeginTime',
            title: '计划开始',
          },
          {
            dataIndex: 'planEndTime',
            title: '计划结束',
          },
          {
            dataIndex: 'actualBeginTime',
            title: '实际开始',
          },
          {
            dataIndex: 'actualEndTime',
            title: '实际结束',
          },
          ...operation
        ],
        boardData: [],
        showCreate: false,
        showEdit: false,
        viewType: 0,
        queryType: 'all',
        viewTypes: ['列表', '看板'],
        curStatus: 0, // 默认创建任务的状态
        dragging: false,  // 正在拖拽
      }
    },
    props: {
      msg: String
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
            if (item.status !== 0) {
              item.status = 0;
              changeTaskStatus(item.id, item.status);
            }
          });
        }
      },
      status1: {
        get() {
          let st = this.boardData.filter(item => item.status===1)
          console.log(st)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => {
            if (item.status !== 1) {
              item.status = 1;
              changeTaskStatus(item.id, item.status);
            }
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
            if (item.status !== 2) {
              item.status = 2;
              changeTaskStatus(item.id, item.status);
            }
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
            if (item.status !== 3) {
              item.status = 3;
              changeTaskStatus(item.id, item.status);
            }
          })
        }
      },
      status4: {
        get() {
          let st = this.boardData.filter(item => item.status===4)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => {
            if (item.status !== 4) {
              item.status = 4;
              changeTaskStatus(item.id, item.status);
            }
          })
        }
      },
    },
    mounted() {
      this.getTableList();
      // this.loadMyProjectList();
      // getProjectList().then(res => {}).catch(e => {});
      this.$store.dispatch('projectMemberList', this.projectId);
      // addProjectMember(9393939, [
      //     {
      //       "userId": 125,
      //       "userName": "武林人",
      //       "userRole": "夫工"
      //     },
      //     {
      //       "userId": 127,
      //       "userName": "草木灰",
      //       "userRole": "弄伤"
      //     },
      //   ])
    },
    methods: {
      getTableList() {
        getTaskList(this.page, this.pageSize, this.projectId, this.queryType==='myTaskFlag', this.queryType==='weeklyShow').then(res => {
          if (res.code === 0 && res.data) {
            this.tableData = res.data.records;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      getBoardList() {
        getProjectBoard(this.projectId, this.queryType==='myTaskFlag', this.queryType==='weeklyShow').then(res => {
          if (res.code === 0 && res.data) {
            let boardData = [];
            res.data.forEach(item => {
              if (item.kanbanList) {
                item.kanbanList.forEach(kan => {
                  kan.status = item.status;
                  if (kan.planBeginTime)
                    kan.planBeginTime = moment(kan.planBeginTime).format('YYYY年MM月DD日');
                  if (kan.planEndTime)
                    kan.planEndTime = moment(kan.planEndTime).format('YYYY年MM月DD日');
                });
                boardData = boardData.concat(item.kanbanList);
              }
            });
            this.boardData = boardData;
          }
        }).catch(err => {
          console.log(err)
        })
      },
      loadCurrentList() {
        if (this.viewType) {
          this.getBoardList();
        }
        else {
          this.getTableList();
        }
      },
      handleProjectChange(projectId) {
        this.projectId = projectId;
        this.loadCurrentList();
        this.$store.dispatch('projectMemberList', this.projectId);
      },
      handleViewType(e) {
        // console.log('test', e)
        this.curStatus = 0;
        this.viewType = e.key;
        this.loadCurrentList();
      },
      handleCreate(status) {
        this.curStatus = status;
        this.showCreate = true;
      },
      handleEdit(record) {
        this.editTaskId = record.id;
        this.showEdit = true;
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
                that.loadCurrentList();
              }
            }).catch(err => {});
          }
        })
      },
      handleCreateOK(data) {
        this.showCreate = false;
        this.loadCurrentList();
      },
      handleEditClose() {
        this.showEdit = false;
        this.loadCurrentList();
      },
      handleQueryFilter(e) {
        this.page = 1;
        this.total = 0;
        this.queryType = e.target.value;
        this.loadCurrentList();
      },
      handlePageChange(page) {
        this.page = page;
        this.loadCurrentList();
      },
      handleDragStart(e) {
        // console.log('handleDragStart', e)
        this.dragging = true;
      },
      handleDragEnd(e) {
        // console.log('handleDragEnd', e)
        this.dragging = false;
      },
      handleEditChild(taskId) {
        this.showEdit = false;
        this.$nextTick( () => {
          this.showEdit = true;
          this.editTaskId = taskId;
        });
      },
      // 导出任务excel
      handleExport() {
        try {
          exportTask(this.projectId, this.queryType==='myTaskFlag', this.queryType==='weeklyShow').then((res)=>{
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = "导出任务.xlsx";
            a.click();
            window.URL.revokeObjectURL(url);
          });
        }catch(error){
          console.log(error)
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.task-home {

  .header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-top: 1px solid #EAEDF7;
    border-bottom: 1px solid #EAEDF7;
    padding: 0 8px;
    margin-bottom: 16px;

    .left {
      display: flex;
      align-items: center;
    }
    .all {
      span {
        line-height: 16px;
        border-radius: 4px;
        border: 1px solid #EAEDF7;
        padding: 0 8px;
        width: 8px;
        height: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #242F57;
        margin-left: 4px;
      }
    }
  }

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
<style lang="scss">
  .task-home {
    .ant-select-selection--single {
      height: 32px;
      line-height: 32px;
      background: #F4F7FC;
      border: none;
      border-radius: 8px;
      box-shadow: none !important;

      .ant-select-selection__rendered {
        line-height: 32px;
      }
    }
  }
  .header {
    .left {
      .ant-radio-button-wrapper {
        border: none;
        box-shadow: none !important;
        outline: none !important;
        color: #97A0C3;
        font-size: 14px;

        &:first-child {
          border-left: none;
        }
        &:not(:first-child)::before {
          content: '';
          width: 1px;
          height: 16px;
          background-color: #EAEDF7 !important;
          opacity: 1;
          top: 11px;
        }
        &.ant-radio-button-wrapper-checked {
          z-index: 0;
          color: #0064FF;
        }
      }
    }
  }
</style>
