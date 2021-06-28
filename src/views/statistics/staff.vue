<template>
  <div class="statistics-staff-container">
    <ContentHeader type="title" title="人员任务统计">
      <div slot="operation">
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button type="primary" @click="handleExport">导出</a-button>
        </a-config-provider>
      </div>
    </ContentHeader>
    <div class="select-container">
      <DeptTree @selected-tree="handleSetSelectedTree"></DeptTree>
      <div class="time">
        <span class="label">统计时段</span>
        <span class="time-picker">
          <a-range-picker 
            format="YYYY/MM/DD" 
            :inputReadOnly="true" 
            :allowClear="false"
            :value="[moment(startDate, 'YYYY/MM/DD'), moment(endDate, 'YYYY/MM/DD')]"
            @change="handleChangeRange">
            <span class="iconfont iconrili calendar-picker-icon" slot="suffixIcon"></span>
          </a-range-picker>
        </span>
    </div>
    </div>
    <div class="table-content">
        <BasicTable
            class="table"
            rowId="id"
            height="100%"
            :tableData="tableData"
            :setTableColumns="setTableColumns"
            :rowClassName="handleRowClassName"
            :treeConfig="treeConfig"
            :spanMethod="handleRowspanMethod"
        ></BasicTable>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DeptTree from '@/components/tree/DeptTree.vue'
import BasicTable from "@/components/tables/BasicTable";
import Status from "@/components/business/Status";
import TextToolTip from "@/components/tooltip/TextToolTip";
import Priority from "@/components/business/Priority";
import Progress from "@/components/business/Progress"
export default {
  name: "staff",
  components: {DeptTree, BasicTable, Status, TextToolTip, Priority, Progress},
  data(){
    return {
        deptId: this.$store.state.users.userInfo.deptId,
        startDate: '',
        endDate: '',
        treeConfig: {expandAll: true, showIcon: false, children: 'tasks'},
        tableData: [],
        setTableColumns: [
            {
                title: '人员',
                field: 'userName',
                treeNode: true,
                width: 120,
                fixed: 'left',
                slots: {
                    default: ({row, $rowIndex}) => {
                        return [
                            <div class={["table-name", row.isMerge ? 'textCenter':'']}>
                                {!row.isMerge ? <span class={'status' + (parseInt(row.status) + 1)}></span>:null}
                                {
                                    row.userName ?
                                        <TextToolTip className="name" content={row.userName} refName={'table-name' + $rowIndex}></TextToolTip>
                                        :
                                    row.isMerge ?
                                        '合计工时'
                                        :
                                    ''
                                }
                            </div>
                        ]
                    }
                }
            },
            {
                title: '工作任务',
                field: 'projectName',
                width: 360,
                showOverflow: true,
                slots: {
                    default: ({row}) => {
                        return [
                            <span>{row.projectName? row.projectName : row.taskName}</span>
                        ]
                    }
                }
            },
            {
                title: '优先级',
                field: 'priority',
                width: 72,
                slots: {
                    default: ({row}) => {
                        return [
                            <span>
                                {
                                    row.hasOwnProperty('priority') && row.priority!== null ?
                                    <Priority value={row.priority} size="small"/>
                                    :
                                    null
                                }
                            </span>
                        ]
                    }
                }
            },
            {
                title: '时间计划',
                field: 'beginTime',
                width: 240,
                slots: {
                    default: ({row}) => {
                        let {beginTime, endTime, planBeginTime, planEndTime} = row;
                        let start = beginTime ? beginTime : planBeginTime;
                        let end = endTime ? endTime : planEndTime;
                        return [
                            <p class="table-time">
                                <span class="time text-right">{start}</span>
                                <span class="spead">-</span>
                                <span class="time text-left">{end}</span>
                            </p>
                        ]
                    }
                }
            },
            {
                title: '消耗工时',
                field: 'actualHour',
                width: 100,
            },
            {
                title: '剩余工时',
                field: 'restHour',
                width: 100,
            },
            {
                title: '总工时',
                field: 'planHour',
                width: 100,
            },
            {
                title: '状态',
                field: 'status',
                width: 96,
                slots: {
                    default: ({row}) => {
                        return [
                            <span>
                                {
                                    row.hasOwnProperty('status') && row.status !== null  ?
                                    <Status value={row.status}></Status>
                                    :
                                    null
                                }
                            </span>
                        ]
                    }
                }
            },
            {
                title: '进度',
                field: 'progress',
                width: 132,
                slots: {
                    default: ({row}) => {
                        if(row.hasOwnProperty('progress') &&  row.progress!== null) {
                            row.progress = /(\d{0,})%/.test(row.progress) ? RegExp.$1 : row.progress;
                        }
                        return [
                            <span>
                                {
                                    row.hasOwnProperty('progress') && row.progress!== null ?
                                    <Progress percent={Number(row.progress)} status={row.status}/>
                                    :
                                    null
                                }
                            </span>
                        ]
                    }
                }
            },
            {
                title: '实际结束日期',
                field: 'actualEndTime',
                width: 132
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
    moment,
    // 修改row样式
    handleRowClassName(e){
        let {level, row} = e;
        return !level && !row.isMerge? 'has-children' : '';
    },
    // 合并表格
    handleRowspanMethod({ row, _columnIndex, _rowIndex }){
        if(!!row?.isMerge){
            let col = [1, 2, 3, 8, 9, 10]
            if (_columnIndex === 0) {
                return {colspan: 4}
            } else if (_columnIndex === 7){
                return {colspan: 4}
            } else if (col.includes(_columnIndex)) {
                return { colspan: null }
            }
        }
    },
    // 导出接口
    handleExport() {
        try {
            let {deptId, startDate, endDate} = this;
            this.$api.statistics.handleExportStaff({deptId, startDate, endDate}).then((res)=>{
                let blob = new Blob([res], {type: "application/vnd.ms-excel"});
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = url;
                a.download = `人员任务统计${moment(new Date()).format('YYYYMMDD')}.xlsx`;
                a.click();
                window.URL.revokeObjectURL(url);
            });
        }catch(error){
            console.log(error)
        }
    },
    // 修改部门
    handleSetSelectedTree(deptId){
      this.deptId = deptId;
      // 查询table
      this.handleGetList();
    },
    // 切换查询周期
    handleChangeRange(moments, dates){
        let startDate = dates[0];
        let endDate = dates[1];
        let bool = this.startDate !== startDate || this.endDate !== endDate;
        this.startDate = startDate;
        this.endDate = endDate;
        bool && this.handleGetList();
    },
    // 预处理数据
    handlePreData(data){
        let result = [];
        data?.map(item => { // 项目降级
            let {userName, ...rest} = item;
            item.projects[0].userName = userName;
            let {restHour, planHour, actualHour} = rest;
            result = [...result, ...item.projects, {restHour, planHour, actualHour, isMerge: true}];
        });
        console.log(result)
        return result;
    },
    async handleGetList(){
        try {
            let {code, data} = await this.$api.statistics.handleGetUserTask({deptId: this.deptId, startDate: this.startDate, endDate: this.endDate});
            if(code === 0) {
                this.$set(this, 'tableData', this.handlePreData(data));
            }
        } catch (error) {
            console.log(error)
        }
    }
  },
  mounted(){
    let start = moment(localStorage.getItem('serverDate')).subtract(6, 'days').format('YYYY/MM/DD');
    let end = moment(localStorage.getItem('serverDate')).format('YYYY/MM/DD');
    this.startDate = start;
    this.endDate = end;
    this.handleGetList();
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/variables.scss';
.statistics-staff-container {
  padding: 0 16px 24px;
  height: 100%;

  .table-content {
      height: calc(100% - 124px);
      min-height: 100px;
  }

  .select-container {
    display: flex;
    padding: 6px 8px 14px;
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
  /deep/ .vxe-table--body {
        .has-children {
            background: #F6F8FF;
        }
    }

    .table-name {
        height: 40px;
        line-height: 40px;

        // $bgColors: #242F57, #FE774B, #08BD6C, #FF4C60, black;
        $bgColors: $status-font;
        @each $bg in $bgColors {
            $i: index($bgColors, $bg);
            .status#{$i} {
                position: absolute;
                left: -8px;
                top: 0px;
                width: 4px;
                height: 40px;
                background: nth($bgColors, $i);
                line-height: 24px;
            }
        }
        &.textCenter {
            text-align: center;
        }

        .index {
            position: absolute;
            left: -1.5rem;
            width: 1.5rem;
            text-align: center;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #97A0C3;
            vertical-align: middle;
        }
        .none {
            display: none;
        }

        .text-tooltip {
            display: inline-block;
            vertical-align: top;
            width: 100%;
        }
    }

    .table-time {
        .icon-tooltip {
            margin-left: 5px;
            display: inline-block;

            /deep/ .iconzhuyi {
                color: #FF4C60;
                vertical-align: -1px;
            }
        }
    }
    .table-time {
        display: flex;
        line-height: 24px;
        background: #F4F7FC;
        border-radius: 2px;
        .time {
            flex: 1;
            &.text-left {
                text-align: left;
            }
            &.text-right {
                text-align: right;
            }
        }
        .spead {
            padding: 0 5px;
        }
    }

}
</style>
