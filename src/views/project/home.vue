<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">首页</div>
        </MenuNav>
        <div class="home-container">
            <ContentHeader type="title" title="项目">
                <div slot="operation">
                    <a-button class="export-btn mr-16">
                        <span class="iconfont icondaochu"></span>
                        导出
                    </a-button>
                    <a-button type="primary" @click="handleAdd">
                        <span class="iconfont iconjia"></span>
                        添加项目
                    </a-button>
                </div>
            </ContentHeader>
            <div class="home-content">
                <BasicTabs :tabList="tabList"></BasicTabs>
                <ProjectList :list="listData" :page="pageInfo"></ProjectList>
            </div>
        </div>
        <Modal :isShow="showAddModal" :title="addModal.modalTitle" :okText="addModal.okText" :cancelText="addModal.cancelText" headeralgin="left" @modal-sure="handleAddSubmit" @modal-cancel="handleAddCancel">
            <AddForm slot="content"></AddForm>
        </Modal>
    </div>
</template>
<script>
    import BasicTabs from "@/components/tabs/BasicTabs";
    import ProjectList from "./components/list";
    import Modal from '@/components/Modal.vue'
    import AddForm from "./components/addForm";

    export default {
        name: 'home',
        components: {AddForm, Modal, ProjectList, BasicTabs},
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
                listData: [
                    {
                        endTime: "2021/05/14",
                        id: 213423,
                        progress: 90,
                        projectMaster: "zhangsan,wanghu",
                        projectName: "项目名称",
                        restHour: 180,
                        status: 1,
                        statusDesc: "已延期",
                        usedHour: 180,
                        workHour: 180
                    },
                    {
                        endTime: "2021/05/14",
                        id: 213423,
                        progress: 20.5,
                        projectMaster: "zhangsan,wanghu",
                        projectName: "项目名称",
                        restHour: 180,
                        status: 3,
                        statusDesc: "已延期",
                        usedHour: 180,
                        workHour: 180
                    }
                ],
                pageInfo: {
                    total: 50, // 总数据条数
                    pageSize: 10, // 页面数据size
                    curPageNum: 1, // 当前页码
                },
                showAddModal: false,
                addModal: {
                    modalTitle: '添加项目',
                    okText:'保存',
                    cancelText:'取消'
                },
            }
        },
        methods: {
            getList() {

            },
            handleAdd() {
                this.showAddModal = true;
            },
            // 添加项目保存
            handleAddSubmit() {
                this.showAddModal = false;
            },
            // 添加项目取消
            handleAddCancel() {
                this.showAddModal = false;
            },
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

    .home-container {
        margin: 16px 24px 24px 24px;

        .export-btn {
            margin-right: 16px;
            color: #636E95;
            background-color: transparent;
            border-color: #C6CBDE;
        }
    }
</style>