<template>
  <div class="task-home">
    <TaskMenu @change="handleProjectChange" />
    <div class="header">
      <div class="left">
        <a-radio-group default-value="all" size="large" @change="handleQueryFilter">
          <a-radio-button class="all" v-for="item in tabList" :value="item.status" :key="item.status">
            {{item.name}}
            <span v-if="queryType===item.status && total">{{total}}</span>
          </a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <a-dropdown :trigger="['click']" overlay-class-name="type-menus" v-model="showTypeMenu">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            {{ viewTypes[viewType] }} <i class="iconfont iconxia" :class="{upicon: showTypeMenu}"></i>
          </a>
          <a-menu slot="overlay" @click="handleViewType">
            <a-menu-item :key="index" v-for="(item, index) in viewTypes">
              {{item}}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <FlatButton @click="handleCreate" v-if="canCreate">
          创建任务
          <MyIcon slot="icon" name="icontianjia" type="main"/>
        </FlatButton>
        <a-divider type="vertical" v-if="canCreate && canExport" />
        <FlatButton v-if="canExport" @click="handleExport">
          导出
          <MyIcon slot="icon" name="icondaochu"/>
        </FlatButton>
      </div>
    </div>

    <TaskList :project-id="projectId" :page="page" :page-size="pageSize" :total="total" :table-data="tableData" :board-data="boardData" :view-type="viewType"
              @change="handleTaskListChange" @pageChange="handlePageChange" ref="taskList" />
  </div>
</template>

<script>
  import FlatButton from '@/components/buttons/FlatButton';
  import MyIcon from "@/components/others/MyIcon";
  import TaskMenu from "./components/menu";
  import TaskList from "./components/list";
  import {
    exportTask,
    getProjectBoard,
    getTaskList
  } from "@/api/task";
  import moment from "moment";
  import BasicTabs from "@/components/tabs/BasicTabs";
  import {isInPermission} from "@/utils/common";

  export default {
    name: 'TaskHome',
    components: {  FlatButton, MyIcon, TaskList, BasicTabs, TaskMenu },
    data() {
      let projectId = parseInt(this.$router.currentRoute.query.id)
      return {
        page: 1,
        pageSize: 15,
        total: 0,
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
            name: '周报显示',
            status: 'weeklyShow'
          },
        ],
        projectId,
        projectName: '',
        tableData: [],
        boardData: [],
        viewType: 0,
        showTypeMenu: false,
        queryType: 'all',
        viewTypes: ['列表', '看板'],
        canCreate: isInPermission('business_task_add'),
        canExport: isInPermission('business_task_view'),
      }
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
            this.tableData.forEach(item => {
              if (item.childrenList) {
                if (item.childrenList.length === 0)
                  delete item.childrenList;
                else {
                  item.childrenList.forEach(child => {
                    child.isChild = true;
                    child.parentId = item.id;
                    if (child.childrenList && child.childrenList.length === 0)
                        delete child.childrenList;
                    }); // end 2
                }
              }
            }) // end 1
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
      handleProjectChange(projectId, projectName) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.loadCurrentList();
        this.$store.dispatch('projectMemberList', this.projectId);
      },
      handleViewType(e) {
        // console.log('test', e)
        this.showTypeMenu = false;
        this.viewType = e.key;
        this.loadCurrentList();
      },
      handleCreate(status) {
        this.$refs.taskList.handleCreate(status);
      },
      handleTaskListChange() {
        this.loadCurrentList();
      },
      handleQueryFilter(e) {
        this.page = 1;
        this.total = 0;
        this.queryType = e.target.value;
        this.loadCurrentList();
      },
      handlePageChange(page, size) {
        this.page = page;
        if (size !== this.pageSize) {
          this.pageSize = size;
          this.page = 1;
        }
        this.loadCurrentList();
      },
      // 导出任务excel
      handleExport() {
        try {
          exportTask(this.projectId, this.queryType==='myTaskFlag', this.queryType==='weeklyShow').then((res)=>{
            let filename = `【${this.projectName}】任务列表-` + moment().format('YYYYMMDD');
            let blob = new Blob([res], {type: "application/vnd.ms-excel"});
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = filename + ".xlsx";
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
  height: 100%;
  overflow: auto;
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
    a.ant-dropdown-link {
      color: #636E95;
      &:hover {
        color: #0064FF;
      }
    }


    .iconfont {
      transition: .2s;
      display: inline-block;
    }
    .upicon {
      transform: rotate(180deg);
    }

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
  .task-list {
    height: calc(100% - 66px);
    max-height: calc(100% - 66px);
    overflow: auto;
  }
}
</style>
<style lang="scss">
  .type-menus {
    padding-top: 9px;
    .ant-dropdown-menu {
      padding: 6px;
      width: 120px;
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
