<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">我的工作台</div>
        </MenuNav>
        <div class="mine-task-container">
            <ContentHeader class="mine-task-header" type="title" title="我的任务">
                <div class="header-left" slot="left">
                    <BasicTabs :tabList="tabList" :tabActive="tabActive" @change="handleChangeTab"></BasicTabs>
                </div>
                <div slot="operation">
                    <a-button type="primary" @click="handleCreate" v-if="isInPermission('business_project_add')">
                        <span class="iconfont iconjia"></span>
                        添加任务
                    </a-button>
                </div>
            </ContentHeader>
            <TaskList enter-type="mine" :page="page" :page-size="pageSize" :total="total" :table-data="tableData" :view-type="viewType"
                      @update="handleAddUpdate" @change="handleTaskListChange" @pageChange="handlePageChange" ref="taskList" />
        </div>
    </div>
</template>

<script>
    import TaskList from "../task/components/list";
    import BasicTabs from "@/components/tabs/BasicTabs";
    import {isInPermission} from '@/utils/common.js';

    export default {
        name: "task",
        components: {TaskList, BasicTabs},
        data() {
            return {
                tabActive: 0, //当前任务种类
                tabList: [
                    {
                        name: '我的全部任务',
                        status: 0
                    },
                    {
                        name: '我创建的',
                        status: 1
                    },
                    {
                        name: '我负责的',
                        status: 2
                    },
                    {
                        name: '指派给我',
                        status: 3
                    }
                ],
                page: 1,
                pageSize: 10,
                total: 0,
                tableData: [],
                viewType: 0
            }
        },
        created() {
            this.getMyTaskCount();
            this.getMyTaskList();
        },
        methods: {
            isInPermission,
            handleAddUpdate() {
                this.tabActive = 0;
            },
            handleTaskListChange() {
                this.getMyTaskCount();
                this.getMyTaskList();
            },
            handlePageChange(page) {
                this.page = page;
                this.getMyTaskList();
            },
            handleChangeTab(kind) {
                this.tabActive = kind;
                this.getMyTaskList();
            },
            handleCreate() {
                this.$refs.taskList.handleCreate();
            },
            // 获取任务列表种类数量
            async getMyTaskCount(){
                try {
                    let {code, data} = await this.$api.mine.getMyTaskCount();
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
            // 获取我的任务列表
            async getMyTaskList(){
                try {
                    let {code, data} = await this.$api.mine.getMyTaskList(this.page, this.pageSize, this.tabActive);
                    if(code === 0){
                        let {total, records} = data;
                        this.total = total;
                        this.tableData = records;
                        this.tableData.forEach(item => {
                            if (item.childrenList) {
                                if (item.childrenList.length === 0)
                                    delete item.childrenList;
                                else {
                                    item.childrenList.forEach(child => {
                                        child.isChild = true;
                                        child.parentId = item.id;
                                        if (child.childrenList && child.childrenList.length === 0)
                                            delete child.childrenList;
                                    }); // end 2
                                }
                            }
                        }) // end 1
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

    .mine-task-container {
        margin: 0 16px;

        .mine-task-header {
            margin-left: 8px;
        }

        /deep/ .tree-table-wrapper {
            margin: 0;
        }

    }
</style>
