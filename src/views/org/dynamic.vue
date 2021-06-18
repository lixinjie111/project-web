<template>
  <div class="dynamic-container">
    <div class="dynamic-content">
      <DynamicList :list="list"
                :total="total" :curPageNum="curPageNum" :pageSize="pageSize"
                @pagination-change-pagesize="handleChangePageSize"
                @pagination-change-page="handleChangePage"/>
    </div>
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
.dynamic-container {
  overflow: hidden;
  .dynamic-content {
    margin: 16px 24px 24px 24px;
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 8px 0px rgba(124, 136, 177, 0.12);
  }
}
</style>