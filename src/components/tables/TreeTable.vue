<template>
  <a-table
      bordered
      class="tree-table-wrapper"
      :row-selection="rowSelection"
      :expandIconColumnIndex="2"
      :loading="loading"
      :data-source="tableData"
      :columns="tableColumns">
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
        tableData: [
          { id: 1000, name: 'vxe-table 从入门到放弃1', status: 3, type: 'mp3', size: 1024, date: '2020-08-01' },
          {
            id: 1005,
            name: 'Test2',
            status: 1,
            type: 'mp4',
            size: null,
            date: '2021-04-01',
            children: [
              { id: 24300, name: 'Test3', status: 1, type: 'avi', size: 1024, date: '2020-03-01' },
              { id: 20045, name: 'vxe-table 从入门到放弃4', status: 1, type: 'html', size: 600, date: '2021-04-01' },
              {
                id: 10053,
                name: 'vxe-table 从入门到放弃96',
                status: 1,
                type: 'avi',
                size: null,
                date: '2021-04-01',
                children: [
                  { id: 24330, name: 'vxe-table 从入门到放弃5', status: 1, type: 'txt', size: 25, date: '2021-10-01' },
                  { id: 21011, name: 'Test6', status: 2, type: 'pdf', size: 512, date: '2020-01-01' },
                  { id: 22200, name: 'Test7', status: 1, type: 'js', size: 1024, date: '2021-06-01' }
                ]
              }
            ]
          },
          { id: 23666, name: 'Test8', status: 1, type: 'xlsx', size: 2048, date: '2020-11-01' },
          { id: 24555, name: 'vxe-table 从入门到放弃9', status: 1, type: 'avi', size: 224, date: '2020-10-01' }
        ],
        tableColumns: [
          // {
          //   type: 'checkbox',
          //   width: 60,
          // },
          {
            dataIndex: 'id',
            title: 'ID',
          },
          {
            dataIndex: 'name',
            title: '任务名称',
            treeNode: true,
          },
          {
            dataIndex: 'status',
            title: '状态',
            scopedSlots: {
              customRender: 'status'
            }
          },
          {
            dataIndex: 'status',
            title: '优先级',
            scopedSlots: {
              customRender: 'priority'
            }
          },
          {
            dataIndex: 'type',
            title: '任务类型',
          },
          {
            dataIndex: 'type',
            title: '负责人',
          },
          {
            dataIndex: 'type',
            title: '执行者',
          },
          {
            dataIndex: 'type',
            title: '工时/消耗',
          },
          {
            dataIndex: 'type',
            title: '工时/剩余',
          },
          {
            dataIndex: 'status',
            title: '进度',
            scopedSlots: {
              customRender: 'progress'
            }
          },
        ]
      }
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
