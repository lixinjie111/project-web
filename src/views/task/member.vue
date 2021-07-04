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
                  ref="myTable"
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
  import {addProjectMember, deleteProjectMember, getProjectMemberList, saveProjectMember} from "@/api/task";

  export default {
    name: "Member",
    components: {UserSelectTree, TaskMenu, BasicTable, NoData},
    data() {
      let projectId = parseInt(this.$router.currentRoute.query.id);
      let canAdd = isInPermission('business_member_add');
      let canEdit = isInPermission('business_member_edit');
      let canDelete = isInPermission('business_member_del');

      let columns = [
        {title: '序号', align:'center', type: 'seq', width: 48},
        {
          title: '姓名',
          field: 'userName',
          width: 120,
          showOverflow: true,
          slots: {
            default: ({row}) => {
              if (this.showAdd && row.id === -1)
                return [
                  <UserSelectTree on-select={e => this.handleRowChange(row, e, 'userName')} />
            ]
            else
              return row.userName
            }
          },
        },
        {
          field: 'userNumber',
          title: '工号',
          width: 120,
        },
        {
          field: 'userRole',
          title: '角色',
          width: 220,
          editRender: {
            name: 'input',
            enabled: canEdit,
            // attrs: {type: 'text', placeholder: '请输入下周工作计划'},
            events: {
              blur: ({row}, e) => this.handleRowChange(row, e, 'userRole'),
            }
          }
        },
        {
          field: 'departName',
          title: '所属部门',
          width: 300,
        },
        {
          field: 'phone',
          title: '手机',
          width: 150,
        },
        {
          field: 'createdTime',
          title: '加入日期',
          minWidth: 150,
        }
      ];
      if (canDelete) {
        columns.push({
          field: 'type',
          title: '操作',
          width: 132,
          slots: {
            default: ({row}) => {
                let operation = [];
                // if (canEdit)
                //   operation.push(<i class="iconfont iconxiezuo" on-click={e => this.handleEdit(row)} />)
                if (canDelete)
                  operation.push(<i class="iconfont iconshanchu" on-click={e => this.handleDelete(row)} />)

                return operation;
              }
            },
          })
      }

      return {
        projectId,
        // showEdit: false,
        showAdd: false,
        canAdd,
        tableData: [],
        columns
      }
    },
    mounted() {
      this.loadMemberList();
    },
    computed: {
      memberList() {
        if (this.showAdd)
          return this.tableData.concat({id: -1});
        return this.tableData;
      },
    },
    methods: {
      loadMemberList() {
        getProjectMemberList(this.projectId).then(res => {
          if (res.code === 0 && res.data) {
            this.tableData = res.data.records;
          }
        }).catch(err => {
          this.tableData = [];
        });
      },
      handleAddEditUser() {
        if (this.showAdd) {
          this.$message.warn('你有一个未完成的添加成员');
          return;
        }
        this.showAdd = true;
        // this.showEdit = true;
        this.editId = -1;
        this.$nextTick( () => {
          this.$refs.myTable.$el.scrollIntoView(false);
        });
      },
      handleEdit(record) {
        this.showAdd = false;
        // this.showEdit = true;
        this.editId = record.id;
      },
      handleDelete(record) {
        if (record.id === -1) {
          this.showAdd = false;
        }
        else {
          let that = this;
          this.$confirms({
            title: '提示',
            message: `您确定要删除成员 ${record.userName} 吗？`,
            okText: '确认删除',
            icon: 'none',
            onOk() {
              deleteProjectMember(record.id).then(res => {
                if (res.code === 0 && res.data) {
                  that.$message.success('删除成功');
                  // this.tableData.splice(this.tableData.indexOf(record), 1);
                  that.loadMemberList();
                }
              })
            },
            onCancel() {}
          })
        }
      },
      handleProjectChange(projectId) {
        this.projectId = projectId;
        this.loadMemberList();
      },
      handleRowChange(row, data, field) {
        // console.log(row, data);
        // 新增
        if (row.id === -1) {
          if (field === 'userName') {
            addProjectMember({
              projectId: this.projectId,
              userId: data.userId,
              userName: data.userName,
              userRole: data.roleName,
            }).then(res => {
              if (res.code === 0 && res.data) {
                this.showAdd = false;
                // this.showEdit = false;
                this.loadMemberList();
              }
            }).catch(err => {
            })
          }
        }
        else if (row[field] !== data.target.value) {
          saveProjectMember({...row, [field]: data.target.value}).then(res => {
            if (res.code === 0 && res.data) {
              this.$message.success('修改成功');
            }
          }).catch(err => {});
        }
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
    border-radius: 4px;
    min-height: calc(100vh - 145px);
  }

  .iconfont {
    cursor: pointer;
  }
  .iconshanchu {
    /*margin-left: 16px;*/
    color: #FF4C60;
  }
}
</style>
