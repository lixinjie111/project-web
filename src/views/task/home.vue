<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <a-radio-group default-value="a" size="large">
          <a-radio-button value="a" class="all">
            全部
            <span>8</span>
          </a-radio-button>
          <a-radio-button value="b">
            指派给我
          </a-radio-button>
          <a-radio-button value="c">
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
    <TreeTable :columns="tableColumns" :data-source="tableData" v-if="viewType===0"/>
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
    <TaskAdd :isShow="showCreate" @cancel="showCreate = false" @ok="handleCreateOK" />
    <TaskEdit :isShow="showEdit" @cancel="showEdit = false" @ok="handleEditClose" :value="tableData[0]" @create-child="handleCreate" />
  </div>
</template>

<script>
  import TreeTable from '@/components/tables/TreeTable';
  import FlatButton from '@/components/buttons/FlatButton';
  import MyIcon from "@/components/others/MyIcon";
  import TaskAdd from "./components/add";
  import TaskEdit from "./components/edit";
  import draggable from 'vuedraggable';

  export default {
    name: 'TaskHome',
    components: { TreeTable, FlatButton, MyIcon, TaskAdd, TaskEdit, draggable },
    data() {
      return {
        tableData: [
          { id: 1000, name: 'vxe-table 从入门到放弃1', status: 3, type: 'mp3', size: 1024, date: '2020-08-01' },
          {
            id: 1005,
            name: 'Test2',
            status: 1,
            type: 'mp4',
            size: null,
            date: '2021-04-01',
            children: [
              { id: 24300, name: 'Test3', status: 1, type: 'avi', size: 1024, date: '2020-03-01' },
              { id: 20045, name: 'vxe-table 从入门到放弃4', status: 1, type: 'html', size: 600, date: '2021-04-01' },
              {
                id: 10053,
                name: 'vxe-table 从入门到放弃96',
                status: 1,
                type: 'avi',
                size: null,
                date: '2021-04-01',
                children: [
                  { id: 24330, name: 'vxe-table 从入门到放弃5', status: 1, type: 'txt', size: 25, date: '2021-10-01' },
                  { id: 21011, name: 'Test6', status: 2, type: 'pdf', size: 512, date: '2020-01-01' },
                  { id: 22200, name: 'Test7', status: 1, type: 'js', size: 1024, date: '2021-06-01' }
                ]
              }
            ]
          },
          { id: 23666, name: 'Test8', status: 1, type: 'xlsx', size: 2048, date: '2020-11-01' },
          { id: 24555, name: 'vxe-table 从入门到放弃9', status: 1, type: 'avi', size: 224, date: '2020-10-01' }
        ],
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
            dataIndex: 'name',
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
            dataIndex: 'type',
            title: '任务类型',
          },
          {
            dataIndex: 'type',
            title: '负责人',
          },
          {
            dataIndex: 'type',
            title: '执行者',
          },
          {
            dataIndex: 'type',
            title: '工时/消耗',
          },
          {
            dataIndex: 'type',
            title: '工时/剩余',
          },
          {
            dataIndex: 'status',
            title: '进度',
            scopedSlots: {
              customRender: 'progress'
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
        showEdit: true,
        viewType: 0,
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
    methods: {
      handleViewType(e) {
        // console.log('test', e)
        this.viewType = e.key;
      },
      handleCreate() {
        console.log('test')
        this.showCreate = true;
      },
      handleEdit() {
        this.showEdit = true;
      },
      handleCreateOK(data) {
        this.showCreate = false;
      },
      handleEditClose() {
        this.showEdit = false;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
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
