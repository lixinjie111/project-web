<template>
    <div class="notarchive-deliverables-container">
        <Header title="月度计划" date="2021/04/01 - 2021/04/30" @selected-tree="handleSetSelectedTree"></Header>
        <div class="table-content">
            <BasicTable v-if="tableData.length" 
                :tableData="tableData" 
                :setTableColumns="setTableColumns" 
                :rowClassName="handleRowClassName" 
                :treeConfig="treeConfig"
            ></BasicTable>
            <NoData v-else></NoData>
        </div>
    </div>
</template>

<script>
import Header from './components/Header';
import BasicTable from "@/components/tables/BasicTable";
import TextToolTip from "@/components/tooltip/TextToolTip";
import NoData from './components/NoData';
import Select from './components/Select';

import {isInPermission} from '@/utils/common.js'

export default {
    name: "deliverables",
    components: {Header, TextToolTip, Select, BasicTable, NoData},
    data() {
        return {
            deptId: this.$store.state.users.userInfo.deptId,
            tableData: [],
            treeConfig: {expandAll: true, showIcon: false, children: 'children'},
            setTableColumns: [
                {
                    title: '工作任务',
                    field: 'title',
                    treeNode: true,
                    minWidth: 358,
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
                    field: 'chargePerson',
                    minWidth: 112,
                    showOverflow: true
                },
                {
                    title: '验收标准',
                    field: 'checkStandard',
                    minWidth: 88
                },
                {
                    title: '月度交付物',
                    field: 'deliverable',
                    minWidth: 220,
                    slots: {
                        default: ({row}) => {
                            return [
                                <a class="table-report" href={row.deliverable}><span>{row.deliverableTitle}</span></a>
                            ]
                        }
                    }
                },
                {
                    title: '交付物备注',
                    field: 'remark',
                    minWidth: 220,
                    showOverflow: true,
                    editRender: {
                        name: 'input', 
                        enabled: isInPermission('business_projectdeliverable_edit'),  
                        attrs: {type: 'text', placeholder: '请输入备注'},
                        events: {
                            blur: ({row, column}) => {
                                let data = {id: row.id, [column.property]: column.model.value}
                                column.model.update && this.handlePutProjectDeliverable(data);
                            }
                        }
                    }
                },
                {
                    title: '验收情况',
                    field: 'acceptance',
                    minWidth: 220,
                    showOverflow: true,
                    editRender: {
                        name: 'input', 
                        enabled: isInPermission('business_projectdeliverable_edit'), 
                        attrs: {type: 'text', placeholder: '请输入验收情况'},
                        events: {
                            blur: ({row, column}) => {
                                let data = {id: row.id, [column.property]: column.model.value}
                                column.model.update && this.handlePutProjectDeliverable(data);
                            }
                        }
                    }
                },
                {
                    title: '验收结论',
                    fixed: 'right',
                    minWidth: 145,
                    slots: {
                        default:({row}) => {
                            return [
                                <Select type={isInPermission('business_projectdeliverable_status')} status={row.status} onSelected-status={(status) => this.handleChangeStatus(row, status)}></Select>
                            ]
                        }
                    }
                }
            ]
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
            this.handleGetList()
        },
        // 修改状态
        async handleChangeStatus(row, status){
            try {
                let {code} = await this.$api.report.handlePutDeliverableStatus(row.id, status);
                if(code === 0) {
                  row.status = status; 
                  this.$message.success('修改验收结论成功！') 
                }
            } catch (error) {
                console.log(error)    
            }
        },
        // 查询列表
        async handleGetList(){
            try {
                let {code, data} = await this.$api.report.handleGetDeliverableList(this.deptId);
                if(code === 0) {
                    this.tableData = data;
                }
            } catch (error) {
                console.log(error)
            }
        },
        // 编辑月度交付物
        async handlePutProjectDeliverable(data){
            try {
                let {code} = await this.$api.report.handlePutProjectDeliverable(data);
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
        this.handleGetList()
    }
}
</script>

<style scoped lang="scss">
.notarchive-deliverables-container {
    padding: 0 16px;
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
            left: -1.5rem;
            width: 1.5rem;
            text-align: center;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #97A0C3;
            vertical-align: middle;
        }
    }
    .table-report {
        color: #0064FF;
    }
}
</style>