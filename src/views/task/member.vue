<template>
  <div class="container">
    <ContentHeader type="title" title="项目成员">
      <div slot="operation">
        <a-button type="primary" @click="handleAddEditUser">
          <i class="iconfont iconjia"></i>
          添加项目成员</a-button>
      </div>
    </ContentHeader>
    <div class="table">
      <a-table :data-source="dataSource" :columns="columns" />
    </div>
    <a-modal title="选择成员" v-model="showEdit">
      <a-table />
    </a-modal>
  </div>
</template>

<script>
  import ContentHeader from "@/components/ContentHeader";

  export default {
    name: "Member",
    components: {ContentHeader},
    data() {
      return {
        showEdit: false,
        dataSource: [
          {
            "beginTime": "2021/05/14",
            "endTime": "2021/05/14",
            "id": 213423,
            "projectCode": "dsfds",
            "projectDescription": "项目描述",
            "projectName": "项目名称",
            "publicFlag": 0,
          },
          {
            "beginTime": "2021/05/14",
            "endTime": "2021/05/14",
            "id": 12312,
            "projectCode": "dsfds",
            "projectDescription": "项目描述",
            "projectName": "项目名称",
            "publicFlag": 0,
          },
          {
            "beginTime": "2021/05/14",
            "endTime": "2021/05/14",
            "id": 1234,
            "projectCode": "dsfds",
            "projectDescription": "项目描述",
            "projectName": "项目名称",
            "publicFlag": 0,
          },
        ],
        columns: [
          {
            dataIndex: 'projectName',
            title: '姓名',
          },
          {
            dataIndex: 'projectCode',
            title: '角色',
          },
          {
            dataIndex: 'beginTime',
            title: '加入日期',
          },
          {
            dataIndex: 'type',
            title: '操作',
            customRender: (text, record, index) => {
              return {
                attrs:{},
                props:{},
                class:{},
                style:{},
                children: this.$createElement('div', [
                  this.$createElement('i', {
                  'class': 'iconfont iconxiezuo',
                  on: {click: () => this.handleEdit(record)}}, ''),
                  this.$createElement('i', {
                  'class': 'iconfont iconshanchu',
                  on: {click: () => this.handleDelete(record)}}, ''),
                  ]
                )
              }
            }
          },
        ]
      }
    },
    methods: {
      handleAddEditUser() {
        this.showEdit = true;
      },
      handleEdit(record) {
        this.showEdit = true;
      },
      handleDelete(record) {
        this.dataSource.splice(this.dataSource.indexOf(record), 1);
      },
    }
  }
</script>

<style lang="scss" scoped>
.container {
  margin: 0 24px 24px 24px;
  .table {
    background: white;
    box-shadow: 0px 1px 8px 0px rgba(140, 144, 149, 0.16);
    border-radius: 8px;
    min-height: calc(100vh - 145px);
  }

  .iconfont {
    cursor: pointer;
  }
  .iconshanchu {
    margin-left: 16px;
  }
}
</style>
