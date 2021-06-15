<template>
    <div class="report-archive-container">
        <div class="header">
            <span class="title">已归档的周报</span>
            <span class="date">
                <!-- <a-date-picker v-model="dateTime" :allowClear="false" format="YYYY/MM/DD HH:mm" value-format="YYYY-MM-DD HH:mm"  @openChange="(status) => !status && handleGetList()"/> -->
                <a-range-picker format="YYYY-MM-DD" @change="handleChangeRange">
                    <span class="iconfont iconrili calendar-picker-icon" slot="suffixIcon"></span>
                </a-range-picker>
            </span>
        </div>
        <div class="content">
            <BasicTable :tableData="tableData" :setTableColumns="setTableColumns"></BasicTable>
            <Pagination v-if="total > pageSize" :total="total" :curPageNum="curPageNum" :pageSize="pageSize" @pagination-change-pagesize="handleChangePageSize" @pagination-change-page="handleChangePage"></Pagination>
        </div>
    </div>
</template>

<script>
import BasicTable from '@/components/tables/BasicTable.vue'
import {isInPermission} from '@/utils/common.js'
export default {
  name: "archive",
  components: {BasicTable},
  data(){
      return {
        total: null, // 总数据条数
        pageSize: 10, // 页面数据size
        curPageNum: 1, // 当前页码

        beginTime: '',
        endTime: '',

        tableData: [],
        // 配置表格各字段
        setTableColumns: [
            {title: ' ', type: 'seq', width: 50},
            {title: '周报周期', field: 'updatedTime', width: 400,showOverflow: true,
                slots: {
                    default: ({row}) => {
                        return [
                            <span>{row.beginTime} 至 {row.endTime}</span>
                        ]
                    }
                }
            },
            {title: '归档日期', field: 'archiveTime'},
            {title: '操作', width: '90',
                visible: isInPermission('sys_role_edit') || isInPermission('sys_role_del'),
                slots: {
                    default: ({row}) => {
                        return [
                            <div class="operations">
                              {isInPermission('sys_role_del') ? <a href={row.url}><span class="iconfont iconxiazai"></span></a> : null}
                            </div>
                        ]
                    }
                }
            },
        ],
      }
  },
  methods: {
    isInPermission,
    // 切换条目数量
    handleChangePageSize(pageSize, pageNum) {
        console.log(pageSize)
      this.pageSize = pageSize;
      if(pageNum) this.curPageNum = pageNum;
      this.handleGetList();
    },
    // 切换当前页码
    handleChangePage(pageNum){
      this.curPageNum = pageNum;
      this.handleGetList();
    },
    // 切换查询周期
    handleChangeRange(moments, dates){
        let beginTime = dates[0];
        let endTime = dates[1];
        let bool = this.beginTime !== beginTime || this.endTime !== endTime;
        this.beginTime = beginTime;
        this.endTime = endTime;
        bool && this.handleGetList();
    },
    // 查询列表
    async handleGetList(){
        try {
            let params = {current: this.curPageNum, size: this.pageSize, beginTime: this.beginTime, endTime: this.endTime};
            let {code, data} = await this.$api.report.handleGetArchiveList(params);
            if(code === 0) {
                let {total, records} = data;
                this.total = total;
                this.tableData = records;
            }
        } catch (error) {
            console.log(error)
        }
    }
  },
  mounted(){
      this.handleGetList();
  }
}
</script>

<style scoped lang="scss">
.report-archive-container {
  padding: 24px 16px; 
  .header {
    padding: 0 8px;
    margin-bottom: 16px;
    height: 44px;
    line-height: 44px;
    .title {
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #242F57;
      &:after {
        display: inline-block;
        content: '';
        width: 13px;
        height: 16px;
        margin-right: 12px;
        border-right: 1px solid #EAEDF7;
      }
    }
    /deep/ .ant-input {
        padding: 0;
        height: 32px;
        line-height: 32px;
    }
  }
  .operations {
      color: #999;
      a {
          color: #999;
      }
  }
}
</style>