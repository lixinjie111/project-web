<template>
    <div class="notarchive-schedule-container">
        <Header title="本周工作进度" :date="`${startTime} - ${endTime}`" @selected-tree="handleSetSelectedTree"></Header>
        <div class="table-content">
            <BasicTable v-if="tableData.length" 
                rowId="id"
                :tableData="tableData" 
                :setTableColumns="setTableColumns" 
                :rowClassName="handleRowClassName" 
                :treeConfig="treeConfig"
            ></BasicTable>
            <NoData v-else :title="!archiveId ? '本周周报暂未生成': '该部门未制定本月月度计划'" :isShowBtn="!archiveId"></NoData>
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
    import Progress from "@/components/business/Progress"
    import NoData from './components/NoData';

    import {isInPermission} from '@/utils/common.js'

    export default {
        name: "schedule",
        components: {Header, TextToolTip, IconToolTip, Status, Priority, BasicTable, Progress, NoData},
        data() {
            return {
                startTime: '',
                endTime: '',
                deptId: this.$store.state.users.userInfo.deptId,
                tableData: [],
                treeConfig:{
                    children: 'children', 
                    expandRowKeys: [], 
                    iconOpen: 'tree-icon iconfont iconxia2', 
                    iconClose: 'tree-icon iconfont iconyou2'
                },
                setTableColumns: [
                    {
                        title: '工作任务',
                        field: 'title',
                        treeNode: true,
                        width: 360,
                        fixed: 'left',
                        slots: {
                            default: ({row, $seq, $rowIndex, level}) => {
                                return [
                                    <div class="table-name">
                                        <span class={'status' + (parseInt(row.status) + 1)}></span>
                                        <div class="content-name">
                                            <span class={[row?.children.length ? 'none' : 'index']}>{$seq ? `${$seq}.${$rowIndex + 1}` : $rowIndex + 1}</span>
                                            <TextToolTip className="name" content={row.title} refName={'table-name' + $rowIndex}></TextToolTip>
                                        </div>
                                    </div>
                                ]
                            }
                        }
                    },
                    {
                        title: '负责人',
                        field: 'projectMaster',
                        width: 120,
                        showOverflow: true
                    },
                    {
                        title: '优先级',
                        field: 'priority',
                        width: 72,
                        slots: {
                            default: ({row}) => {
                                return [
                                    row.priority >= 0 && row.priority <= 2 ?  <Priority value={row.priority} size="small"/> : <span class="no-priority">无</span>
                                ]
                            }
                        }
                    },
                    {
                        title: '权重',
                        field: 'weight',
                        width: 88,
                        showOverflow: true,
                        slots: {
                            default: ({row, $rowIndex}) => {
                                return [
                                    <TextToolTip class="table-weight" content={row.weight} refName={'table-weight' + $rowIndex}></TextToolTip>
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
                                row.progress = /(\d{0,})%/.test(row.progress) ? RegExp.$1 : row.progress;
                                return [
                                    // <a-progress percent={Number(row.progress)} size="small"/>
                                    <Progress percent={Number(row.progress)} status={row.status}/>
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
                        width: 240,
                        slots: {
                            default: ({row}) => {
                                let reg = /([0-9]{4}\/[0-9]{2}\/[0-9]{2})*\s{1,}-\s{1}([0-9]{4}\/[0-9]{2}\/[0-9]{2})*/;
                                let start = null, end = null;
                                if(reg.test(row.planTime)){
                                    start = RegExp.$1;
                                    end = RegExp.$2;
                                }
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
                        title: '工作日',
                        field: 'manDays',
                        width: 100,
                        showOverflow: true,
                        formatter: ({cellValue}) => `${cellValue}d`
                    },
                    {
                        title: '实际结束日期',
                        field: 'actualEndTime',
                        width: 132,
                        showOverflow: true,
                    },
                    {
                        title: '工作进展描述',
                        field: 'description',
                        minWidth: 120,
                        showOverflow: true,
                        editRender: {
                            name: 'input', 
                            enabled: isInPermission('business_projectweek_edit'),
                            attrs: {type: 'text', placeholder: '请输入工作进展描述'},
                            events: {
                                blur: ({row, column}) => {
                                    let data = {id: row.id, [column.property]: column.model.value}
                                    column.model.update && this.handlePutProjectWeek(data);
                                }
                            }
                        }
                    },
                    {
                        title: '下周工作计划',
                        field: 'nextWeekWork',
                        minWidth: 120,
                        showOverflow: true,
                        editRender: {
                            name: 'input', 
                            enabled: isInPermission('business_projectweek_edit'), 
                            attrs: {type: 'text', placeholder: '请输入下周工作计划'},
                            events: {
                                blur: ({row, column}) => {
                                    let data = {id: row.id, [column.property]: column.model.value}
                                    column.model.update && this.handlePutProjectWeek(data);
                                }
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
                            enabled: isInPermission('business_projectweek_edit'), 
                            attrs: {type: 'text', placeholder: '请输入备注'},
                            events: {
                                blur: ({row, column}) => {
                                    let data = {id: row.id, [column.property]: column.model.value}
                                    column.model.update && this.handlePutProjectWeek(data);
                                }
                            }
                        }
                    },
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
                let {children = []} = e?.row;
                return children.length ? 'has-children' : '';
            },
            // 修改部门
            handleSetSelectedTree(deptId){
                this.deptId = deptId;
                // 查询table
                this.handleGetList();
            },
            // 查询table
            async handleGetList() {
                try {
                    this.tableData = [];
                    let {code, data} = await this.$api.report.handleGetWeekList(this.deptId);
                    if(code === 0){
                        let {archiveId, startTime, endTime, list} = data;
                        let expandRowKeys = [];
                        list?.map(item=>expandRowKeys.push(item.id));

                        this.startTime = startTime || '';
                        this.endTime = endTime || '';
                        this.$store.dispatch('initArchiveId', archiveId || '');
                        
                        expandRowKeys = expandRowKeys.length ? expandRowKeys : [];
                        this.$set(this, 'treeConfig', {...this.treeConfig, expandRowKeys});
                        console.log(this.treeConfig)
                        setTimeout(()=> {
                            this.tableData = list || [];
                        }, 0);
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            // 编辑工作进度
            async handlePutProjectWeek(data){
                try {
                    let {code} = await this.$api.report.handlePutProjectWeek(data);
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
            this.$nextTick(() => {
                this.handleGetList()
            })
        }
    }
</script>

<style scoped lang="scss">
@import '@/assets/css/variables.scss';
    .notarchive-schedule-container {
        /deep/ .vxe-table--body {
            .has-children {
                background: #F6F8FF;
            }
            .tree-icon {
                line-height: 14px;
                font-size: 16px;
                color: #97A0C3;
            }
        }

        .table-name {
            height: 40px;
            line-height: 40px;

            // $bgColors: #7C88B1, #FE774B, #08BD6C, #FF4C60, black;
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

            .content-name {
                position: relative;
            }
            .index {
                margin-right: 8px;
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
        .no-priority {
            color: #97A0C3;
        }

        .table-weight {
            font-size: 14px;
        }
    }
</style>