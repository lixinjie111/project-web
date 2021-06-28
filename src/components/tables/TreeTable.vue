<template>
  <!--      :row-selection="rowSelection"-->
  <div class="tree-table-wrapper">
    <a-table
        bordered
        :expandIconColumnIndex="1"
        :loading="loading"
        :data-source="dataSource"
        rowKey="id"
        :columns="columns"
        :pagination="false"
        children-column-name="childrenList"
        v-if="dataSource.length"
        :scroll="{x: scrollWidth}">
      <template slot="status" slot-scope="text">
        <Status :value="text"/>
      </template>
      <template slot="priority" slot-scope="text">
        <Priority :value="text"/>
      </template>
      <template slot="progress" slot-scope="text, record">
        <!-- <a-progress :percent="parseInt(text)" size="small"/> -->
        <Progress :percent="Number(text)" :status="record.status"/>
      </template>
    </a-table>
    <NoData v-else></NoData>
    <Pagination v-bind="{curPageNum: currentPage, pageSize: pageSize, total: total}" @pagination-change-page="handlePage" @pagination-change-pagesize="handlePageSize" v-if="total > pageSize"></Pagination>
  </div>
</template>

<script>
  import Status from "@/components/business/Status";
  import Priority from "@/components/business/Priority";
  import Progress from "@/components/business/Progress";
  import NoData from "@/components/others/NoData";

  export default {
    name: "TreeTable",
    components: {Status, Priority, Progress, NoData},
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
        default: () => [],
        type: Array,
      },
      dataSource: {
        default: () => [],
        type: Array,
      },
      currentPage: {
        type: Number
      },
      pageSize: {
        type: Number
      },
      total: {
        type: Number
      },
    },
    computed: {
      scrollWidth() {
        return this.columns.reduce((sum, col) => sum + (col.width ? col.width : 120), 0);
      }
    },
    methods: {
      handlePage(page) {
        this.$emit('pageChange', page, this.pageSize);
      },
      handlePageSize(size) {
        this.$emit('pageChange', this.currentPage, size);
      },
    }
  }
</script>

<style scoped>
  .tree-table-wrapper {
    margin: 16px;
    /*background-color: white;*/
  }
</style>

<style lang="scss">
  $border: 1px solid #EAEDF7;
  .tree-table-wrapper {
    /*border: $border;*/
    border-radius: 2px;

    .ant-table {
      background-color: white;
    }

    .ant-table-thead {
      height: 48px;
      border: $border;

      th {
        font-size: 14px;
        font-weight: 400;
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

    .ant-table-fixed-left {
      .ant-table-fixed {
        width: 300px;
      }
    }
  }
</style>
