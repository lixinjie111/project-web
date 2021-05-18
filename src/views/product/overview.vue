<template>
    <div class="overview-container">
        <ContentHeader type="title" title="产品">
            <div slot="operation">
                <a-button class="mr-16">
                    <span class="iconfont icondaochu"></span>
                    导出
                </a-button>
                <a-button type="primary">
                    <span class="iconfont iconjia"></span>
                    添加产品
                </a-button>
            </div>
        </ContentHeader>
        <div class="overview-content">
            <BasicTabs :tabList="tabList"></BasicTabs>
            <ListTable :columns="columns" :data="listData" class="mt-25">
                <div slot="name" slot-scope="data">
                    <TextToolTip className="table-name" :content="data.row.name"
                                 :refName="'table-name' + data.row.index" :ellipsis="data.row.ellipsis"></TextToolTip>
                    <p class="table-num">产品代号占位</p>
                </div>
                <div slot="action" slot-scope="data">
                    关闭
                </div>
            </ListTable>
        </div>
    </div>
</template>
<script>
    import ContentHeader from '@/components/ContentHeader.vue'
    import BasicTabs from "@/components/BasicTabs";
    import ListTable from "@/components/ListTable";
    import TextToolTip from "@/components/TextToolTip";

    export default {
        name: 'userorg',
        components: {TextToolTip, ListTable, BasicTabs, ContentHeader},
        data() {
            return {
                tabList: [
                    {
                        name: '未关闭',
                        total: 8
                    },
                    {
                        name: '关闭',
                        total: 10
                    },
                    {
                        name: '全部产品',
                        total: 888
                    }
                ],
                columns: [
                    {
                        key: 'index',
                        width: '2%'
                    },
                    {
                        slot: 'name',
                        width: '25%',
                        ellipsis: true
                    },
                    {
                        title: '产品负责人',
                        key: 'people',
                        width: '23%',
                        ellipsis: true
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        width: '15%'
                    },
                    {
                        title: '关闭时间',
                        key: 'closeTime',
                        width: '15%'
                    },
                    {
                        slot: 'action',
                        width: '20%'
                    },
                ],
                listData: [
                    {
                        name: '智能营销SaaS智能营销SaaS智能营销SaaS智能营销SaaS',
                        people: '段常春，段常春，段常春，段常春，段常春，段常春',
                        createTime: '2021/08/10',
                        closeTime: '2021/04/30'
                    },
                    {
                        name: '资源合作开发',
                        people: '杨达东, 李春梁',
                        createTime: '2021/03/30',
                        closeTime: '2021/04/30'
                    }
                ]
            }
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .overview-container {
        margin: 16px 24px 24px 24px;

        .mr-16 {
            margin-right: 16px;
        }

        .mt-25 {
            margin-top: 25px;
        }

        .overview-content {
            /deep/ .table-name {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #242F57;
            }

            .table-num {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0064FF;
            }
        }
    }
</style>