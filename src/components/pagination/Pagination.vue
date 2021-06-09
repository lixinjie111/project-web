<template>
<div class="pagination">
  <a-select :default-value="`每页 ${pageSize} 条`" @change="handleChangePageSize">
    <a-select-option v-for="(item, index) in pageSizeOptions" :key="index" :value="`每页 ${item} 条`">每页 {{ item }} 条</a-select-option>
  </a-select>
  <a-pagination
    v-model="curPage"
    :total="total"
    :page-size="pageSize"
    :show-total="total => `共${total}条 到 `"
    @change="handleChangePage"
  >
  </a-pagination>
</div>
  
</template>
<script>
export default {
  name: 'Pagination',
  data() {
    return {
      curPage: this.curPageNum
    }
  },
  props: {
    curPageNum: {
      type: Number,
      required: true,
      default: 1
    },
    pageSizeOptions: {
      type: Array, 
      required: false,
      default: () => [10, 20, 30, 40, 50]
    },
    total: {
      type: Number | String,
      required: true,
    },
    pageSize: {
      type: Number | String,
      required: true,
      default: 10
    },
  },
  watch: {
    curPageNum(newVal) {
      this.curPage = newVal;
    }
  },
  methods: {
    handleChangePageSize(value) {
      let reg = /每页(\s*)([0-9]*)/;
      if(reg.test(value)) {
        let pageSize = RegExp.$2;
        let totalPageNum = Math.ceil(this.total/pageSize);
        if(totalPageNum < this.curPage) {
          this.$emit('pagination-change-pagesize', Number(pageSize), totalPageNum)
        } else {
          this.$emit('pagination-change-pagesize', pageSize);
        }
      }
    },
    handleChangePage(pageNum, pageSize) {
      console.log(pageNum, pageSize);
      this.$emit('pagination-change-page', pageNum)
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  /deep/ .ant-pagination {
    .ant-pagination-prev , .ant-pagination-next {
      .ant-pagination-item-link {
        border: none;
      }
    }
    .ant-pagination-item {
      border: none;
    }
  }
}
</style>
