<template>
    <div class="list-container">
        <ListTable :columns="columns" :data="list" class="mt-25">
            <div slot="projectName" slot-scope="data" class="table-status">
                <div class="table-status-bg" :style="'background:' + statusColor(data.row.status)"></div>
                <TextToolTip className="table-name" :content="data.row.projectName"
                             :refName="'table-name' + data.row.index"></TextToolTip>
                <p class="table-status-text">
                    <span class="circle" :style="'background:' + statusColor(data.row.status)"></span>
                    <span class="text" :style="'color:' + statusColor(data.row.status)">{{data.row.status}}</span>
                </p>
            </div>
            <div slot="progress" slot-scope="data" class="table-progress">
                <div class="table-progress-text">{{data.row.progress}}%</div>
                <a-progress :percent="data.row.progress" :strokeColor="statusColor(data.row.status)"/>
            </div>
            <div slot="action" class="table-action">
                <IconToolTip iconName="iconbofang" content="开始" @action="handleStart"></IconToolTip>
                <IconToolTip iconName="iconyanqi" content="延期" @action="handleDelay"></IconToolTip>
                <IconToolTip iconName="iconzanting" content="搁置" @action="handlePause"></IconToolTip>
                <IconToolTip iconName="iconkaiguan" content="完成" @action="handleFinish"></IconToolTip>
                <IconToolTip iconName="iconxiezuo" content="编辑" @action="handleEdit"></IconToolTip>
                <IconToolTip iconName="iconshanchu" content="删除" @action="handleDel"></IconToolTip>
            </div>
        </ListTable>
        <Pagination v-if="page.total > page.pageSize"
                    :total="page.total" :curPageNum="page.curPageNum" :pageSize="page.pageSize"
                    @pagination-change-pagesize="handleChangePageSize"
                    @pagination-change-page="handleChangePage"></Pagination>
    </div>

</template>

<script>
    import ListTable from "@/components/tables/ListTable";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import IconToolTip from "@/components/tooltip/IconToolTip";

    export default {
        name: "list",
        components: {IconToolTip, TextToolTip, ListTable},
        data() {
            return {
                columns: [
                    {
                        slot: 'projectName',
                        width: '16%',
                        ellipsis: true
                    },
                    {
                        title: '项目负责人',
                        key: 'projectMaster',
                        width: '16%',
                        ellipsis: true
                    },
                    {
                        title: '截止时间',
                        key: 'endTime',
                        width: '12%'
                    },
                    {
                        title: '工时/预计',
                        key: 'workHour',
                        width: '10%'
                    },
                    {
                        title: '工时/消耗',
                        key: 'usedHour',
                        width: '10%'
                    },
                    {
                        title: '工时/剩余',
                        key: 'restHour',
                        width: '10%'
                    },
                    {
                        slot: 'progress',
                        width: '10%'
                    },
                    {
                        slot: 'action',
                        width: '16'
                    }
                ]
            }
        },
        props: {
            list: {
                type: Array,
                default: () => []
            },
            page: {
                type: Object,
                default: () => {
                }
            }
        },
        methods: {
            statusColor(status) {
                switch (status) {
                    // 0：未开始，1：进行中，2：已完成，3：已延期，4：已搁置
                    case 0: //未开始
                        return '#1DCEC3';
                        break;
                    case 1: //进行中
                        return '#0064FF';
                        break;
                    case 2: //已完成
                        return '#7C88B1';
                        break;
                    case 3: //已延期
                        return '#FF4C60';
                        break;
                    default:  //已搁置
                        return '#F9AD69';
                }
            },
            // 切换条目数量
            handleChangePageSize(pageSize, pageNum) {
                this.pageSize = pageSize;
                if (pageNum) this.curPageNum = pageNum;
                this.getList();
            },
            // 切换当前页码
            handleChangePage(pageNum) {
                this.curPageNum = pageNum;
                this.getList();
            },
            handleStart() {

            },
            handleDelay() {

            },
            handlePause() {

            },
            handleFinish() {

            },
            handleEdit() {

            },
            handleDel() {

            }
        }

    }
</script>

<style scoped lang="scss">
    .list-container {
        margin-top: 25px;

        .table-status {
            position: relative;

            .table-status-bg {
                position: absolute;
                left: -24px;
                top: -26px;
                width: 4px;
                height: 96px;
                border-radius: 4px 0 0 4px;
            }

            /deep/ .table-name {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #242F57;
            }

            .table-status-text {
                .circle {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .text {
                    margin-left: 4px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                }
            }
        }

        .table-progress {
            .table-progress-text {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #242F57;
            }

            /deep/ .ant-progress-text {
                display: none;
            }

            /deep/ .ant-progress-show-info .ant-progress-outer {
                margin-right: 0;
                padding-right: 0;
            }
        }

        .table-action {
            .icon-tooltip {
                display: inline-block;
                margin-right: 10px;
            }

            /deep/ .iconxiezuo {
                padding-left: 8px;
                border-left: 1px solid #EAEDF7;
            }
        }
    }
</style>