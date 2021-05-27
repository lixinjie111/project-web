<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">概览</div>
        </MenuNav>
        <div class="product-overview-container">
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
                    <div slot="action" slot-scope="data" class="table-action">
                        <IconToolTip iconName="iconxiezuo" content="编辑" @action="handleEdit(data.row)"></IconToolTip>
                        <IconToolTip iconName="iconkaiguan" content="关闭" @action="handleClose(data.row)"></IconToolTip>
                        <IconToolTip iconName="iconshanchu" content="删除" @action="handleDel(data.row)"></IconToolTip>
                    </div>
                </ListTable>
                <Pagination v-if="total > pageSize"
                            :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                            @pagination-change-pagesize="handleChangePageSize"
                            @pagination-change-page="handleChangePage"></Pagination>
            </div>
        </div>
        <Modal :isShow="showAddModal" :title="addModal.modalTitle" :okText="addModal.okText" :cancelText="addModal.cancelText" headeralgin="left" @modal-sure="handleAddSubmit" @modal-cancel="handleAddCancel">
            <AddForm slot="content"></AddForm>
        </Modal>
        <Modal :width="420" :isShow="showCloseModal" :title="closeModal.modalTitle" :okText="closeModal.okText" :cancelText="closeModal.cancelText" headeralgin="left" @modal-sure="handleCloseSubmit" @modal-cancel="handleCloseCancel">
            <closeForm slot="content"></closeForm>
        </Modal>
    </div>
</template>
<script>
    import BasicTabs from "@/components/tabs/BasicTabs";
    import ListTable from "@/components/tables/ListTable";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import IconToolTip from "@/components/tooltip/IconToolTip";
    import Modal from '@/components/Modal.vue'
    import AddForm from "./components/addForm";
    import closeForm from "./components/closeForm";

    export default {
        name: 'overview',
        components: {closeForm, AddForm, Modal, IconToolTip, TextToolTip, ListTable, BasicTabs},
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
                showAddModal: false,
                addModal: {
                    modalTitle: '添加产品',
                    okText:'保存',
                    cancelText:'取消'
                },
                showCloseModal: false,
                closeModal: {
                    modalTitle: '关闭产品线',
                    okText:'关闭',
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
            // 获取产品列表
            getList() {

            },
            // 切换产品状态
            handleChangeTab(index) {
                console.log(index);
            },
            // 添加产品
            handleAdd() {
               this.showAddModal = true;
            },
            // 编辑产品
            handleEdit(item) {
                this.showAddModal = true;
            },
            // 关闭产品
            handleClose(item) {
                this.showCloseModal = true;
            },
            // 删除产品
            handleDel(item) {
                this.$confirms({
                    title: '提示',
                    message: `您确定要删除 ${item.productName} 吗？`,
                    okText: '确认删除',
                    onOk(){

                    },
                    cancelText: '取消',
                    onCancel() {

                    }
                });
            },
            // 添加、编辑产品保存
            handleAddSubmit() {
                this.showAddModal = false;
            },
            // 添加、编辑产品取消
            handleAddCancel() {
                this.showAddModal = false;
            },
            // 关闭产品保存
            handleCloseSubmit() {
                this.showCloseModal = false;
            },
            // 关闭产品取消
            handleCloseCancel() {
                this.showCloseModal = false;
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

    .product-overview-container {
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