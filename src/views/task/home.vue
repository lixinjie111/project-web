<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <a-radio-group default-value="a" size="large">
          <a-radio-button value="a" class="all">
            全部
            <span>8</span>
          </a-radio-button>
          <a-radio-button value="b">
            指派给我
          </a-radio-button>
          <a-radio-button value="c">
            在周报中显示
          </a-radio-button>
        </a-radio-group>
      </div>
      <div>
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            列表 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              列表
            </a-menu-item>
            <a-menu-item key="1">
              看板
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <FlatButton>
          新建任务
          <MyIcon slot="icon" name="icontianjia" type="main"/>
        </FlatButton>
        <a-divider type="vertical" />
        <FlatButton>
          导出
          <MyIcon slot="icon" name="icondaochu"/>
        </FlatButton>
      </div>
    </div>
    <TreeTable :columns="tableColumns" :data-source="tableData"/>
  </div>
</template>

<script>
  import TreeTable from '@/components/tables/TreeTable';
  import FlatButton from '@/components/buttons/FlatButton';
  import MyIcon from "@/components/others/MyIcon";

  export default {
    name: 'TaskHome',
    components: { TreeTable, FlatButton, MyIcon },
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
    },
    props: {
      msg: String
    },
    methods: {
      handleClick() {
        console.log('test')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  .header {
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-top: 1px solid #EAEDF7;
    border-bottom: 1px solid #EAEDF7;
    padding: 0 8px;
    margin-bottom: 16px;

    .left {
      display: flex;
      align-items: center;
    }
    .all {
      span {
        line-height: 16px;
        border-radius: 4px;
        border: 1px solid #EAEDF7;
        padding: 0 8px;
        width: 8px;
        height: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #242F57;
        margin-left: 4px;
      }
    }
  }
}
</style>
<style lang="scss">
  .header {
    .left {
      .ant-radio-button-wrapper {
        border: none;
        box-shadow: none !important;
        outline: none !important;
        color: #97A0C3;
        font-size: 14px;

        &:first-child {
          border-left: none;
        }
        &:not(:first-child)::before {
          content: '';
          width: 1px;
          height: 16px;
          background-color: #EAEDF7 !important;
          opacity: 1;
          top: 11px;
        }
        &.ant-radio-button-wrapper-checked {
          z-index: 0;
          color: #0064FF;
        }
      }
    }
  }
</style>
