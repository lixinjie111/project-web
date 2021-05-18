<template>
  <a-table
      bordered
      class="tree-table-wrapper"
      :row-selection="rowSelection"
      :expandIconColumnIndex="2"
      :loading="loading"
      :data-source="dataSource"
      rowKey="id"
      :columns="columns">
    <template slot="status" slot-scope="text">
      <Status :value="text"/>
    </template>
    <template slot="priority" slot-scope="text">
      <Priority :value="text"/>
    </template>
    <template slot="progress" slot-scope="text">
      <a-progress :percent="text*10" size="small"/>
    </template>
  </a-table>
</template>

<script>
  import Status from "@/components/business/Status";
  import Priority from "@/components/business/Priority";

  export default {
    name: "TreeTable",
    components: {Status, Priority},
    data() {
      return {
        loading: false,
        removeList: [],
        rowSelection: {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
          },
          onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
          },
        },
      }
    },
    props: {
      columns: {
        default: [],
        type: Array,
      },
      dataSource: {
        default: [],
        type: Array,
      },
    }
  }
</script>

<style scoped>
  .tree-table-wrapper {
    margin: 16px;
    background-color: white;
  }
</style>

<style lang="scss">
  $border: 1px solid #EAEDF7;
  .tree-table-wrapper {
    /*border: $border;*/
    border-radius: 2px;

    .ant-table-thead {
      height: 48px;
      border: $border;

      th {
        font-size: 14px;
        font-weight: 500;
        color: #97A0C3;
        line-height: 22px;
        padding: 12px;
        background: #FFFFFF;
      }
    }

    .ant-table-tbody {
      border: $border;
      tr {
        height: 48px;

        td {
          font-size: 14px;
          font-weight: 400;
          color: #242F57;
          line-height: 22px;
          padding: 12px;
          border-bottom: $border;
          border-right: $border;
        }
      }
    }
  }
</style>
