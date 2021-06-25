<template>
    <div class="notarchive-plan-container">
       <Header title="月度计划" :date="`${startTime} - ${endTime}`" @selected-tree="handleSetSelectedTree"></Header>
        <div class="table-content">
            <BasicTable v-if="tableData.length" 
                :tableData="tableData" 
                :setTableColumns="setTableColumns" 
                :rowClassName="handleRowClassName" 
                :treeConfig="treeConfig"
            ></BasicTable>
            <NoData v-else :title="!archiveId ? '暂无月度计划': '该部门未制定本月月度计划'" :isShowBtn="!archiveId"></NoData>
        </div>
    </div>
</template>

<script>
import Header from './components/Header';
import BasicTable from "@/components/tables/BasicTable";
import IconToolTip from "@/components/tooltip/IconToolTip";
import TextToolTip from "@/components/tooltip/TextToolTip";
import NoData from './components/NoData';
import Select from './components/Select';

import {isInPermission} from '@/utils/common.js'

export default {
    name: "plan",
    components: {Header, TextToolTip, IconToolTip, Select, BasicTable, NoData},
    data() {
        return {
            startTime: '',
            endTime: '',
            deptId: this.$store.state.users.userInfo.deptId,
            tableData: [],
            treeConfig: {expandAll: true, showIcon: false, children: 'children'},
            setTableColumns: [
                {
                    title: '工作任务',
                    field: 'title',
                    treeNode: true,
                    minWidth: 360,
                    fixed: 'left',
                    slots: {
                        default: ({row, $rowIndex, $seq}) => {
                            return [
                                <div class="table-name">
                                    <span class="index">{$seq ? `${$seq}.${$rowIndex + 1}` : $rowIndex + 1}</span>
                                    <TextToolTip className="name" content={row.title}
                                                refName={'table-name' + $rowIndex}></TextToolTip>
                                </div>
                            ]
                        }
                    }
                },
                {
                    title: '负责人',
                    field: 'master',
                    // width: '8.5%',
                    width: 120,
                    showOverflow: true
                },
                {
                    title: '月度工作计划描述',
                    field: 'description',
                    minWidth: 240,
                    editRender: {
                        name: 'input', 
                        enabled: isInPermission('business_projectmonth_edit'), 
                        attrs: {type: 'text', placeholder: '请输入月度工作计划描述'},
                        events: {
                            blur: ({row, column}) => {
                                let data = {id: row.id, [column.property]: column.model.value}
                                column.model.update && this.handlePutProjectMonth(data);
                            }
                        }
                    }
                },
                {
                    title: '月度交付物',
                    field: 'deliverable',
                    minWidth: 100,
                    editRender: {
                        name: 'input', 
                        enabled: isInPermission('business_projectmonth_edit'), 
                        attrs: {type: 'text', placeholder: '请输入月度交付物'}, 
                        events: {
                            blur: ({row, column}) => {
                                let data = {id: row.id, [column.property]: column.model.value}
                                column.model.update && this.handlePutProjectMonth(data);
                            }
                        }
                    }
                },
                {
                    title: '验收标准',
                    field: 'acceptanceCriteria',
                    width: 100,
                    editRender: {
                        name: 'input', 
                        enabled: isInPermission('business_projectmonth_edit'), 
                        attrs: {type: 'text', placeholder: '请输入验收标准'},
                        events: {
                            blur: ({row, column}) => {
                                let data = {id: row.id, [column.property]: column.model.value}
                                column.model.update && this.handlePutProjectMonth(data);
                            }
                        }
                    }
                },
                {
                    title: '任务开始日期',
                    field: 'beginTime',
                    width: 132,
                    slots: {
                        default: ({row}) => {
                            return [
                                <div class="table-time">
                                    <span>{row.beginTime}</span>
                                    {
                                        row.newFlag === 1 ? 
                                        <IconToolTip iconName="iconrili-qitian-tianchong" content="本周新增"></IconToolTip>
                                        :
                                        row.newFlag == 2 ?
                                        <IconToolTip iconName="iconrili-sanshitian-tianchong" content="本月新增"></IconToolTip>
                                        :
                                        ''
                                    }
                                </div>
                            ]
                        }
                    }
                },
                {
                    title: '任务截止日期',
                    field: 'endTime',
                    width: 132,
                    slots: {
                        default: ({row}) => {
                            return [
                                <div class="table-time">
                                    <span>{row.endTime}</span>
                                    {
                                        row.deadlineFlag === 1 ? 
                                        <IconToolTip iconName="iconrili-yuechu-tianchong" content="上月延期"></IconToolTip>
                                        :
                                        row.deadlineFlag == 2 ?
                                        <IconToolTip iconName="iconrili-yuemo-tianchong" content="本月截止"></IconToolTip>
                                        :
                                        ''
                                    }
                                </div>
                            ]
                        }
                    }
                },
                {
                    title: '备注',
                    field: 'remark',
                    minWidth: 120,
                    showOverflow: true,
                    editRender: {
                        name: 'input', 
                        enabled: isInPermission('business_projectmonth_edit'), 
                        attrs: {type: 'text', placeholder: '请输入备注'},
                        events: {
                            blur: ({row, column}) => {
                                let data = {id: row.id, [column.property]: column.model.value}
                                column.model.update && this.handlePutProjectMonth(data);
                            }
                        }
                    }
                },
                {
                    title: '任务验收结论',
                    fixed: 'right',
                    width: 102,
                    slots: {
                        default:({row}) => {
                            return [
                                <Select type={isInPermission('business_projectmonth_status')} status={row.status} onSelected-status={(status) => this.handleChangeStatus(row, status)}></Select>     
                            ]
                        }
                    }
                }
            ]
        }
    },
    computed: {
        archiveId(){ // 归档id
            return this.$store.state.report.archiveId
        }
    },
    methods: {
        // 修改row样式
        handleRowClassName(e){
            let {level} = e;
            return !level ? 'has-children' : '';
        },
        // 修改部门
        handleSetSelectedTree(deptId){
            this.deptId = deptId;
            // 查询table
            this.handleGetMonthList()
        },
        // 切换状态
        async handleChangeStatus(row, status){
            try {
                let {code} = await this.$api.report.handlePutMonthStatus(row.id, status);
                if(code === 0){
                    row.staus = status;
                }   
            } catch (error) {
                console.log(error)
            }
            row.status = status;
        },
        // 查询列表
        async handleGetMonthList() {
            try {
                let {code, data} = await this.$api.report.handleGetMonthList(this.deptId);
                if(code === 0) {
                    let {archiveId, startTime, endTime, list} = data;
                    this.startTime = startTime || '';
                    this.endTime = endTime || '';
                    this.tableData = list || [];
                    this.$store.dispatch('initArchiveId', archiveId || '');
                }
            }catch(error) {

            }
        },
        // 编辑月度计划
        async handlePutProjectMonth(data){
            try {
                let {code} = await this.$api.report.handlePutProjectMonth(data);
                if(code === 0){
                    this.$message.success('修改成功！')
                }
            }catch(error){
                console.log(error)
            }
        }
    },
    mounted() {
        // 查询table
        this.handleGetMonthList()
    }
}
</script>

<style scoped lang="scss">
.notarchive-plan-container {
    /deep/ .vxe-table--body {
        .has-children {
            background: #F6F8FF;
        }
    }
    .table-name {
        height: 40px;
        line-height: 40px;
        position: relative;

        .index {
            position: absolute;
            left: -2rem;
            width: 2rem;
            text-align: center;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #97A0C3;
            vertical-align: middle;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .table-time {
        .icon-tooltip {
            margin-left: 5px;
            display: inline-block;

            /deep/ .iconfont {
                color: #FF4C60;
                vertical-align: -1px;
            }
        }
    }
}
</style>