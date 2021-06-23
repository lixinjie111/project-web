<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">我的工作台</div>
        </MenuNav>
        <div class="mine-home-container">
            <ProjectList :list="tableData"></ProjectList>
        </div>
    </div>
</template>

<script>
    import ProjectList from "@/views/report/notarchive/components/ProjectList";

    export default {
        name: "home",
        components: {ProjectList},
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.getMyKeyProjectList();
        },
        methods: {
            // 获取重点项目列表
            async getMyKeyProjectList(){
                try {
                    let {code, data} = await this.$api.mine.getMyKeyProjectList();
                    if(code === 0){
                        this.tableData = data;
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

    .mine-home-container {
        padding: 24px 16px;
    }
</style>
