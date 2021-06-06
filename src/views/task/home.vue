<template>
  <div class="task-home">
    <MenuNav>
      <div slot="nav-left" class="nav-left-title">
        <a class="back" @click="handleHome"><i class="iconfont iconshouye"></i>首页</a>
        <a-select :options="projectList" class="proj-list" size="small" v-model="projectId"/>
      </div>
    </MenuNav>
    <div class="header">
      <div class="left">
        <a-radio-group default-value="a" size="large" @change="handleQueryFilter">
          <a-radio-button value="all" class="all">
            全部
            <span>8</span>
          </a-radio-button>
          <a-radio-button value="myTaskFlag">
            指派给我
          </a-radio-button>
          <a-radio-button value="weeklyShow">
            在周报中显示
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
        <FlatButton @click="handleCreate">
          新建任务
          <MyIcon slot="icon" name="icontianjia" type="main"/>
        </FlatButton>
        <a-divider type="vertical" />
        <FlatButton>
          导出
          <MyIcon slot="icon" name="icondaochu"/>
        </FlatButton>
      </div>
    </div>

    <!-- 列表 -->
    <TreeTable :columns="tableColumns" :data-source="tableData" v-if="viewType===0" :current-page="page" :total="total" :page-size="pageSize" @pageChange="handlePageChange"/>
    <!-- 看板 -->
    <div class="board" v-else>
      <div class="group">
        <div class="name">未开始</div>
        <draggable v-model="status0" group="site">
          <transition-group>
            <div class="item" v-for="item in status0" :key="item.id">
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan">2021年04月16日 - 2021年04月18日</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group">
        <div class="name">进行中</div>
        <draggable v-model="status1" group="site">
          <transition-group>
            <div class="item" v-for="item in status1" :key="item.id">
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan">2021年04月16日 - 2021年04月18日</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group">
        <div class="name">已完成</div>
        <draggable v-model="status2" group="site">
          <transition-group>
            <div class="item" v-for="item in status2" :key="item.id">
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan">2021年04月16日 - 2021年04月18日</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group">
        <div class="name">已延期</div>
        <draggable v-model="status3" group="site">
          <transition-group>
            <div class="item" v-for="item in status3" :key="item.id">
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan">2021年04月16日 - 2021年04月18日</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate" block><i class="iconfont iconjia"></i></a-button>
      </div>

      <div class="group">
        <div class="name">已搁置</div>
        <draggable v-model="status4" group="site">
          <transition-group>
            <div class="item" v-for="item in status4" :key="item.id">
              <div class="title" @click="handleEdit">{{item.taskName}}</div>
              <div class="incharge">{{item.taskExecutor}}</div>
              <div class="plan">2021年04月16日 - 2021年04月18日</div>
            </div>
          </transition-group>
        </draggable>
        <a-button @click="handleCreate" block><i class="iconfont iconjia"></i></a-button>
      </div>

    </div>
    <TaskAdd :isShow="showCreate" @cancel="showCreate = false" @ok="handleCreateOK" :project-id="projectId" />
    <TaskEdit :isShow="showEdit" @cancel="showEdit = false" @ok="handleEditClose" :task-id="editTaskId" @create-child="handleCreate" :project-id="projectId" />
  </div>
</template>

<script>
  import TreeTable from '@/components/tables/TreeTable';
  import FlatButton from '@/components/buttons/FlatButton';
  import MyIcon from "@/components/others/MyIcon";
  import TaskAdd from "./components/add";
  import TaskEdit from "./components/edit";
  import draggable from 'vuedraggable';
  import {addProjectMember, deleteTask, getTaskList} from "@/api/task";
  import {taskTypes} from "@/const/data";
  import {Modal} from 'x-intelligent-ui';

  export default {
    name: 'TaskHome',
    components: { TreeTable, FlatButton, MyIcon, TaskAdd, TaskEdit, draggable },
    data() {
      return {
        page: 1,
        pageSize: 2,
        total: 0,
        projectList: [
          {
            key: 9393939,
            label: '秀梅苯肼基材'
          }
        ],
        projectId: 9393939,
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
          },
          {
            dataIndex: 'taskName',
            title: '任务名称',
            treeNode: true,
            customRender: (text, record, index) => {
              return {
                attrs:{},
                props:{},
                class:{},
                style:{},
                children: this.$createElement('a', {on: {click: () => this.handleEdit(record)}}, text)
              }
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
            dataIndex: 'status',
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
            dataIndex: 'status',
            title: '进度',
            scopedSlots: {
              customRender: 'progress'
            }
          },
          {
            dataIndex: 'type',
            title: '操作',
            customRender: (text, record, index) => {
              return {
                attrs:{},
                props:{},
                class:{},
                style:{},
                children: this.$createElement('div', [
                    // this.$createElement('i', {
                    //   'class': 'iconfont iconxiezuo',
                    //   on: {click: () => this.handleEdit(record)}}, ''),
                    this.$createElement('i', {
                      'class': 'iconfont iconshanchu',
                      on: {click: () => this.handleDelete(record)}}, ''),
                  ]
                )
              }
            }
          },
        ],
        boardData: [
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 1,
            "taskExecutor": "张珊,王五",
            "taskName": "从入门到放弃96从入门到放弃96从入门到放弃96",
            status: 1
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 2,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 1
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 3,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 1
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 4,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 1
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 5,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 1
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 6,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 1
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 7,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 1
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 8,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 3
          },
          {
            "beginTime": "2021/01/01",
            "endTime": "2021/04/04",
            "id": 9,
            "taskExecutor": "张珊,王五",
            "taskName": "任务名称",
            status: 2
          },
        ],
        showCreate: false,
        showEdit: false,
        viewType: 0,
        queryType: 'all',
        viewTypes: ['列表', '看板'],
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
          val.forEach(item => item.status = 0)
        }
      },
      status1: {
        get() {
          let st = this.boardData.filter(item => item.status===1)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => item.status = 1)
        }
      },
      status2: {
        get() {
          let st = this.boardData.filter(item => item.status===2)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => item.status = 2)
        }
      },
      status3: {
        get() {
          let st = this.boardData.filter(item => item.status===3)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => item.status = 3)
        }
      },
      status4: {
        get() {
          let st = this.boardData.filter(item => item.status===4)
          return st;
        },
        set(val) {
          // console.log(val)
          val.forEach(item => item.status = 4)
        }
      },
    },
    mounted() {
      this.getTableList();
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
      handleViewType(e) {
        // console.log('test', e)
        this.viewType = e.key;
      },
      handleCreate() {
        console.log('test')
        this.showCreate = true;
      },
      handleEdit(record) {
        this.editTaskId = record.id;
        this.showEdit = true;
      },
      handleDelete(record) {
        let that = this;
        Modal.confirm({
          title: '提示',
          content: `您确定要删除 ${record.taskName} 任务吗？`,
          okText: '确认删除',
          icon: 'none',
          onOk() {
            deleteTask(record.id).then(res => {
              if (res.code === 0 && res.data) {
                that.getTableList();
              }
            }).catch(err => {});
          }
        })
      },
      handleCreateOK(data) {
        this.showCreate = false;
        this.getTableList();
      },
      handleEditClose() {
        this.showEdit = false;
        this.getTableList();
      },
      handleHome() {
        this.$router.push('/mine/home');
      },
      handleQueryFilter(e) {
        this.queryType = e.target.value;
        this.getTableList();
      },
      handlePageChange(page) {
        this.page = page;
        this.getTableList();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.task-home {
  .back {
    width: 68px;
    height: 32px;
    background: #F4F7FC;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 400;
    color: #242F57;
    line-height: 24px;
    padding: 4px;
    margin: 9px 12px 0 16px;

    .iconfont {
      margin-right: 4px;
    }
  }
  .proj-list {
    min-width: 236px;
    height: 32px;
    background: #F4F7FC;
    border-radius: 8px;
  }

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

  .board {
    display: flex;
    padding: 8px;
    .group {
      margin: 8px;
      width: 264px;
      >div {
        >span {
          width: 100%;
          height: 100%;
          display: inline-block;
          min-height: 118px;
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
