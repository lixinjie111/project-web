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

    import {isInPermission} from '@/utils/common.js'

    export default {
        name: "schedule",
        components: {Header, TextToolTip, IconToolTip, Status, Priority, BasicTable, NoData},
        data() {
            return {
                deptId: this.$store.state.users.userInfo.deptId,
                tableData: [],
                setTableColumns: [
                    {
                        title: '工作任务',
                        field: 'title',
                        treeNode: true,
                        width: 280,
                        slots: {
                            default: ({row, $seq, $rowIndex}) => {
                                return [
                                    <div class="table-name">
                                        <span class={'status' + (parseInt(row.status) + 1)}></span>
                                        <div class="content-name">
                                        <span class={[row?.children ? 'none' : 'index']}>{$seq ? `${$seq}.${$rowIndex + 1}` : $rowIndex + 1}</span>
                                        <TextToolTip className="name" content={row.title}
                                                    refName={'table-name' + $rowIndex}></TextToolTip>
                                        </div>
                                    </div>
                                ]
                            }
                        }
                    },
                    {
                        title: '负责人',
                        field: 'projectMaster',
                        width: 150,
                        showOverflow: true
                    },
                    {
                        title: '优先级',
                        field: 'priority',
                        width: 74,
                        slots: {
                            default: ({row}) => {
                                return [
                                    <Priority percent={row.priority} size="small"/>
                                ]
                            }
                        }
                    },
                    {
                        title: '权重',
                        field: 'weight',
                        width: 84,
                        // formatter: ({cellValue}) => `${cellValue}%`
                    },
                    {
                        title: '进度',
                        field: 'progress',
                        width: 159,
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
                        field: 'planTime',
                        width: 166,
                        slots: {
                            default: ({row}) => {
                                return [
                                    <div class="table-time">
                                        <span>{row.planTime}</span>
                                    </div>
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
                        title: '工作进展描述',
                        field: 'description',
                        minWidth: 120,
                        showOverflow: true,
                        editRender: {name: 'input', enabled: isInPermission('business_projectweek_edit'),attrs: {type: 'text', placeholder: '请输入工作进展描述'}}
                    },
                    {
                        title: '下周工作计划',
                        field: 'nextWeekWork',
                        minWidth: 120,
                        showOverflow: true,
                        editRender: {name: 'input', enabled: isInPermission('business_projectweek_edit'), attrs: {type: 'text', placeholder: '请输入下周工作计划'}}
                    },
                    {
                        title: '备注',
                        field: 'remark',
                        minWidth: 120,
                        showOverflow: true,
                        editRender: {name: 'input', enabled: isInPermission('business_projectweek_edit'), attrs: {type: 'text', placeholder: '请输入备注'}}
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
            // 修改部门
            handleSetSelectedTree(deptId){
                this.deptId = deptId;
                // 查询table
                this.handleGetList();
            },
            async handleGetList() {
                try {
                    let {code, data} = await this.$api.report.handleGetWeekList(this.deptId);
                    if(code === 0){
                        this.tableData = data;
                    }
                    console.log(data)
                } catch (error) {
                    console.log(error)
                }
            }
        },
        mounted() {
            // 查询table
            this.$nextTick(() => {
                this.handleGetList()
            })
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