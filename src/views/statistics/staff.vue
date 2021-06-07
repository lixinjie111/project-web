<template>
  <div class="statistics-staff-container">
    <ContentHeader type="title" title="人员任务统计">
      <div slot="operation">
        <a-button type="primary" @click="handleExport">导出</a-button>
      </div>
    </ContentHeader>
    <div class="select-container">
      <DeptTree @selected-tree="handleSetSelectedTree"></DeptTree>
      <div class="time">
        <span class="label">统计时段</span>
        <span class="time-picker">
          <a-range-picker @change="handleChangeRange">
            <span class="iconfont iconrili calendar-picker-icon" slot="suffixIcon"></span>
          </a-range-picker>
        </span>
    </div>
    </div>
    <BasicTable v-if="tableData.length" 
        :tableData="tableData" 
        :setTableColumns="setTableColumns" 
        :rowClassName="handleRowClassName" 
        :treeConfig="treeConfig"
    ></BasicTable>
    <!-- <NoData v-else></NoData> -->
  </div>
</template>

<script>
import DeptTree from '@/components/tree/DeptTree.vue'
import BasicTable from "@/components/tables/BasicTable";
import Status from "@/components/business/Status";
import TextToolTip from "@/components/tooltip/TextToolTip";
import Priority from "@/components/business/Priority";
export default {
  name: "staff",
  components: {DeptTree, BasicTable, Status, TextToolTip, Priority},
  data(){
    return {
        deptId: this.$store.state.users.userInfo.deptId,
        startTime: '',
        endTime: '',
        treeConfig: {expandAll: true, showIcon: false, children: 'children'},
        tableData: [
            {
                "children": [
                    {
                        "actualEndTime": "2021-06-02",
                        "beginTime": "04/01",
                        "endTime": "04/01",
                        "id": 213423,
                        "progress": "90%",
                        "projectName": "项目名称",
                        "remark": "备注",
                        "status": 1,
                        "statusDesc": "已延期",
                        "children": [
                            {
                                "childrenList": [
                                    {
                                        "childrenList": [
                                            {}
                                        ],
                                        "endTime": "2021-04-01",
                                        "executorList": "111,222",
                                        "id": 213423,
                                        "masterList": "111,222",
                                        "priority": 0,
                                        "priorityDesc": 0,
                                        "progress": "90%",
                                        "restHour": 180,
                                        "status": 0,
                                        "statusDesc": 0,
                                        "taskExecutor": "333,444",
                                        "taskMaster": "111,222",
                                        "taskName": "任务名称",
                                        "taskType": 0,
                                        "taskTypeDesc": 0,
                                        "usedHour": 180,
                                        "workHour": 180
                                    }
                                ],
                                "endTime": "2021-04-01",
                                "executorList": "111,222",
                                "id": 213423,
                                "masterList": "111,222",
                                "priority": 0,
                                "priorityDesc": 0,
                                "progress": "90%",
                                "restHour": 180,
                                "status": 0,
                                "statusDesc": 0,
                                "taskExecutor": "333,444",
                                "taskMaster": "111,222",
                                "taskName": "任务名称",
                                "taskType": 0,
                                "taskTypeDesc": 0,
                                "usedHour": 180,
                                "workHour": 180
                            }
                        ]
                    }
                ],
                "restHour": 20,
                "usedHour": 20,
                "userName": "陈思哲",
                "workHour": 20
            }
        ],
        setTableColumns: [
            {
                title: '人员',
                field: 'userName',
                minWidth: 280,
                slots: {
                    default: ({row, $seq, $rowIndex}) => {
                        let result ={}
                        return [
                            <div class="table-name">
                                {
                                    row.userName ?
                                    <div>
                                        <span class={'status' + (parseInt(row.status) + 1)}></span>
                                        <div class="content-name">
                                            <span class={[row?.children ? 'none' : 'index']}>{$seq ? `${$seq}.${$rowIndex + 1}` : $rowIndex + 1}</span>
                                            <TextToolTip className="name" content={row.userName} refName={'table-name' + $rowIndex}></TextToolTip>
                                        </div> 
                                    </div> 
                                    :
                                    null 
                                }
                            </div>
                        ]
                    }
                }
            },
            {
                title: '工作任务',
                field: 'projectName',
                minWidth: 264,
                showOverflow: true
            },
            {
                title: '优先级',
                field: 'priority',
                minWidth: 74,
                slots: {
                    default: ({row}) => {
                        return [
                            <div>
                                {
                                    row.priority ? 
                                    <Priority percent={row.priority} size="small"/>
                                    :
                                    null
                                }
                            </div>
                        ]
                    }
                }
            },
            {
                title: '时间计划',
                field: 'planTime',
                minWidth: 166
            },
            {
                title: '工时/消耗',
                field: 'usedHour',
                minWidth: 95,
                // formatter: ({cellValue}) => `${cellValue}%`
            },
            {
                title: '工时/剩余',
                field: 'restHour',
                minWidth: 95,
            },
            {
                title: '总工时',
                field: 'workHour',
                minWidth: 86,
            },
            {
                title: '状态',
                field: 'status',
                width: 96,
                slots: {
                    default: ({row}) => {
                        return [
                            <Status value={row.status}></Status>
                        ]
                    }
                }
            },
            {
                title: '进度',
                field: 'progress',
                minWidth: 126,
                slots: {
                    default: ({row}) => {
                        row.progress = /(\d{0,})%/.test(row.progress) ? RegExp.$1 : row.progress;
                        return [
                            <a-progress percent={Number(row.progress)} size="small"/>
                        ]
                    }
                }
            },
            {
                title: '实际结束日期',
                field: 'actualEndTime',
                minWidth: 120
            },
            {
                title: '备注',
                field: 'remark',
                minWidth: 120,
                showOverflow: true,
            },
        ]
    }
  },
  methods: {
    // 修改row样式
    handleRowClassName(e){
        let {children = []} = e?.row;
        return children.length ? 'has-children' : '';
    },
    handleExport() {

    },
    // 修改部门
    handleSetSelectedTree(deptId){
      this.deptId = deptId;
      // 查询table
    //   this.handleGetList();
    },
    // 切换查询周期
    handleChangeRange(startTime, endTime){
        console.log(startTime, endTime)
    },
    async handleGetList(){
        try {
            let {code, data} = await this.$api.statistics.handleGetUserTask({deptId: this.deptId, startTime: this.startTime, endTime: this.endTime})
        } catch (error) {
            console.log(error)
        }
    }
  },
  mounted(){
    //   this.handleGetList()
  }
}
</script>

<style scoped lang="scss">
.statistics-staff-container {
  padding: 0 16px;
  .select-container {
    display: flex;
    padding: 6px 0;
    .time {
        .label {
            margin: 0 12px 0 24px;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #636E95;
            line-height: 24px;
        }
    }
    /deep/ .ant-input {
        height: 32px;
        padding: 5px 8px;
        .ant-calendar-range-picker-input {
            vertical-align: top;
        }
    }
    .calendar-picker-icon {
        transition: all 0.3s;
    }
    /deep/ .ant-calendar-picker:hover .calendar-picker-icon {
        opacity: 0;
        pointer-events: auto;
    }
  }
}
</style>