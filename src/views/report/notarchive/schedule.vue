<template>
    <div class="notarchive-schedule-container">
        <Header title="本周工作进度" date="2021/04/06 - 2021/04/06" @selected-tree="handleSetSelectedTree"></Header>
        <div class="table-content">
            <BasicTable v-if="tableData.length" 
                :tableData="tableData" 
                :setTableColumns="setTableColumns" 
                :rowClassName="handleRowClassName" 
                :treeConfig="{children: 'children', iconOpen: 'iconfont iconxia2', iconClose: 'iconfont iconyou2'}"
            ></BasicTable>
            <NoData v-else></NoData>
        </div>
    </div>
</template>

<script>
    import Header from './components/Header';
    import BasicTable from "@/components/tables/BasicTable";
    import Status from "@/components/business/Status";
    import IconToolTip from "@/components/tooltip/IconToolTip";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import Priority from "@/components/business/Priority";
    import NoData from './components/NoData';
    export default {
        name: "schedule",
        components: {Header, TextToolTip, IconToolTip, Status, Priority, BasicTable, NoData},
        data() {
            return {
                deptId: this.$store.state.users.userInfo.deptId,
                tableData: [
                    {
                        id: 1,
                        projectName: '项目名称项目名称项目名称项目名称项目名称1',
                        projectManger: '项目名称项目名称项目名称项目名称项目名称1',
                        endTime: '2021-02-12',
                        progress: 30,
                        restDay: '20',
                        status: 1,
                        remark: 'iueqiwuo',
                        children: [
                            {
                                id: 11,
                                projectName: '项目名称项目名称项目名称项目名称项目名称1',
                                projectManger: '项目名称项目名称项目名称项目名称项目名称1',
                                endTime: '2021-02-12',
                                progress: 30,
                                restDay: '20',
                                status: 1,
                                remark: 'iueqiwuo',
                            }
                        ]
                    },
                    {
                        id: 2,
                        projectName: '项目名称',
                        projectManger: '222',
                        endTime: '2021-02-12',
                        progress: 30,
                        restDay: '20',
                        status: 2,
                        remark: ''
                    }
                ],
                setTableColumns: [
                    {
                        title: '工作任务',
                        field: 'projectName',
                        treeNode: true,
                        width: 280,
                        slots: {
                            default: ({row, $seq, $rowIndex}) => {
                                return [
                                    <div class="table-name">
                                        <span class={'status' + (parseInt(row.status) + 1)}></span>
                                        <div class="content-name">
                                        <span class={[row?.children ? 'none' : 'index']}>{$seq ? `${$seq}.${$rowIndex + 1}` : $rowIndex + 1}</span>
                                        <TextToolTip className="name" content={row.projectName}
                                                    refName={'table-name' + $rowIndex}></TextToolTip>
                                        </div>
                                    </div>
                                ]
                            }
                        }
                    },
                    {
                        title: '负责人',
                        field: 'projectManger',
                        width: 150,
                        showOverflow: true
                    },
                    {
                        title: '优先级',
                        field: 'status',
                        width: 74,
                        slots: {
                            default: ({row}) => {
                                return [
                                    <Priority percent={row.status} size="small"/>
                                ]
                            }
                        }
                    },
                    {
                        title: '权重',
                        field: 'progress',
                        width: 84,
                        formatter: ({cellValue}) => `${cellValue}%`
                    },
                    {
                        title: '进度',
                        field: 'progress',
                        width: 159,
                        slots: {
                            default: ({row}) => {
                                return [
                                    <a-progress percent={row.progress} size="small"/>
                                ]
                            }
                        }
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
                        title: '时间计划',
                        field: 'endTime',
                        width: 166,
                        slots: {
                            default: ({row}) => {
                                return [
                                    <div class="table-time">
                                        <span>{row.endTime}</span>
                                        <IconToolTip iconName="iconzhuyi" content="已变更"></IconToolTip>
                                    </div>
                                ]
                            }
                        }
                    },
                    {
                        title: '实际结束日期',
                        field: 'restDay',
                        width: 120
                    },
                    {
                        title: '工作进展描述',
                        field: 'remark',
                        showOverflow: true,
                        editRender: {name: 'input', attrs: {type: 'text', placeholder: '请输入备注'}}
                    },
                    {
                        title: '下周工作计划',
                        field: 'remark',
                        showOverflow: true,
                        editRender: {name: 'input', attrs: {type: 'text', placeholder: '请输入备注'}}
                    }
                ]
            }
        },
        methods: {
            // 修改row样式
            handleRowClassName(e){
                let {children = []} = e?.row;
                return children.length ? 'has-children' : '';
            },
            // 修改部门
            handleSetSelectedTree(deptId){
                this.deptId = deptId;
                // 查询table
                this.tableData = []
            }
        },
        mounted() {
            // 查询table
        }
    }
</script>

<style scoped lang="scss">
    .notarchive-schedule-container {
        padding: 0 16px;

        /deep/ .vxe-table--body {
            .has-children {
                background: #F6F8FF;
            }
        }

        .table-name {
            height: 40px;
            line-height: 40px;

            $bgColors: #242F57, #FE774B, #08BD6C, #FF4C60, black;
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

            .content-name {
                position: relative;
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
                width: 220px;
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
    }
</style>