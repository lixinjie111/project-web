<template>
  <div class="userorg-container">
    <ContentHeader type="title" title="用户管理">
      <div slot="operation">
        <a-button v-if="isInPermission('sys_user_add')" type="primary" @click="handleAddEditUser('add')">添加用户</a-button>
      </div>
    </ContentHeader>
    <div class="userorg-content">
      <div class="userorg-left">
        <div class="userorg-tree">
          <Tree v-if="treeList.length" :treeData="treeList" :replaceFields="replaceFields" @onSelectTreeNodes="handleGetDepartUsers"></Tree>
          <div v-else class="empty">暂无部门</div>
        </div>
        <div class="btn" @click="handleGotoPage">管理部门结构</div>
      </div>
      <div class="userorg-right">
        <div :class="['userorg-table', total > pageSize ? 'has-pagination' : 'no-pagination']">
          <BasicTable :tableData="tableData" :setTableColumns="setTableColumns"></BasicTable>
        </div>
        <Pagination v-if="total > pageSize" :total="total" :curPageNum="curPageNum" :pageSize="pageSize" @pagination-change-pagesize="handleChangePageSize" @pagination-change-page="handleChangePage"></Pagination>
      </div>
      <UserForm :isShow="isShowModal" :modal="modal" :form="form" :treeList="treeList" :roleList="roleList" @submitUserForm="handleRefresh" @closeUserForm="isShowModal = false"></UserForm>
    </div>
  </div>
</template>
<script>
import Tree from '@/components/tree/Tree.vue';
import BasicTable from '@/components/tables/BasicTable.vue';
import UserForm from './components/UserForm.vue';
import {isInPermission} from '@/utils/common.js'
export default {
  name: 'userorg',
  components: {Tree, BasicTable, UserForm},
  data() {
    return {
      deptId: '', // 查询部门
      total: 0, // 总数据条数
      pageSize: 10, // 页面数据size
      curPageNum: 1, // 当前页码

      treeList: [], // 部门树
      replaceFields: {
        key: 'id',
        value: 'id',
        title: 'name',
        children: 'children',
      },

      // 配置表格各字段
      setTableColumns: [
        // {type: 'checkbox', width: '60'},
        {title: '用户ID', field: 'userId', showOverflow: true,},
        {title: '真实姓名', field: 'realName', showOverflow: true,},
        {title: '用户姓名', field: 'username', showOverflow: true,},
        {title: '职位', field: 'position'},
        {title: '性别', field: 'gender', formatter: ({cellValue}) => cellValue==0 ? '男' : '女'},
        {title: '电话', field: 'phone', showOverflow: true,},
        {title: '最后登录', field: 'lastLoginTime', showOverflow: true,},
        {title: '访问次数', field: 'viewTimes', showOverflow: true,},
        {title: '冻结', field: 'lockFlag', width: '70', visible: isInPermission('sys_user_lock'),
          slots: {
            // 使用 JSX 渲染
            default: ({ row }) => {
              let status = !Number(row.lockFlag); // 锁定标记：0 正常 9 已锁定
              return [
                <a-switch size='small' v-model={status} onClick={() => this.changeSwitch(row)}></a-switch>
              ]
            }
          }
        },
        { title: '操作', field: '', visible: isInPermission('sys_user_edit') || isInPermission('sys_user_del'),
          slots: {
            default: ({row, rowIndex}) => {
              return [
                <div class="operations">
                  { isInPermission('sys_user_edit') ? <span class="iconfont iconxiezuo" onClick={() => this.handleAddEditUser('edit', row)}></span> : null}
                  { isInPermission('sys_user_del') ? <span class="iconfont iconshanchu" onClick={() => this.handleDelUser(row)}></span> : null}
                </div>
              ]
            }
          }
        },
      ],
      tableData: [],

      roleList: [], // 角色列表
      
      isShowModal: false, // 编辑 新增modal
      modal: {
        modalTitle: '新增用户', // modal title
        cancelText: '取消', 
        okText: '保存'
      },
      form: {}
    }
  },
  methods: {
    isInPermission,
    // 路由跳转
    handleGotoPage() {
      this.$router.push('/org/depart')
    },

    // 查询部门树
    handleGetDepartTree(){
      try {
        this.$store.dispatch('initDeptTree').then(() => {
          this.$set(this, 'treeList', this.$store.state.deptTree);
        })
      }catch(error){
        console.log(error);
      }
    },
    
    // 查询部门人员列表
    async handleGetUserList() {
      try {
        let {code, data} = await this.$api.org.getAdminUserList(this.deptId, this.curPageNum, this.pageSize);
        if(code === 0){
          this.total = data?.total || 0;
          this.tableData = data?.records || [];
        }
      }catch(error){
        console.log(error)
      }
    },

    // 切换条目数量
    handleChangePageSize(pageSize, pageNum) {
      this.pageSize = pageSize;
      if(pageNum) this.curPageNum = pageNum;
      this.handleGetUserList();
    },
    // 切换当前页码
    handleChangePage(pageNum){
      this.curPageNum = pageNum;
      this.handleGetUserList();
    },

    // tree选择部门 查询部门下人员
    handleGetDepartUsers(departIds){
      this.deptId = departIds.length ? departIds[0] : '';
      this.handleGetUserList();
    },

    // 切换冻结状态
    async changeSwitch(row){
      console.log(row);
      try {
        let {code, data} = await this.$api.org.handlePutLockUser(row.userId, row.lockFlag === '0' ? 9 : 0);
        if(code === 0) {
          this.$message.success('冻结成功！');
          this.handleGetUserList();
        }
      }catch(error){
        console.log(error)
      }
    },

    // 新增、编辑用户条目
    handleAddEditUser(type, row) {
      let reset = type == 'add' ? 
        {userId: '', username: '', realName: '', deptId: '', password: '', phone: '', position: '', roleList: [], gender: 0} 
        : {userId: row.userId, username: row.username, realName: row.realName, deptId: row.deptId, password: '', phone: row.phone, position: row.position, roleList: row.roleList.map(item => item.roleId), gender: row.gender};
      this.$set(this, 'form', reset);

      !this.roleList.length && this.handleGetAdminRoleList()
      this.isShowModal = true;
    },

    // 获取角色列表
    async handleGetAdminRoleList() {
      try {
        let {code, data} = await this.$api.org.getAdminRoleList();
        if(code === 0){
          this.roleList = data;
        }
      }catch(error){
        console.log(error)
      }
    }, 

    // 关闭弹窗刷新列表
    handleRefresh() {
      this.isShowModal = false; // 接口提交成功 isShow
      this.handleGetUserList(); // 刷新用户列表
    },

    // 删除用户条目
    handleDelUser(row) {
      this.$confirms({
        title: '提示',
        message: `您确定要删除 ${row.realName} 吗？`,
        okText: '确认删除',
        onOk:() => {
          this.$api.org.handleDelAdminUser(row.userId).then(response => {
            let {code} = response;
            if(code === 0){
              this.$message.success('删除成功！');
              this.handleGetUserList();
            }else{
              this.$message.error('删除失败！');
            }
          })
        },
        cancelText: '取消',
        onCancel() {
        }
      });
    },
  },
  mounted(){
    this.handleGetDepartTree();
    this.handleGetUserList();
  }
}
</script>
<style lang="scss" scoped>
.userorg-container{
  margin: 16px 24px 24px 24px;
  
  .userorg-content {
    display: flex;
  }

  .userorg-left{
    margin-right: 16px;
    padding: 24px 24px 32px 24px;
    width: 280px;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    .userorg-tree {
      height: calc(100% - 40px);
      .empty {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #C6CBDE;
        // background: #F0F8FF;
        &:before {
          margin-right: 7px;
          display: inline-block;
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C6CBDE;
        }
      }
    }
    .btn {
      margin: 0 auto;
      width: 160px;
      height: 40px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 40px;
      background: #2373FF;
      border-radius: 4px;
    }
  }
  .userorg-right {
    flex: 1;
    overflow: hidden;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    .userorg-table {
      &.no-pagination {
        height: 100%;
      }
      &.has-pagination {
        height: calc(100% - 63px);
      }
    }
    .operations {
      .iconfont {
        display: inline-block;
        width: 20px;
        height: 20px;
        color: #0064FF;
        background: rgba(255, 255, 255, 0.01);
        cursor: pointer;
        &.iconshanchu {
          color: #FF4C60;
        }
      }
    }
  }
}
</style>