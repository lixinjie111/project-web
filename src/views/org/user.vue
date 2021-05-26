<template>
  <div class="userorg-container">
    <ContentHeader type="title" title="用户管理">
      <div slot="operation">
        <a-button type="primary" @click="handleAddEditUser('add')">添加用户</a-button>
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
        <div class="userorg-table">
          <BasicTable :tableData="tableData" :setTableColumns="setTableColumns"></BasicTable>
        </div>
        <Pagination v-if="total > pageSize" :total="total" :curPageNum="curPageNum" :pageSize="pageSize" @pagination-change-pagesize="handleChangePageSize" @pagination-change-page="handleChangePage"></Pagination>
      </div>
      <Modal :isShow="isShowModal" :title="modal.modalTitle" :okText="modal.okText" :cancelText="modal.cancelText" headeralgin="center" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
        <a-form-model slot="content" ref="userForm"  class="user-form" layout="vertical" :model="form" :rules="rules">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="用户名" prop="username">
                <a-input v-model="form.username" placeholder="用户名" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="真实姓名" prop="realName">
                <a-input v-model="form.realName" placeholder="真实姓名" />
              </a-form-model-item>
            </a-col>
          </a-row>
          
          <a-form-model-item label="部门" prop="deptId">
            <a-tree-select
              v-model="form.deptId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :default-value ="form.deptId"
              :tree-data="treeList"></a-tree-select>
          </a-form-model-item>

          <a-form-model-item prop="roleList">
            <template slot="label">
              <span>角色分组</span>
              <span class="second-title">(分组决定用户的权限列表)</span>
            </template>
            <a-select v-model="form.roleList" mode="multiple" :default-value="form.roleList">
              <a-select-option v-for="item in roleList" :key="item.roleId">{{ item.roleName }}</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item prop="password">
                <template slot="label">
                  <span>密码</span>
                  <!-- <span class="second-title">(6位以上，包含大小写字母和数字)</span> -->
                </template>
                <a-input-password disabled v-model="form.password" placeholder="密码"></a-input-password>
                <a-button :class="['reset', form.userId ? '': 'reset-disabled']" type="link" ghost @click="handleResetPassWord(form.userId)">重置密码</a-button>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="电话" prop="phone">
                <a-input v-model="form.phone" placeholder="电话" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item prop="position">
                <template slot="label">
                  <span>职位</span>
                  <span class="second-title">(职位影响内容和用户列表的顺序)</span>
                </template>
                <a-input v-model="form.position" placeholder="职位"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="性别" prop="gender">
                <a-radio-group v-model="form.gender">
                  <a-radio :style="radioStyle" :value="0">男</a-radio>
                  <a-radio :style="radioStyle" :value="1">女</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </Modal>
    </div>
  </div>
</template>
<script>
import Tree from '@/components/Tree.vue';
import BasicTable from '@/components/tables/BasicTable.vue'
import Modal from '@/components/Modal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'userorg',
  components: {Tree, BasicTable, Modal, Pagination},
  data() {
    return {
      deptId: '', // 查询部门
      total: 0, // 总数据条数
      pageSize: 10, // 页面数据size
      curPageNum: 1, // 当前页码

      treeList: [], // 部门树
      replaceFields: {
        key: 'id',
        value: 'name',
        title: 'name',
        children: 'children',
      },

      // 配置表格各字段
      setTableColumns: [
        {type: 'checkbox', width: '60'},
        {title: '用户ID', field: 'userId', showOverflow: true,},
        {title: '真实姓名', field: 'realName', showOverflow: true,},
        {title: '用户姓名', field: 'username', showOverflow: true,},
        {title: '职位', field: 'position'},
        {title: '性别', field: 'gender', formatter: ({cellValue}) => cellValue==0 ? '男' : '女'},
        {title: '电话', field: 'phone', showOverflow: true,},
        {title: '最后登录', field: 'lastLoginTime', showOverflow: true,},
        {title: '访问次数', field: 'viewTimes', showOverflow: true,},
        {title: '冻结', field: 'lockFlag', width: '70', 
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
        { title: '操作', field: '', 
          slots: {
            default: ({row, rowIndex}) => {
              return [
                <div class="operations">
                  <span class="iconfont iconxiezuo" onClick={() => this.handleAddEditUser('edit', row)}></span>
                  <span class="iconfont iconshanchu" onClick={() => this.handleDelUser(row)}></span>
                </div>
              ]
            }
          }
        },
      ],
      tableData: [],
      
      isShowModal: false, // 编辑 新增modal
      modal: {
        modalTitle: '新增用户', // modal title
        cancelText: '取消', 
        okText: '保存'
      },
      roleList: [], // 角色列表

      radioStyle: {
        display: 'inline-block',
        height: '30px',
        lineHeight: '30px',
      }, 
      // form数据
      form: {
        userId: '',
        username: '',
        realName: '',
        deptName: '',
        password: '',
        phone: '',
        position: '',
        roleList: [],
        gender: 1
      },
       rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 3, max: 5, message: '用户名长度3 到 5', trigger: 'blur' },
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          // { min: 3, max: 5, message: '真实姓名长度3 到 5', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    // 路由跳转
    handleGotoPage() {
      this.$router.push('/org/depart')
    },

    // 查询部门树
    async handleGetDepartTree(){
      try {
        let {code, data, msg} = await this.$api.org.getDeptTree();
        if(code === 0){
          this.treeList = data;
        }
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
          this.$message.success('hahah')
        }
      }catch(error){
        console.log(error)
      }
    },

    // 新增、编辑用户条目
    handleAddEditUser(type, row) {
      let reset = type == 'add' ? 
        {userId: '', username: '', realName: '', deptId: '', password: '', phone: '', position: '', roleList: [], gender: 1} 
        : {userId: row.userId, username: row.username, realName: row.realName, deptId: row.deptId, password: '', phone: row.phone, position: row.position, roleList: row.roleList.map(item => item.roleId), gender: row.gender};
      this.$set(this, 'form', reset);
      console.log(this.treeList)

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

    // 校验新增 编辑用户信息
    handleSubmit() {
      console.log(this.form.roleList)
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          // 保存 新增和编辑
          let {userId, username, realName, deptId, roleList, phone, position, gender} = this.form;
          let {code} = await this.$api.org.handlePostPutAdminUser(userId, username, realName, deptId, roleList, phone, position, gender);
          if(code === 0) {
            this.$message.success('保存成功！');
            this.isShowModal = false; // 接口提交成功 isShow
            this.handleGetUserList(); // 刷新用户列表
          }
        } else {
          return false;
        }
      });
    },

    // 取消新增、编辑用户信息
    handleCancel() {
      this.isShowModal = false;
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

    // 重置密码
    async handleResetPassWord(userId) {
      console.log(userId)
      try {
        let {code} = await this.$api.org.handleResetPassWord(userId);
        if(code === 0) {
          this.$message.success('密码重置成功！')
        }
      }catch (error) {
        console.log(error)
      }
    }
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    .userorg-table {
      flex: 1;
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
 /deep/.ant-modal .user-form {
  .second-title {
    margin-left: 8px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #97A0C3;
  }
  .ant-form-item-required{
    &:before {
      display: none;
    }
    &:after {
      display: inline-block;
      margin-right: 4px;
      color: #f5222d;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
  }
  .reset{
    position: absolute;
    right: 16px;
    color: #2373FF;
    font-size: 12px;
    &.reset-disabled{
      cursor: not-allowed;
    }
  }
}
  
</style>