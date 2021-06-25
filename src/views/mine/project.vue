<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">我的工作台</div>
        </MenuNav>
        <div class="mine-project-container">
            <ContentHeader class="mine-project-header" type="title" title="我的项目">
                <div class="header-left" slot="left">
                    <BasicTabs :tabList="tabList" :tabActive="tabActive" @change="handleChangeTab"></BasicTabs>
                </div>
                <div slot="operation">
                    <a-button type="primary" @click="handleAdd" v-if="isInPermission('business_project_add')">
                        <span class="iconfont iconjia"></span>
                        添加项目
                    </a-button>
                </div>
            </ContentHeader>
            <ProjectList ref="projectList" :list="listData" :productList="productList" @update="handleAddUpdate"
                         :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                         @pagination-change-pagesize="handleChangePageSize"
                         @pagination-change-page="handleChangePage"></ProjectList>
        </div>
    </div>
</template>

<script>
    import ProjectList from "@/views/project/components/list";
    import BasicTabs from "@/components/tabs/BasicTabs";
    import {isInPermission} from '@/utils/common.js';

    export default {
        name: "project",
        components: {BasicTabs, ProjectList},
        data() {
            return {
                tabActive: 0, //当前项目种类
                tabList: [
                    {
                        name: '我的全部项目',
                        status: 0,
                        num: 0
                    },
                    {
                        name: '我创建的',
                        status: 1,
                        num: 0
                    },
                    {
                        name: '我负责的',
                        status: 2,
                        num: 0
                    },
                    {
                        name: '我参与的',
                        status: 3,
                        num: 0
                    }
                ],
                listData: [],
                total: 0, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
                productList: []
            }
        },
        created() {
            this.resetList();
            this.getProductList();
        },
        methods:{
            isInPermission,
            // 重置列表
            resetList() {
                this.getMyProjectCount();
                this.getMyProjectList();
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
            handleChangeTab(kind) {
                this.tabActive = kind;
                this.getMyProjectList();
            },
            // 添加项目
            handleAdd() {
                this.$refs.projectList.handleAdd();
            },
            // 添加完成后更新列表
            handleAddUpdate() {
                this.tabActive = 0;
                this.getMyProjectCount();
                this.getMyProjectList();
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
            // 获取项目列表种类数量
            async getMyProjectCount(){
                try {
                    let {code, data} = await this.$api.mine.getMyProjectCount();
                    if(code === 0){
                        this.tabList = this.tabList.map((item) => {
                            let t = data.find((i) => {
                                return i.kind == item.status;
                            });
                            return {...item, ...t};
                        });
                    }
                }catch(error){
                    console.log(error)
                }
            },
            // 获取我的项目列表
            async getMyProjectList(){
                try {
                    let {code, data} = await this.$api.mine.getMyProjectList(this.curPageNum, this.pageSize, this.tabActive);
                    if(code === 0){
                        let {total, records} = data;
                        this.total = total;
                        this.listData = records;
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav-left-title {
        padding: 0 24px;
        line-height: 51px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #242F57;
    }

    .mine-project-container {
        padding: 0 16px;

        .mine-project-header {
            margin-left: 8px;
        }
    }
</style>
