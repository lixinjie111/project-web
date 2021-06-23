<template>
    <div class="task-dynamic-container">
        <TaskMenu @change="handleProjectChange"/>
        <div class="task-dynamic-content">
            <ContentHeader class="task-dynamic-header" type="title" title="项目动态"></ContentHeader>
            <DynamicList :list="list"
                         :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                         @pagination-change-pagesize="handleChangePageSize"
                         @pagination-change-page="handleChangePage"/>
        </div>
    </div>
</template>

<script>
    import DynamicList from '@/components/others/DynamicList'
    import TaskMenu from "./components/menu";

    export default {
        name: "dynamic",
        components: {TaskMenu, DynamicList},
        data() {
            return {
                list: [],
                total: 0, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
            }
        },
        created() {
            this.getMyDynamicStates();
        },
        computed: {
            projectId() {
                return parseInt(this.$route.query.id)
            }
        },
        methods: {
            handleProjectChange() {
                this.getMyDynamicStates();
            },
            // 切换条目数量
            handleChangePageSize(pageSize, pageNum) {
                this.pageSize = Number(pageSize);
                if (pageNum) this.curPageNum = pageNum;
                this.getMyDynamicStates();
            },
            // 切换当前页码
            handleChangePage(pageNum) {
                this.curPageNum = pageNum;
                this.getMyDynamicStates();
            },
            // 获取我的动态列表
            async getMyDynamicStates() {
                try {
                    let {code, data} = await this.$api.task.getProjectDynamicList(this.curPageNum, this.pageSize,this.projectId);
                    if (code === 0) {
                        let {total, records} = data;
                        this.total = total;
                        this.list = records;
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .task-dynamic-container{
        .task-dynamic-content {
            padding: 0 16px;

            .task-dynamic-header {
                margin-left: 8px;
            }
        }
    }
</style>
