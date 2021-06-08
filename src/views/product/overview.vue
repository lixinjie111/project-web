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
                        <p class="table-name">{{data.row.closedTime || '-'}}</p>
                        <p class="table-title">关闭时间</p>
                        <IconToolTip v-if="data.row.remark" class="table-tip" iconName="icontishi" :content="data.row.remark"></IconToolTip>
                    </div>
                    <div slot="action" slot-scope="data" class="table-action">
                        <IconToolTip iconName="iconxiezuo" content="编辑" @action="handleEdit(data.row)"></IconToolTip>
                        <IconToolTip iconName="iconkaiguan" :disabled="true" content="已关闭" v-if="data.row.status"></IconToolTip>
                        <IconToolTip iconName="iconkaiguan" content="关闭" @action="handleClose(data.row)" v-else></IconToolTip>
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
            <AddForm ref="addForm" slot="content" :form="form" :projectList="projectList"></AddForm>
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
                        status: 0,
                        num: 0
                    },
                    {
                        name: '关闭',
                        status: 1,
                        num: 0
                    },
                    {
                        name: '全部产品',
                        status: 2,
                        num: 0
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
                        width: '23%',
                        ellipsis: true
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime',
                        width: '20%'
                    },
                    {
                        slot: 'closedTime',
                        width: '20%'
                    },
                    {
                        slot: 'action',
                        width: '10%'
                    },
                ],
                listData: [],
                total: 50, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
                curStatus: 0, //当前产品状态
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
                // 添加、编辑表单数据
                form: {
                    productName: '',
                    productDescription: '',
                    productCode: '',
                    masterList: [],
                    publicFlag: 0,
                    projectList: []
                },
                // 添加、编辑关联项目列表
                projectList: []
            }
        },
        created() {
            this.resetList();
            this.getProjectList();
        },
        methods: {
            // 重置列表
            resetList() {
                this.getProductCount();
                this.getProductList();
            },
            // 切换条目数量
            handleChangePageSize(pageSize, pageNum) {
                this.pageSize = pageSize;
                if(pageNum) this.curPageNum = pageNum;
                this.getProductList();
            },
            // 切换当前页码
            handleChangePage(pageNum){
                this.curPageNum = pageNum;
                this.getProductList();
            },
            // 获取关联项目列表
            async getProjectList() {
                try {
                    let {code, data} = await this.$api.product.getBindingProjectList();
                    if (code === 0) {
                        this.projectList = data.map(item => {
                            return {
                                ...item,
                                checked: false
                            }
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
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
                    let {code, data} = await this.$api.product.getProductList(this.curPageNum, this.pageSize, this.curStatus);
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
                this.curStatus = status;
                this.getProductList();
            },
            // 添加产品
            handleAdd() {
               this.form = {
                   productName: '',
                   productDescription: '',
                   productCode: '',
                   masterList: [],
                   publicFlag: 0,
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
                        this.form = {
                            id: data.id,
                            cancelRelIds: [],
                            productName: data.productName,
                            productDescription: data.productDescription,
                            productCode: data.productCode,
                            masterList: data.masterList,
                            publicFlag: data.publicFlag,
                            projectList: data.relList
                        };
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
                            }else { //编辑添加
                               let {code} = await this.$api.product.addProduct(params);
                               if(code === 0){
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