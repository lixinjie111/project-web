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
                <div slot="status">

                </div>
                <div slot="name" slot-scope="data">
                    <p class="table-name">{{data.row.name}}</p>
                    <p class="table-status">{{data.row.status}}</p>
                </div>
                <div slot="progress">
                    progress
                </div>
                <div slot="action">
                    关闭
                </div>
            </ListTable>
        </div>
    </div>
    </div>
</template>
<script>
    import HeaderNav from '@/components/MenuNav.vue'
    import ContentHeader from '@/components/ContentHeader.vue'
    import BasicTabs from "@/components/tabs/BasicTabs";
    import ListTable from "@/components/tables/ListTable";

    export default {
        name: 'userorg',
        components: {ListTable, BasicTabs, ContentHeader, HeaderNav},
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
                        slot: 'status',
                        width: '2%'
                    },
                    {
                        slot: 'name',
                        width: '16%'
                    },
                    {
                        title: '项目负责人',
                        key: 'people',
                        width: '16%'
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
                        width: '15%'
                    },
                ],
                listData: [
                    {
                        status: '1',
                        name: '智能营销SaaS',
                        people: '段常春',
                        endTime: '2021/08/10',
                        planTime: '54',
                        useTime: '54',
                        residueTime: '54'
                    },
                    {
                        status: '2',
                        name: '智能营销SaaS',
                        people: '段常春',
                        endTime: '2021/08/10',
                        planTime: '54',
                        useTime: '54',
                        residueTime: '54'
                    }
                ]
            }
        },
        methods: {}
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
            .table-name {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #242F57;
            }

            .table-status {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0064FF;
            }
        }
    }
</style>