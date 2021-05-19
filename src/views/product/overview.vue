<template>
    <div class="layout">
        <HeaderNav>
            <div slot="nav-left">概览</div>
        </HeaderNav>
        <div class="overview-container">
            <ContentHeader type="title" title="产品">
                <div slot="operation">
                    <a-button class="export-btn mr-16">
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
                <BasicTabs :tabList="tabList" @change="tabChange"></BasicTabs>
                <ListTable :columns="columns" :data="listData" class="mt-25">
                    <template slot="name" slot-scope="data">
                        <TextToolTip className="table-name" :content="data.row.name"
                                     :refName="'table-name' + data.row.index"></TextToolTip>
                        <p class="table-num">产品代号占位</p>
                    </template>
                    <div slot="closeTime" slot-scope="data" class="table-close-time">
                        <p class="table-name">{{data.row.closeTime}}</p>
                        <p class="table-title">关闭时间</p>
                        <IconToolTip class="table-tip" iconName="icontishi" content="资源方申请停止合作"></IconToolTip>
                    </div>
                    <div slot="action" class="table-action">
                        <IconToolTip iconName="iconxiezuo" content="编辑" @action="edit"></IconToolTip>
                        <IconToolTip iconName="iconkaiguan" content="关闭" @action="close"></IconToolTip>
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
        name: 'overview',
        components: {Pagination, IconToolTip, TextToolTip, ListTable, BasicTabs, ContentHeader, HeaderNav},
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
                        width: '25%',
                        ellipsis: true
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        width: '19%'
                    },
                    {
                        slot: 'closeTime',
                        width: '19%'
                    },
                    {
                        slot: 'action',
                        width: '10%'
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
                ],
                total: 50, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
            }
        },
        methods: {
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
            tabChange(index) {
                console.log(index);
            },
            edit() {
                console.log('edit');
            },
            close() {
                console.log('close');
            },
            del() {
                console.log('del');
            }
        }
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

        .export-btn {
            color: #636E95;
            background-color: transparent;
            border-color: #C6CBDE;
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

            .table-title {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7C88B1;
            }

            .table-close-time {
                position: relative;

                /deep/ .table-tip{
                    position: absolute;
                    top: 10px;
                    right: 0;
                }
            }

            .table-action {
                .icon-tooltip {
                    display: inline-block;
                    margin-right: 18px;
                }
            }
        }
    }
</style>