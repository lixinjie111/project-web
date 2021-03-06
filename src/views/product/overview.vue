<template>
    <div class="layout">
        <div class="product-overview-container">
            <ContentHeader class="overview-header" type="title" title="产品">
                <div class="header-left" slot="left">
                    <BasicTabs :tabList="tabList" :tabActive="tabActive" @change="handleChangeTab"></BasicTabs>
                </div>
                <div slot="operation">
                    <a-button class="export-btn" @click="handleExport" v-if="isInPermission('business_product_view')">
                        <i class="iconfont icondaochu"></i>
                        导出
                    </a-button>
                    <a-button type="primary" @click="handleAdd" v-if="isInPermission('business_product_add')">
                        <i class="iconfont iconjia"></i>
                        添加产品
                    </a-button>
                </div>
            </ContentHeader>
            <div class="overview-content">
                <ListTable :columns="columns" :data="listData">
                    <template slot="productName" slot-scope="data">
                        <TextToolTip className="table-name" :content="data.row.productName" :refName="'table-name' + data.row.index"></TextToolTip>
                        <TextToolTip className="table-num" :content="data.row.productCode" :refName="'table-num' + data.row.index"></TextToolTip>
                    </template>
                    <div slot="closedTime" slot-scope="data" class="table-close-time">
                        <p class="table-name">{{data.row.closedTime || '-'}}</p>
                        <p class="table-title">关闭时间</p>
                        <IconToolTip v-if="data.row.remark" class="table-tip" iconName="icontishi" :content="data.row.remark"></IconToolTip>
                    </div>
                    <div slot="action" slot-scope="data" class="table-action">
                        <IconToolTip iconName="iconxiezuo" :disabled="!isInPermission('business_product_edit')" content="编辑" @action="handleEdit(data.row)"></IconToolTip>
                        <IconToolTip iconName="iconkaiguan" :disabled="data.row.status == 1 || !isInPermission('business_project_close')" :content="data.row.status ? '已关闭' : '关闭'" @action="handleClose(data.row)"></IconToolTip>
                        <IconToolTip iconName="iconshanchu" :disabled="!isInPermission('business_product_del')" content="删除" @action="handleDel(data.row)"></IconToolTip>
                    </div>
                </ListTable>
                <Pagination v-if="total > pageSize"
                            :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                            @pagination-change-pagesize="handleChangePageSize"
                            @pagination-change-page="handleChangePage"></Pagination>
            </div>
        </div>
        <Modal :isShow="showAddModal" className="product-add-modal" :title="addModal.modalTitle" :okText="addModal.okText" :cancelText="addModal.cancelText" headeralgin="left" @modal-sure="handleAddSubmit" @modal-cancel="handleAddCancel">
            <AddForm ref="addForm" slot="content" :form="form"></AddForm>
        </Modal>
        <Modal :width="420" :isShow="showCloseModal" :title="closeModal.modalTitle" :okText="closeModal.okText" :cancelText="closeModal.cancelText" headeralgin="left" @modal-sure="handleCloseSubmit" @modal-cancel="handleCloseCancel">
            <closeForm ref="closeForm" slot="content"></closeForm>
        </Modal>
    </div>
</template>
<script>
    import BasicTabs from "@/components/tabs/BasicTabs";
    import ListTable from "@/components/tables/ListTable";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import IconToolTip from "@/components/tooltip/IconToolTip";
    import Modal from '@/components/Modal/Modal.vue'
    import AddForm from "./components/addForm";
    import closeForm from "./components/closeForm";
    import {isInPermission} from '@/utils/common.js';
    import moment from "moment";

    export default {
        name: 'overview',
        components: {closeForm, AddForm, Modal, IconToolTip, TextToolTip, ListTable, BasicTabs},
        data() {
            return {
                tabActive: 0, //当前产品状态
                tabList: [
                    {
                        name: '未关闭',
                        status: 0
                    },
                    {
                        name: '关闭',
                        status: 1
                    },
                    {
                        name: '全部产品',
                        status: 2
                    }
                ],
                columns: [
                    {
                        key: 'index',
                        width: '2%'
                    },
                    {
                        slot: 'productName',
                        width: '30%',
                        ellipsis: true
                    },
                    {
                        title: '产品负责人',
                        key: 'productMaster',
                        width: '22%',
                        ellipsis: true
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime',
                        width: '18%'
                    },
                    {
                        slot: 'closedTime',
                        width: '18%'
                    },
                    {
                        slot: 'action',
                        width: '10%'
                    },
                ],
                listData: [],
                total: 0, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
                showAddModal: false,
                addModal: {
                    modalTitle: '添加产品',
                    okText:'保存',
                    cancelText:'取消'
                },
                closeItem: {},
                showCloseModal: false,
                closeModal: {
                    modalTitle: '关闭产品线',
                    okText:'关闭',
                    cancelText:'取消'
                },
                form: {} // 添加、编辑表单数据
            }
        },
        created() {
            this.resetList();
        },
        methods: {
            isInPermission,
            // 重置列表
            resetList() {
                this.getProductCount();
                this.getProductList();
            },
            // 切换条目数量
            handleChangePageSize(pageSize, pageNum) {
                this.pageSize = pageSize;
                if(pageNum) this.curPageNum = pageNum;
                this.resetList();
            },
            // 切换当前页码
            handleChangePage(pageNum){
                this.curPageNum = pageNum;
                this.resetList();
            },
            // 获取产品列表状态数量
            async getProductCount(){
                try {
                    let {code, data} = await this.$api.product.getProductCount();
                    if(code === 0){
                        this.tabList = this.tabList.map((item) => {
                            let t = data.find((i) => {
                                return i.status == item.status;
                            });
                            return {...item, ...t};
                        });
                    }
                }catch(error){
                    console.log(error)
                }
            },
            // 获取产品列表
            async getProductList(){
                try {
                    let {code, data} = await this.$api.product.getProductList(this.curPageNum, this.pageSize, this.tabActive);
                    if(code === 0){
                        let {total, records} = data;
                        this.total = total;
                        this.listData = records;
                    }
                }catch(error){
                    console.log(error)
                }
            },
            // 切换产品状态
            handleChangeTab(status) {
                this.curPageNum = 1;
                this.tabActive = status;
                this.resetList();
            },
            // 添加产品
            handleAdd() {
               this.form = {
                   productName: '',
                   productDescription: '',
                   productCode: '',
                   masterList: [],
                   publicFlag: 1,
                   projectList: []
               };
               this.showAddModal = true;
               this.addModal.modalTitle = '添加产品';
            },
            // 编辑产品
            async handleEdit(item) {
                try {
                    let {code, data} = await this.$api.product.getProductDetail(item.id);
                    if(code === 0){
                        let {closedTime, remark, status, ...form} = data;
                        this.form = {...form, cancelRelIds: []};
                        this.showAddModal = true;
                        this.addModal.modalTitle = '编辑产品';
                    }
                }catch(error){
                    console.log(error)
                }
            },
            // 关闭产品
            handleClose(item) {
                this.showCloseModal = true;
                this.closeItem =  item;
            },
            // 删除产品
            handleDel(item) {
                this.$confirms({
                    title: '提示',
                    message: `您确定要删除 ${item.productName} 吗？`,
                    okText: '确认删除',
                    onOk: async () => {
                        try {
                            let {code} = await this.$api.product.delProduct(item.id);
                            if(code === 0){
                                this.$message.success('删除成功！');
                                this.resetList();
                            }else{
                                this.$message.error('删除失败！');
                            }
                        }catch(error){
                            console.log(error)
                        }
                    },
                    cancelText: '取消',
                    onCancel() {

                    }
                });
            },
            // 添加、编辑产品保存
            async handleAddSubmit() {
                this.$refs.addForm.$refs.addForm.validate(async (valid) => {
                    if (valid) {
                        let params = this.$refs.addForm.$refs.addForm.model;
                        try {
                            if(params.id) { //编辑
                                let {code} = await this.$api.product.editProduct(params);
                                if(code === 0){
                                    this.resetList();
                                    this.showAddModal = false;
                                }
                            }else { //添加
                               let {code} = await this.$api.product.addProduct(params);
                               if(code === 0){
                                   this.tabActive = 0;
                                   this.resetList();
                                   this.showAddModal = false;
                               }
                            }
                        }catch(error){
                            console.log(error)
                        }
                    } else {
                        console.log('提交失败!');
                        return false;
                    }
                });
            },
            // 添加、编辑产品取消
            handleAddCancel() {
                this.showAddModal = false;
            },
            // 关闭产品保存
            async handleCloseSubmit() {
                try {
                    let remark = this.$refs.closeForm.$refs.closeForm.model.remark;
                    let {code} = await this.$api.product.closeProduct(this.closeItem.id, remark);
                    if(code === 0){
                        this.$message.success('关闭成功！');
                        this.resetList();
                        this.showCloseModal = false;
                    }
                }catch(error){
                    console.log(error);
                }
            },
            // 关闭产品取消
            handleCloseCancel() {
                this.showCloseModal = false;
            },
            // 导出产品excel
            handleExport() {
                try {
                    this.$api.product.exportProduct(this.tabActive).then((res)=>{
                        let blob = new Blob([res], {type: "application/vnd.ms-excel"});
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = `产品列表${ moment().format('YYYYMMDD')}.xlsx`;
                        a.click();
                        window.URL.revokeObjectURL(url);
                    });
                }catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .product-overview-container {
        padding: 0 16px 24px;
        height: 100%;

        .overview-header {
            margin-left: 8px;

            .header-left {
                margin-left: 16px;
            }

            .export-btn {
                margin-right: 16px;
                color: #636E95;
                background-color: transparent;
                border-color: #C6CBDE;
            }
        }

        .overview-content {
            height: calc(100% - 72px);
            max-height: calc(100% - 72px);
            overflow: auto;
            /deep/ .table-name {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #242F57;
            }

            /deep/ .table-num {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0064FF;
                height: 20px;
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
                display: flex;
                justify-content: center;
                align-items: center;

                .icon-tooltip {
                    display: inline-block;

                    /deep/ > i {
                        padding: 9px;
                    }
                }
            }
        }
    }

    /deep/ .product-add-modal {
        .ant-modal-body {
            padding: 0;
            height: 560px;
            overflow-y: auto;
        }
    }
</style>
