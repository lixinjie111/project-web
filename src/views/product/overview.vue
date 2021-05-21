<template>
    <div class="layout">
        <HeaderNav>
            <div slot="nav-left" class="nav-left-title">概览</div>
        </HeaderNav>
        <div class="overview-container">
            <ContentHeader type="title" title="产品">
                <div slot="operation">
                    <a-button class="export-btn mr-16">
                        <span class="iconfont icondaochu"></span>
                        导出
                    </a-button>
                    <a-button type="primary" @click="handleAdd">
                        <span class="iconfont iconjia"></span>
                        添加产品
                    </a-button>
                </div>
            </ContentHeader>
            <div class="overview-content">
                <BasicTabs :tabList="tabList" @change="handleChangeTab"></BasicTabs>
                <ListTable :columns="columns" :data="listData" class="mt-25">
                    <template slot="productName" slot-scope="data">
                        <TextToolTip className="table-name" :content="data.row.productName"
                                     :refName="'table-name' + data.row.index"></TextToolTip>
                        <p class="table-num">{{data.row.productCode}}</p>
                    </template>
                    <div slot="closedTime" slot-scope="data" class="table-close-time">
                        <p class="table-name">{{data.row.closedTime}}</p>
                        <p class="table-title">关闭时间</p>
                        <IconToolTip v-if="data.row.remark" class="table-tip" iconName="icontishi" :content="data.row.remark"></IconToolTip>
                    </div>
                    <div slot="action" class="table-action">
                        <IconToolTip iconName="iconxiezuo" content="编辑" @action="handleEdit"></IconToolTip>
                        <IconToolTip iconName="iconkaiguan" content="关闭" @action="handleClose"></IconToolTip>
                        <IconToolTip iconName="iconshanchu" content="删除" @action="handleDel"></IconToolTip>
                    </div>
                </ListTable>
                <Pagination v-if="total > pageSize"
                            :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                            @pagination-change-pagesize="handleChangePageSize"
                            @pagination-change-page="handleChangePage"></Pagination>
            </div>
        </div>
        <Modal :isShow="isShowModal" :title="modal.modalTitle" :okText="modal.okText" :cancelText="modal.cancelText" headeralgin="left" @modal-sure="handleSubmit" @modal-cancel="handleCancel">

        </Modal>
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
    import Modal from '@/components/Modal.vue'

    export default {
        name: 'overview',
        components: {Modal, Pagination, IconToolTip, TextToolTip, ListTable, BasicTabs, ContentHeader, HeaderNav},
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
                        slot: 'productName',
                        width: '25%',
                        ellipsis: true
                    },
                    {
                        title: '产品负责人',
                        key: 'productMaster',
                        width: '25%',
                        ellipsis: true
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime',
                        width: '19%'
                    },
                    {
                        slot: 'closedTime',
                        width: '19%'
                    },
                    {
                        slot: 'action',
                        width: '10%'
                    },
                ],
                listData: [
                    {
                        closedTime: "2021-05-13",
                        createdBy: "",
                        createdTime: "2021-04-13",
                        deletedFlag: 0,
                        deptId: 952777,
                        id: 0,
                        productCode: "ISO9002",
                        productDescription: "反正这是一个好产品，爱买不买",
                        productMaster: "9527,95277",
                        productName: "好产品",
                        publicFlag: 1,
                        remark: "测试",
                        status: 1,
                        updatedBy: "",
                        updatedTime: ""
                    },
                    {
                        closedTime: "2021-05-13",
                        createdBy: "",
                        createdTime: "",
                        deletedFlag: 0,
                        deptId: 952777,
                        id: 0,
                        productCode: "ISO9002",
                        productDescription: "反正这是一个好产品，爱买不买",
                        productMaster: "9527,95277",
                        productName: "好产品2",
                        publicFlag: 1,
                        remark: "测试",
                        status: 1,
                        updatedBy: "",
                        updatedTime: ""
                    }
                ],
                total: 50, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
                isShowModal: false,
                modal: {
                    modalTitle: '添加产品',
                    okText:'保存',
                    cancelText:'取消'
                }
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
            handleChangeTab(index) {
                console.log(index);
            },
            handleAdd() {
               this.isShowModal = true;
            },
            handleEdit() {
                console.log('edit');
            },
            handleClose() {
                console.log('close');
            },
            handleDel() {
                console.log('del');
            },
            handleSubmit() {
                this.isShowModal = false;
            },
            handleCancel() {
                this.isShowModal = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .nav-left-title {
        padding: 0 24px;
        line-height: 51px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #242F57;
    }

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