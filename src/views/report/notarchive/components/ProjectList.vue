<template>
    <div class="project-list-container">
        <div class="header">重点项目</div>
        <template v-if="list.length">
            <Collapse :title="item.title" v-for="(item,index) in list" :key="index">
                <BasicTable :tableData="item.children" :setTableColumns="setTableColumns"></BasicTable>
            </Collapse>
        </template>
        <template v-else>
            <div class="no-data">
                <img src="@/assets/images/report/no-data.png" />
                <div class="title">暂无重点项目</div>
            </div>
        </template>
    </div>
</template>

<script>
    import BasicTable from "@/components/tables/BasicTable";
    import Status from "@/components/business/Status";
    import IconToolTip from "@/components/tooltip/IconToolTip";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import Collapse from "@/components/collapse/Collapse";
    import {isInPermission} from '@/utils/common.js';

    export default {
        name: "project",
        components: {Collapse, TextToolTip, IconToolTip, Status, BasicTable},
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        data() {
            return {
                setTableColumns: [
                    {
                        title: '项目名称',
                        field: 'projectName',
                        width: 280,
                        slots: {
                            default: ({row, rowIndex}) => {
                                return [
                                    <div class="table-name">
                                        <span class={'status' + (parseInt(row.status) + 1)}></span>
                                        <span class="index">{rowIndex + 1}</span>
                                        <TextToolTip className="name" content={row.title}
                                                     refName={'table-name' + rowIndex}></TextToolTip>
                                    </div>
                                ]
                            }
                        }
                    },
                    {
                        title: '负责人',
                        field: 'projectMaster',
                        showOverflow: true
                    },
                    {
                        title: '截止日期',
                        field: 'endTime',
                        slots: {
                            default: ({row}) => {
                                return [
                                    <div class="table-time">
                                        <span>{row.endTime}</span>
                                        {row.changeFlag ? <IconToolTip iconName="iconzhuyi" content="已变更"></IconToolTip> : null}
                                    </div>
                                ]
                            }
                        }
                    },
                    {
                        title: '进度',
                        field: 'progress',
                        width: 120,
                        slots: {
                            default: ({row}) => {
                                row.progress = Number(/(\d{0,})%/.test(row.progress) ? RegExp.$1 : row.progress);
                                return [
                                    <a-progress percent={row.progress} size="small"/>
                                ]
                            }
                        }
                    },
                    {
                        title: '剩余工期(天)',
                        field: 'remainingDuration',
                        width: 120
                    },
                    {
                        title: '状态',
                        field: 'status',
                        slots: {
                            default: ({row}) => {
                                return [
                                    <Status value={row.status}></Status>
                                ]
                            }
                        }
                    },
                    {
                        title: '备注',
                        field: 'remark',
                        showOverflow: true,
                        editRender: {
                            name: 'input',
                            enabled: isInPermission('business_projectvipweek_edit'),
                            attrs: {type: 'text', placeholder: '请输入备注'},
                            events: {
                                blur: ({row, column}) => {
                                    let data = {id: row.id, [column.property]: column.model.value}
                                    column.model.update && this.handleEdit(data);
                                }
                            }
                        }
                    }
                ]
            }
        },
        methods: {
            async handleEdit(data) {
                try {
                    let {code} = await this.$api.report.editKeyProject(data);
                    if(code === 0){
                        this.$message.success('修改成功！')
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .project-list-container {
        .header {
            height: 44px;
            line-height: 44px;
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #242F57;
        }

        .table-name {
            height: 40px;
            line-height: 40px;
            position: relative;

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

            .index {
                margin: 0 16px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #97A0C3;
                vertical-align: middle;
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

        .no-data {
            padding: 64px 0;
            text-align: center;
            background: #FFFFFF;
            border-radius: 4px;
            border: 1px solid #EAEDF7;

            > img {
                margin: 0 auto;
                width: 102px;
                height: 102px;
            }

            .title {
                height: 50px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7C88B1;
                line-height: 50px;
            }
        }
    }
</style>