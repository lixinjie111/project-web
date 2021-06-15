<template>
<div>
  <TaskMenu @change="handleProjectChange" />
  <div class="container">
    <ContentHeader type="title" title="项目成员">
      <div slot="operation">
        <a-button type="primary" @click="handleAddEditUser">
          <i class="iconfont iconjia"></i>
          添加项目成员</a-button>
      </div>
    </ContentHeader>
    <div class="table">
      <a-table :data-source="memberList" :columns="columns" />
    </div>
  </div>
</div>
</template>

<script>

  import UserSelectTree from "@/components/business/UserSelectTree";
  import TaskMenu from "./components/menu";

  export default {
    name: "Member",
    components: {UserSelectTree, TaskMenu},
    data() {
      let projectId = parseInt(this.$router.currentRoute.query.id)
      return {
        projectId,
        showEdit: false,
        showAdd: false,
        columns: [
          {
            dataIndex: 'userName',
            title: '姓名',
            customRender: (text, record, index) => {
              if (this.showEdit && record.id === this.editId) {
                return {
                  attrs: {},
                  props: {},
                  class: {},
                  style: {},
                  children: this.$createElement(UserSelectTree, {
                    on: {select: (e) => this.handleRowChange(record, e)}
                  }, '')
                }
              }
              else
                return text;
            }
          },
          {
            dataIndex: 'userRole',
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
                attrs: {},
                props: {},
                class: {},
                style: {},
                children: this.$createElement('div', [
                  this.$createElement('i', {
                    'class': 'iconfont iconxiezuo',
                    on: {click: () => this.handleEdit(record)}
                  }, ''),
                  this.$createElement('i', {
                    'class': 'iconfont iconshanchu',
                    on: {click: () => this.handleDelete(record)}
                  }, ''),
                  ]
                )
              }
            }
          },
        ]
      }
    },
    mounted() {
      this.$store.dispatch('projectMemberList', this.projectId);
    },
    computed: {
      memberList() {
        if (this.showAdd)
          return [{id: -1}];
        return this.$store.state.task.memberList;
      },
    },
    methods: {
      handleAddEditUser() {
        this.showAdd = true;
        this.showEdit = true;
        this.editId = -1;
      },
      handleEdit(record) {
        this.showAdd = false;
        this.showEdit = true;
        this.editId = record.id;
      },
      handleDelete(record) {
        this.dataSource.splice(this.dataSource.indexOf(record), 1);
      },
      handleProjectChange(projectId) {
        this.projectId = projectId;
        this.$store.dispatch('projectMemberList', this.projectId);
      },
      handleRowChange(record, e) {
        console.log(record, e)
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
