<template>
    <div class="layout">
        <MenuNav>
            <div slot="nav-left" class="nav-left-title">我的工作台</div>
        </MenuNav>
        <div class="mine-dynamic-container">
           <DynamicList :list="list"
                        :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                        @pagination-change-pagesize="handleChangePageSize"
                        @pagination-change-page="handleChangePage">
           </DynamicList>
        </div>
    </div>
</template>

<script>
    import DynamicList from '@/components/business/DynamicList'

    export default {
        name: "dynamic",
        components: {DynamicList},
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
        methods: {
            // 切换条目数量
            handleChangePageSize(pageSize,pageNum) {
                this.pageSize = pageSize;
                if (pageNum) this.curPageNum = pageNum;
                this.getMyDynamicStates();
            },
            // 切换当前页码
            handleChangePage(pageNum) {
                this.curPageNum = pageNum;
                this.getMyDynamicStates();
            },
            // 获取我的动态列表
            async getMyDynamicStates(){
                try {
                    let {code, data} = await this.$api.mine.getMyDynamicStates(this.curPageNum, this.pageSize);
                    if(code === 0){
                        let {total, records} = data;
                        this.total = total;
                        this.list = records;
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

    .mine-dynamic-container {
        margin: 24px;
        padding: 24px;
        background: #FFFFFF;
        box-shadow: 0px 0px 8px 0px rgba(124, 136, 177, 0.12);
        border-radius: 4px;
    }
</style>