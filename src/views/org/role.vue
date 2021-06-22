<template>
  <div class="role-container">
    <ContentHeader type="title" title="角色分组">
      <div slot="operation">
        <a-button v-if="isInPermission('sys_role_add')" type="primary" @click="handleAddEditRole('add')">
          <span class="iconfont iconjia"></span>
          添加角色分组
        </a-button>
      </div>
    </ContentHeader>
    <div class="role-content">
      <div :class="['role-table', total > pageSize ? 'has-pagination' : 'no-pagination']">
        <BasicTable :tableData="tableData" :setTableColumns="setTableColumns"></BasicTable>
      </div>
      <Pagination v-if="total > pageSize" :total="total" :curPageNum="curPageNum" :pageSize="pageSize" @pagination-change-pagesize="handleChangePageSize" @pagination-change-page="handleChangePage"></Pagination>
    </div>
    <Modal width="400" :isShow="isShowModal" :title="modalTitle" :okText="okText" :cancelText="cancelText" @modal-sure="handleSubmit" @modal-cancel="handleCancel">
      <a-form-model slot="content" ref="roleForm" class="role-form" layout="vertical" :model="form" :rules="rules">
        <a-form-model-item label="分组名称" prop="roleName">
          <a-input v-model="form.roleName" placeholder="" />
        </a-form-model-item>
      </a-form-model>
    </Modal>
  </div>
</template>
<script>
import BasicTable from '@/components/tables/BasicTable.vue'
import Modal from '@/components/Modal/Modal.vue'
import {isInPermission} from '@/utils/common.js'
export default {
  name: 'roleorg',
  components: {BasicTable, Modal},
  data() {
    return {
      total: null, // 总数据条数
      pageSize: 10, // 页面数据size
      curPageNum: 1, // 当前页码

      // 配置表格各字段
      setTableColumns: [
        {title: '编号', type: 'seq', width: 50},
        {title: '分组名称', field: 'roleName', showOverflow: true,},
        {title: '维护', width: '340',
          visible: isInPermission('sys_user_batch_role') || isInPermission('sys_role_perm'),
          slots: {
            // 使用 JSX 渲染
            default: ({ row }) => {
              return [
                <div class="permission">
                  {
                    isInPermission('sys_user_batch_role') ?
                    (<a-button onClick={() => this.handlePermission('role', row)}>
                      <span class="iconfont iconrenyuan"></span>
                      <span>组员管理</span>
                    </a-button>)
                    :
                    null
                  }
                  {
                    isInPermission('sys_role_perm') ?
                    (<a-button onClick={() => this.handlePermission('operation', row)}>
                      <span class="iconfont iconsuoding"></span>
                      <span>操作权限</span>
                    </a-button>)
                    :
                    null
                  }
                  {
                    false ?
                    (<a-button onClick={() => this.handlePermission('data', row)}>
                      <span class="iconfont iconshujuku"></span>
                      <span>数据权限</span>
                    </a-button>)
                    :
                    null
                  }
                </div>
              ]
            }
          }
        },
        { title: '操作', width: '110',
          visible: isInPermission('sys_role_edit') || isInPermission('sys_role_del'),
          slots: {
            default: ({row, rowIndex}) => {
              return [
                <div class="operations">
                  {isInPermission('sys_role_edit') ? <span class="iconfont iconxiezuo" onClick={() => this.handleAddEditRole('edit', row)}></span> : null}
                  {isInPermission('sys_role_del') ? <span class="iconfont iconshanchu" onClick={() => this.handleDelURole(row)}></span> : null}
                </div>
              ]
            }
          }
        },
      ],
      tableData: [],

      // modal相关数据
      isShowModal: false,
      modalTitle: '',
      cancelText: '取消',
      okText: '',
      form: {
        roleId: '',
        roleName: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    isInPermission,
    // 切换条目数量
    handleChangePageSize(pageSize, pageNum) {
      this.pageSize = pageSize;
      if(pageNum) this.curPageNum = pageNum;
      this.handleGetRoleList();
    },
    // 切换当前页码
    handleChangePage(pageNum){
      this.curPageNum = pageNum;
      this.handleGetRoleList();
    },
    // 获取角色分组列表
    async handleGetRoleList(){
      try {
        let {code, data} = await this.$api.org.getRoleList(this.curPageNum, this.pageSize);
        if(code === 0){
          let {total, records} = data;
          this.total = total;
          this.tableData = records;
        }
      }catch(error){
        console.log(error)
      }

    },
    // 维护 type: 组员管理 role, 操作权限 operation, 数据权限 data
    handlePermission(type, role) {
      console.log(type, role);
      if(type==='role'){
        this.$router.push({
          path: '/org/member',
          query: { roleName: role.roleName, roleId: role.roleId }
        })
      }else if(type === 'operation'){
        this.$router.push({
          path: '/org/operat',
          query: { roleName: role.roleName, roleId: role.roleId }
        })
      }
    },
    // 新增、编辑角色
    handleAddEditRole(type, role) {

      if(type === 'add'){
        this.modalTitle = '添加权限分组';
        this.okText = '创建并继续配置';
        this.$set(this, 'form', {roleId: '', roleName: ''})
      } else {
        this.modalTitle = '编辑分组名称';
        this.okText = '保存';
        this.$set(this, 'form', {roleId: role.roleId, roleName: role.roleName})
      }
      this.isShowModal = true;
    },
    // 保存新增、编辑
    handleSubmit(){
      this.$refs.roleForm.validate(async (valid) => {
        if (valid) {
          let {code} = await this.$api.org.handlePostPutRoleInfo(this.form.roleName, this.form.roleId);
          if(code === 0){
            this.handleGetRoleList();
            this.handleCancel();
            this.$message.success('保存成功！');
          }
        } else {
          return false;
        }
      });
    },
    // 取消新增、编辑角色
    handleCancel(){
      this.isShowModal = false;
    },
    // 删除角色
    handleDelURole(role) {
      this.$confirms({
        title: '提示',
        message: `您确定要删除 ${role.roleName} 吗？`,
        okText: '确认删除',
        onOk: async () =>{
          try {
            let {code} = await this.$api.org.handleDelRole(role.roleId);
            if(code === 0){
              this.$message.success('删除成功！');
              this.handleGetRoleList();
            }else{
              this.$message.error('删除失败！');
            }
          }catch(error){
            console.log(error)
          }
        },
        cancelText: '取消',
        onCancel() {
        }
      });
    }
  },
  mounted (){
    this.handleGetRoleList();
  }
}
</script>
<style lang="scss" scoped>
.role-container {
  margin: 16px 24px 24px 24px;
  .role-content {
    overflow: hidden;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    .role-table {
      overflow: auto;
      &.no-pagination {
        height: 100%;
      }
      &.has-pagination {
        height: calc(100% - 63px);
      }
      /deep/ .vxe-grid{
        height: 100%;
      }
      .permission {
        > button{
          padding: 0 8px;
          border-radius: 4px;
          span {
            &:nth-child(1) {
              margin-right: 4px;
            }
          }
          &:nth-child(n+2){
            margin-left: 12px;
          }
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
    /deep/ .pagination {
      height: 60px;
    }
  }
}
</style>
