<template>
    <div class="layout">
        <div class="project-home-container">
            <ContentHeader class="home-header" type="title" title="项目">
                <div class="header-left" slot="left">
                   <BasicTabs :tabList="tabList" :tabActive="tabActive" @change="handleChangeTab"></BasicTabs>
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
                <ProjectList ref="projectList" :list="listData" @update="handleAddUpdate"
                             :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                             @pagination-change-pagesize="handleChangePageSize"
                             @pagination-change-page="handleChangePage"></ProjectList>
            </div>
        </div>
    </div>
</template>
<script>
    import BasicTabs from "@/components/tabs/BasicTabs";
    import ProjectList from "./components/list";
    import Modal from '@/components/Modal/Modal.vue'
    import {isInPermission} from '@/utils/common.js';
    import moment from "moment";

    export default {
        name: 'home',
        components: {Modal, ProjectList, BasicTabs},
        data() {
            return {
                tabActive: 5,
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
                curPageNum: 1 // 当前页码
            }
        },
        created() {
            this.resetList();
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
                    let {code, data} = await this.$api.project.getProjectList(this.curPageNum, this.pageSize, this.tabActive);
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
            // 添加完成后更新列表
            handleAddUpdate() {
                this.tabActive = 5;
                this.getProjectCount();
                this.getProjectList();
            },
            // 添加项目
            handleAdd() {
                this.$refs.projectList.handleAdd();
            },
            // 导出项目excel
            handleExport() {
                try {
                    this.$api.project.exportProject(this.tabActive).then((res)=>{
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
        height: 100%;

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
        .home-content {
            height: calc(100% - 72px);
            max-height: calc(100% - 72px);
            overflow: auto;
        }
    }
</style>
