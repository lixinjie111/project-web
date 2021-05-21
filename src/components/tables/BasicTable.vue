<template>
  <!-- <vxe-table
    border
    resizable
    ref="xTable"
    :data="tableData">
    <vxe-table-column v-for="(item, index) in setTableField" :key="index"
      :type="item.type" :title="item.title" :field="item.field" :width="item.width"  
      :cell-render="{content: item.render, events: {}}">
    </vxe-table-column>
  </vxe-table> -->
  <vxe-grid
    border
    resizable
    height="auto"
    :data="tableData"
    :columns="setTableColumns">
  </vxe-grid>
</template>
<script>
export default {
  props: {
    setTableColumns: {
      type: Array,
      required: true,
      default: () => []
    },
    tableData: {
      type: Array,
      required: true,
      default: () => []
    }
  }, 
  data() {
    return {

    }
  }
}
</script>
