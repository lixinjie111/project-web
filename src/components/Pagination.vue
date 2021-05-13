<template>
  <a-pagination
    v-model="curPageNum"
    :page-size-options="pageSizeOptions"
    :total="total"
    show-size-changer
    :page-size="pageSize"
    @showSizeChange="onShowSizeChange"
  >
    <template slot="buildOptionText" slot-scope="props">
      <span>每页 {{ props.value }} 页</span>
    </template>
  </a-pagination>
</template>
<script>
export default {
  name: 'Pagination',
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
    
  }
}
</script>