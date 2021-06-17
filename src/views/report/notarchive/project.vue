<template>
    <div class="notarchive-project-container">
        <ProjectList :list="tableData"></ProjectList>
    </div>
</template>

<script>
    import ProjectList from './components/ProjectList'

    export default {
        name: "project",
        components: {ProjectList},
        data() {
            return {
                tableData: []
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

<style scoped lang="scss">
    .notarchive-project-container {
        padding: 0 24px;
    }
</style>