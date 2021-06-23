<template>
    <div class="layout">
        <div class="project-home-container">
            <ContentHeader class="home-header" type="title" title="项目">
                <div class="header-left" slot="left">
                   <BasicTabs :tabList="tabList" @change="handleChangeTab"></BasicTabs>
                </div>
                <div slot="operation">
                    <a-button class="export-btn" @click="handleExport" v-if="isInPermission('business_project_view')">
                        <span class="iconfont icondaochu"></span>
                        导出
                    </a-button>
                    <a-button type="primary" @click="handleAdd" v-if="isInPermission('business_project_add')">
                        <span class="iconfont iconjia"></span>
                        添加项目
                    </a-button>
                </div>
            </ContentHeader>
            <div class="home-content">
                <ProjectList :list="listData" :productList="productList"
                             :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                             @pagination-change-pagesize="handleChangePageSize"
                             @pagination-change-page="handleChangePage"></ProjectList>
            </div>
        </div>
        <Modal :isShow="showAddModal" :title="addModal.modalTitle" :okText="addModal.okText" :cancelText="addModal.cancelText" headeralgin="left" @modal-sure="handleAddSubmit" @modal-cancel="handleAddCancel">
            <AddForm ref="addForm" slot="content" :form="form" :productList="productList"></AddForm>
        </Modal>
    </div>
</template>
<script>
    import BasicTabs from "@/components/tabs/BasicTabs";
    import ProjectList from "./components/list";
    import Modal from '@/components/Modal/Modal.vue'
    import AddForm from "./components/addForm";
    import {formatDate} from '@/utils/common.js'
    import {isInPermission} from '@/utils/common.js';
    import moment from "moment";

    export default {
        name: 'home',
        components: {AddForm, Modal, ProjectList, BasicTabs},
        data() {
            return {
                tabList: [
                    {
                        name: '全部',
                        status: 5
                    },
                    {
                        name: '未开始',
                        status: 0
                    },
                    {
                        name: '进行中',
                        status: 1
                    },
                    {
                        name: '已延期',
                        status: 3
                    },
                    {
                        name: '已搁置',
                        status: 4
                    },
                    {
                        name: '已完成',
                        status: 2
                    }
                ],
                listData: [],
                total: 0, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
                showAddModal: false,
                addModal: {
                    modalTitle: '添加项目',
                    okText:'保存',
                    cancelText:'取消'
                },
                curStatus: 5,
                form: {},
                productList: []
            }
        },
        created() {
            this.resetList();
            this.getProductList();
        },
        methods: {
            isInPermission,
            // 重置列表
            resetList() {
                this.getProjectCount();
                this.getProjectList();
            },
            // 切换条目数量
            handleChangePageSize(pageSize,pageNum) {
                this.pageSize = pageSize;
                if (pageNum) this.curPageNum = pageNum;
                this.resetList();
            },
            // 切换当前页码
            handleChangePage(pageNum) {
                this.curPageNum = pageNum;
                this.resetList();
            },
            // 获取关联产品列表
            async getProductList() {
                try {
                    let {code, data} = await this.$api.project.getBindingProductList();
                    if (code === 0) {
                        this.productList = data.map(item => {
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
            // 获取项目列表状态数量
            async getProjectCount(){
                try {
                    let {code, data} = await this.$api.project.getProjectCount();
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
            // 获取项目列表
            async getProjectList(){
                try {
                    let {code, data} = await this.$api.project.getProjectList(this.curPageNum, this.pageSize, this.curStatus);
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
                this.resetList();
            },
            // 添加项目
            handleAdd() {
                this.form = {
                    projectName: '',
                    projectCode: '',
                    beginTime: '',
                    endTime: '',
                    masterList: [],
                    projectDescription: '',
                    productList: [],
                    publicFlag: 0
                };
                this.showAddModal = true;
            },
            // 添加项目保存
            async handleAddSubmit() {
                this.$refs.addForm.$refs.addForm.validate(async (valid) => {
                    if (valid) {
                        let params = this.$refs.addForm.$refs.addForm.model;
                        params.beginTime = formatDate(params.beginTime);
                        params.endTime = formatDate(params.endTime,'end');
                        try {
                            let {code} = await this.$api.project.addProject(params);
                            if(code === 0){
                                this.resetList();
                                this.showAddModal = false;
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
            // 添加项目取消
            handleAddCancel() {
                this.showAddModal = false;
            },
            // 导出项目excel
            handleExport() {
                try {
                    this.$api.project.exportProject(this.curStatus).then((res)=>{
                        let blob = new Blob([res], {type: "application/vnd.ms-excel"});
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = `项目列表${ moment().format('YYYYMMDD')}.xlsx`;
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
    .project-home-container {
        padding: 0 16px 24px;

        .home-header {
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
    }
</style>
