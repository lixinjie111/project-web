<template>
    <div class="layout">
        <HeaderNav>
            <div slot="nav-left">首页</div>
        </HeaderNav>
        <div class="home-container">
        <ContentHeader type="title" title="项目">
            <div slot="operation">
                <a-button class="export-btn mr-16">
                    <span class="iconfont icondaochu"></span>
                    导出
                </a-button>
                <a-button type="primary">
                    <span class="iconfont iconjia"></span>
                    添加项目
                </a-button>
            </div>
        </ContentHeader>
        <div class="home-content">
            <BasicTabs :tabList="tabList"></BasicTabs>
            <ListTable :columns="columns" :data="listData" class="mt-25">
                <div slot="name" slot-scope="data" class="table-status">
                    <div class="table-status-bg" :style="'background:' + statusColor(data.row.status)"></div>
                    <TextToolTip className="table-name" :content="data.row.name"
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
                    <IconToolTip iconName="iconbofang" content="开始" @action="start"></IconToolTip>
                    <IconToolTip iconName="iconyanqi" content="延期" @action="delay"></IconToolTip>
                    <IconToolTip iconName="iconzanting" content="搁置" @action="pause"></IconToolTip>
                    <IconToolTip iconName="iconkaiguan" content="完成" @action="finish"></IconToolTip>
                    <IconToolTip iconName="iconxiezuo" content="编辑" @action="edit"></IconToolTip>
                    <IconToolTip iconName="iconshanchu" content="删除" @action="del"></IconToolTip>
                </div>
            </ListTable>
            <Pagination v-if="total > pageSize"
                        :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                        @pagination-change-pagesize="handleChangePageSize"
                        @pagination-change-page="handleChangePage"></Pagination>
        </div>
    </div>
    </div>
</template>
<script>
    import HeaderNav from '@/components/MenuNav.vue'
    import ContentHeader from '@/components/ContentHeader.vue'
    import BasicTabs from "@/components/tabs/BasicTabs";
    import ListTable from "@/components/tables/ListTable";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import IconToolTip from "@/components/tooltip/IconToolTip";
    import Pagination from '@/components/Pagination'

    export default {
        name: 'home',
        components: {Pagination, IconToolTip, TextToolTip, ListTable, BasicTabs, ContentHeader, HeaderNav},
        data() {
            return {
                tabList: [
                    {
                        name: '全部',
                        total: 8
                    },
                    {
                        name: '未开始',
                        total: 10
                    },
                    {
                        name: '进行中',
                        total: 888
                    },
                    {
                        name: '已延期',
                        total: 10
                    },
                    {
                        name: '已搁置',
                        total: 888
                    },
                    {
                        name: '已完成',
                        total: 888
                    }
                ],
                columns: [
                    {
                        slot: 'name',
                        width: '16%',
                        ellipsis: true
                    },
                    {
                        title: '项目负责人',
                        key: 'people',
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
                        key: 'planTime',
                        width: '10%'
                    },
                    {
                        title: '工时/消耗',
                        key: 'useTime',
                        width: '10%'
                    },
                    {
                        title: '工时/剩余',
                        key: 'residueTime',
                        width: '10%'
                    },
                    {
                        slot: 'progress',
                        width: '10%'
                    },
                    {
                        slot: 'action',
                        width: '16'
                    },
                ],
                listData: [
                    {
                        status: '1',
                        name: '智能营销SaaS智能营销SaaS智能营销SaaS智能营销SaaS',
                        people: '段常春段常春段常春段常春',
                        endTime: '2021/08/10',
                        planTime: '54',
                        useTime: '54',
                        residueTime: '54',
                        progress: 10
                    },
                    {
                        status: '2',
                        name: '智能营销SaaS',
                        people: '段常春',
                        endTime: '2021/08/10',
                        planTime: '54',
                        useTime: '54',
                        residueTime: '54',
                        progress: 20
                    }
                ],
                total: 50, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
            }
        },
        methods: {
            statusColor(status) {
                switch (status) {
                    case '0': //进行中
                        return '#0064FF';
                        break;
                    case '1': //未开始
                        return '#1DCEC3';
                        break;
                    case '2': //已延期
                        return '#FF4C60';
                        break;
                    case '3': //已搁置
                        return '#F9AD69';
                        break;
                    default:  //已完成
                        return '#7C88B1';
                }
            },
            // 切换条目数量
            handleChangePageSize(pageSize, pageNum) {
                this.pageSize = pageSize;
                if(pageNum) this.curPageNum = pageNum;
                this.getList();
            },
            // 切换当前页码
            handleChangePage(pageNum){
                this.curPageNum = pageNum;
                this.getList();
            },
            getList() {

            },
            start() {

            },
            delay() {

            },
            pause() {

            },
            finish() {

            },
            edit() {

            },
            del() {

            },
        }
    }
</script>
<style lang="scss" scoped>
    .home-container {
        margin: 16px 24px 24px 24px;

        .mr-16 {
            margin-right: 16px;
        }

        .mt-25 {
            margin-top: 25px;
        }

        .export-btn {
            color: #636E95;
            background-color: transparent;
            border-color: #C6CBDE;
        }

        .home-content {
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
    }
</style>