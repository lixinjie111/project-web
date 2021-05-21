<template>
  <div class="role-container">
    <ContentHeader type="title" title="角色分组">
      <div slot="operation">
        <a-button type="primary" @click="handleAddEditRole('add')">
          <span class="iconfont iconjia"></span>
          添加角色分组
        </a-button>
      </div>
    </ContentHeader>
    <div class="role-content">
      <div class="role-table">
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
import Modal from '@/components/Modal.vue'

import * as api from '@/api/index'
export default {
  name: 'roleorg',
  components: {BasicTable, Modal},
  data() {
    return {
      total: 50, // 总数据条数
      pageSize: 10, // 页面数据size
      curPageNum: 1, // 当前页码

      // 配置表格各字段
      setTableColumns: [
        {title: '编号', type: 'seq', width: 50},
        {title: '分组名称', field: 'roleName', showOverflow: true,},
        {title: '维护', width: '340', 
          slots: {
            // 使用 JSX 渲染
            default: ({ row }) => {
              return [
                <div class="permission">
                  <a-button onClick={() => this.handlePermission('role', row)}>
                    <span class="iconfont iconrenyuan"></span>
                    <span>组员管理</span>
                  </a-button>
                  <a-button onClick={() => this.handlePermission('operation', row)}>
                    <span class="iconfont iconsuoding"></span>
                    <span>操作权限</span>
                  </a-button>
                  <a-button onClick={() => this.handlePermission('data', row)}>
                    <span class="iconfont iconshujuku"></span>
                    <span>数据权限</span>
                  </a-button>
                </div>
              ]
            }
          }
        },
        { title: '操作', width: '110',
          slots: {
            default: ({row, rowIndex}) => {
              return [
                <div class="operations">
                  <span class="iconfont iconxiezuo" onClick={() => this.handleAddEditRole('edit', row)}></span>
                  <span class="iconfont iconshanchu" onClick={() => this.handleDelURole(row)}></span>
                </div>
              ]
            }
          }
        },
      ],
      tableData: [
        { "roleId": 1, "roleName": "管理员1"},
        { "roleId": 2, "roleName": "管理员2"},
        { "roleId": 3, "roleName": "管理员3"},
        { "roleId": 4, "roleName": "管理员4"},
        { "roleId": 5, "roleName": "管理员5"},
      ],
      
      // modal相关数据
      isShowModal: false,
      modalTitle: '',
      cancelText: '取消',
      okText: '',
      form: {
        roleId: '',
        roleName: ''
      },
      rules: {}
    }
  },
  methods: {
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
      let {code, data, msg} = await api.org.getRoleList(this.curPageNum, this.pageSize);
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
        this.$set(this, 'form', role)
      }
      this.isShowModal = true;
    },
    // 保存新增、编辑
    handleSubmit(){
      this.$refs.roleForm.validate(async (valid) => {
        if (valid) {
          let {code, data, msg} = api.org.handlePostPutRoleInfo(form.roleName, form.roleId);
          if(code === 0){
            this.handleCancel();
            this.$message.success(msg);
          } else{
            this.$message.error(msg);
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
        onOk(){
          api.org.handleDelRole(role.roleId).then((code, data, msg) => {
            if(code === 0){
              this.$message.success('删除成功！');
              this.getRoleList();
            }else{
              this.$message.error('删除失败！');
            }
          })
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    .role-table {
      flex: 1;
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
  }
}
</style>