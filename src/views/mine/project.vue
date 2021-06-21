<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">我的工作台</div>
        </MenuNav>
        <div class="mine-project-container">
            <ProjectList :list="listData" :productList="productList"
                         :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                         @pagination-change-pagesize="handleChangePageSize"
                         @pagination-change-page="handleChangePage"></ProjectList>
        </div>
    </div>
</template>

<script>
    import ProjectList from "@/views/project/components/list";

    export default {
        name: "project",
        components: {ProjectList},
        data() {
            return {
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
            // 重置列表
            resetList() {
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
            // 获取我的项目列表
            async getMyProjectList(){
                try {
                    let {code, data} = await this.$api.mine.getMyProjectList(this.curPageNum, this.pageSize);
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
        padding: 24px;
    }
</style>