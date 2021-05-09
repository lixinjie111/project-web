<template>
  <vxe-grid
      border
      resizable
      show-overflow
      keep-source
      size="medium"
      ref="xTree"
      row-id="id"
      :print-config="{}"
      :export-config="{}"
      :loading="loading"
      :tree-config="{
                children: 'children'
              }"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="tableData"
  :columns="tableColumns">
  </vxe-grid>
</template>

<script>
  export default {
    name: "TreeTable",
    data() {
      return {
        loading: false,
        removeList: [],
        tableData: [
          { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
          {
            id: 1005,
            name: 'Test2',
            type: 'mp4',
            size: null,
            date: '2021-04-01',
            children: [
              { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
              { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
              {
                id: 10053,
                name: 'vxe-table 从入门到放弃96',
                type: 'avi',
                size: null,
                date: '2021-04-01',
                children: [
                  { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                  { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                  { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                ]
              }
            ]
          },
          { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
          { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
        ],
        tableColumns: [
          {
            checkbox: 'checkbox',
            width: 60,
          },
          {
            field: 'name',
            title: 'Name',
            treeNode: true,
          },
          {
            field: 'size',
            title: 'Size',
          },
          {
            field: 'type',
            title: 'Type',
          },
          {
            field: 'date',
            title: 'Date',
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
