<template>
  <div class="org-dynamic-container">
    <ContentHeader class="org-dynamic-header" type="title" title="全部动态"></ContentHeader>
      <DynamicList :list="list"
                :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                @pagination-change-pagesize="handleChangePageSize"
                @pagination-change-page="handleChangePage"/>
    </div>
</template>
<script>
import DynamicList from '@/components/others/DynamicList'
export default {
  name: 'dynamic',
  components: {DynamicList},
  data(){
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
<style lang="scss" scoped>
.org-dynamic-container {
  padding: 0 16px;

  .org-dynamic-header {
    margin-left: 8px;
  }
}
</style>
