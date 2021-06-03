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
export default {
    name: "deliverables",
    components: {Header, TextToolTip, Select, BasicTable, NoData},
    data() {
        return {
            deptId: this.$store.state.users.userInfo.deptId,
            tableData: [
                    {
                        id: 1,
                        projectName: '项目名称项目名称项目名称项目名称项目名称1',
                        projectManger: '项目名称项目名称项目名称项目名称项目名称1',
                        desc: '根据原型和业务逻辑，完成前端页面开发',
                        good: '前端页面',
                        startTime: '2021-02-12',
                        endTime: '2021-02-12',
                        status: 1,
                        remark: 'iueqiwuo',
                        children: [
                            {
                                id: 11,
                                projectName: '项目名称项目名称项目名称项目名称项目名称1',
                                projectManger: '项目名称项目名称项目名称项目名称项目名称1',
                                desc: '根据原型和业务逻辑，完成前端页面开发',
                                good: '前端页面',
                                startTime: '2021-02-12',
                                endTime: '2021-02-12',
                                status: 1,
                                remark: 'iueqiwuo',
                            },
                            {
                                id: 11,
                                projectName: '名称1',
                                projectManger: '11111',
                                desc: '根据原型和业务逻辑，完成前端页面开发',
                                good: '前端页面',
                                startTime: '2021-02-12',
                                endTime: '2021-02-12',
                                status: 3,
                                remark: 'iueqiwuo',
                            }
                        ]
                    },
                    {
                        id: 2,
                        projectName: '项目名称',
                        projectManger: '222',
                        desc: '根据原型和业务逻辑，完成前端页面开发',
                        good: '前端页面',
                        startTime: '2021-02-12',
                        endTime: '2021-02-12',
                        status: 2,
                        remark: '',
                        children: [
                            {
                                id: 22,
                                projectName: '名称2',
                                projectManger: '11111',
                                desc: '根据原型和业务逻辑，完成前端页面开发',
                                good: '前端页面',
                                startTime: '2021-02-12',
                                endTime: '2021-02-12',
                                status: 1,
                                remark: 'iueqiwuo',
                            }
                        ]
                    }
                ],
            treeConfig: {expandAll: true, showIcon: false, children: 'children'},
            setTableColumns: [
                {
                    title: '工作任务',
                    field: 'projectName',
                    treeNode: true,
                    minWidth: 358,
                    slots: {
                        default: ({row, $rowIndex, $seq}) => {
                            return [
                                <div class="table-name">
                                    <span class="index">{$seq ? `${$seq}.${$rowIndex + 1}` : $rowIndex + 1}</span>
                                    <TextToolTip className="name" content={row.projectName}
                                                refName={'table-name' + $rowIndex}></TextToolTip>
                                </div>
                            ]
                        }
                    }
                },
                {
                    title: '负责人',
                    field: 'projectManger',
                    minWidth: 112,
                    showOverflow: true
                },
                {
                    title: '验收标准',
                    field: 'status',
                    minWidth: 88
                },
                {
                    title: '月度交付物',
                    field: 'good',
                    minWidth: 220,
                    slots: {
                        default: () => {
                            return [

                            ]
                        }
                    }
                },
                {
                    title: '交付物备注',
                    field: 'remark',
                    minWidth: 220,
                    showOverflow: true,
                    editRender: {name: 'input', attrs: {type: 'text', placeholder: '请输入备注'}}
                },
                {
                    title: '验收情况',
                    field: 'remark',
                    minWidth: 220,
                    showOverflow: true,
                    editRender: {name: 'input', attrs: {type: 'text', placeholder: '请输入验收情况'}}
                },
                {
                    title: '验收结论',
                    fixed: 'right',
                    minWidth: 145,
                    slots: {
                        default:({row}) => {
                            return [
                                <Select status={row.status} onSelected-status={(status) => this.handleChangeStatus(row, status)}></Select>
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
            this.tableData = []
        },
        // 
        handleChangeStatus(row, status){
            console.log(row, status)
            row.status = status;
        }
    },
    mounted() {
        // 查询table
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