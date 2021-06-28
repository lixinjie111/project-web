<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">我的工作台</div>
        </MenuNav>
        <div class="list-header">重点项目</div>
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

    .list-header {
        position: fixed;
        top: 51px;
        padding: 24px 0 8px 24px;
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
    .mine-home-container {
        margin-top: 76px;
        padding: 0 16px 24px;
    }
</style>
