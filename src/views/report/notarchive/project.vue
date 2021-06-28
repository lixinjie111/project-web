<template>
    <div class="notarchive-project-container">
        <div class="list-header">重点项目</div>
        <div class="list-content">
            <ProjectList v-if="tableData.length" :list="tableData"></ProjectList>
            <NoData v-else :title="!archiveId ? '本周周报暂未生成': '该部门未制定本月月度计划'" :isShowBtn="!archiveId"></NoData>
        </div>
    </div>
</template>

<script>
    import ProjectList from './components/ProjectList'
    import NoData from './components/NoData';

    export default {
        name: "project",
        components: {ProjectList, NoData},
        data() {
            return {
                tableData: []
            }
        },
        computed: {
            archiveId(){ // 归档id
                return this.$store.state.report.archiveId
            }
        },
        created() {
            this.getKeyProjectList();
        },
        methods: {
            // 获取重点项目列表
            async getKeyProjectList(){
                try {
                    let {code, data} = await this.$api.report.getKeyProjectList();
                    if(code === 0){
                        let {archiveId, list} = data;
                        this.tableData = list || [];
                        this.$store.dispatch('initArchiveId', archiveId || '');
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
.notarchive-project-container {
    .list-header {
        position: fixed;
        padding: 24px 0 8px 8px;
        width: 100%;
        // height: 44px;
        line-height: 44px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #242F57;
        background: #F4F7FC;
        z-index: 100;
    }
    .list-content {
        margin-top: 76px;
    }
}
</style>