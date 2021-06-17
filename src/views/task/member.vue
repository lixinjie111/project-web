<template>
<div>
  <TaskMenu @change="handleProjectChange" />
  <div class="container">
    <ContentHeader type="title" title="项目成员">
      <div slot="operation">
        <a-button type="primary" @click="handleAddEditUser" v-if="canAdd">
          <i class="iconfont iconjia"></i>
          添加项目成员</a-button>
      </div>
    </ContentHeader>
    <div class="table">
      <BasicTable v-if="memberList.length"
                  :tableData="memberList"
                  :setTableColumns="columns"
      ></BasicTable>
      <NoData v-else></NoData>
    </div>
  </div>
</div>
</template>

<script>

  import UserSelectTree from "@/components/business/UserSelectTree";
  import TaskMenu from "./components/menu";
  import {isInPermission} from "@/utils/common";
  import BasicTable from "@/components/tables/BasicTable";
  import NoData from "@/components/others/NoData";
  import {addProjectMember} from "@/api/task";

  export default {
    name: "Member",
    components: {UserSelectTree, TaskMenu, BasicTable, NoData},
    data() {
      let projectId = parseInt(this.$router.currentRoute.query.id);
      let canAdd = isInPermission('business_member_edit');
      let canDelete = isInPermission('business_member_del');
      return {
        projectId,
        showEdit: false,
        showAdd: false,
        canAdd,
        columns: [
          {
            title: '姓名',
            field: 'userName',
            minWidth: 150,
            showOverflow: true,
            slots: {
              default: ({row}) => {
                if (this.showAdd)
                return [
                  <UserSelectTree on-select={e => this.handleRowChange(row, e)} />
              ]
                else
                  return row.userName
              }
            },
            // editRender: {
            //   // name: 'UserSelectTree',
            //   name: 'input',
            //   enabled: isInPermission('business_member_add'),
            //   // attrs: {type: 'text', placeholder: '请输入下周工作计划'},
            //   events: {
            //     change: (record, e) => this.handleRowChange(record, e),
            //     select: (record, e) => this.handleRowChange(record, e)
            //   }
            // }
          },
          {
            field: 'userRole',
            title: '角色',
          },
          {
            field: 'beginTime',
            title: '加入日期',
          },
          {
            field: 'type',
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
      handleRowChange(record, data) {
        console.log(record, data);
        addProjectMember({
          projectId: this.projectId,
          userId: data.userId,
          userName: data.userName,
          userRole: data.roleName,
        }).then(res => {
          if (res.code === 0 && res.data) {
            this.showAdd = false;
            this.showEdit = false;
            this.$store.dispatch('projectMemberList', this.projectId);
          }
        }).catch(err => {})
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
