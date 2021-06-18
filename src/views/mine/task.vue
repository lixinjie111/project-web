<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">我的工作台</div>
        </MenuNav>
        <div class="mine-task-container">
            <TaskList enter-type="mine" :page="page" :page-size="pageSize" :total="total" :table-data="tableData" :view-type="viewType"
                      @change="handleTaskListChange" @pageChange="handlePageChange" ref="taskList" />
        </div>
    </div>
</template>

<script>
    import TaskList from "../task/components/list";
    export default {
        name: "task",
        components: {TaskList},
        data() {
            return {
                page: 1,
                pageSize: 10,
                total: 0,
                tableData: [],
                viewType: 0
            }
        },
        created() {
            this.getMyTaskList();
        },
        methods: {
            handleTaskListChange() {
                this.getMyTaskList();
            },
            handlePageChange(page) {
                this.page = page;
                this.getMyTaskList();
            },
            // 获取我的任务列表
            async getMyTaskList(){
                try {
                    let {code, data} = await this.$api.mine.getMyTaskList(this.page, this.pageSize);
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
</style>