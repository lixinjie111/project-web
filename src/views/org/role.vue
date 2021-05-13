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
      <Pagination :total="total" :curPageNum="curPageNum" :pageSize="pageSize"></Pagination>
      <!-- <Modal :isShow="isShowModal" :title="modal.modalTitle" :okText="modal.okText" :cancelText="modal.cancelText" headeralgin="center" @modal-sure="handleSubmit">
        <a-form-model slot="content" ref="userForm"  class="user-form" layout="vertical" :model="form" :rules="rules">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item label="用户名" prop="username">
                <a-input v-model="form.username" placeholder="用户名" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="真实姓名" prop="name">
                <a-input v-model="form.name" placeholder="真实姓名" />
              </a-form-model-item>
            </a-col>
          </a-row>
          
          <a-form-model-item label="部门" prop="depart">
            <a-tree-select
              v-model="form.depart"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeList"></a-tree-select>
          </a-form-model-item>

          <a-form-model-item prop="role">
            <template slot="label">
              <span>角色分组</span>
              <span class="second-title">(分组决定用户的权限列表)</span>
            </template>
            <a-select mode="multiple" :default-value="form.role">
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                {{ (i + 9).toString(36) + i }}
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-model-item prop="password">
                <template slot="label">
                  <span>密码</span>
                  <span class="second-title">(6位以上，包含大小写字母和数字)</span>
                </template>
                <a-input-password v-model="form.password" placeholder="密码"></a-input-password>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="电话" prop="tel">
                <a-input v-model="form.tel" placeholder="电话" />
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
              <a-form-model-item label="性别" prop="sex">
                <a-radio-group v-model="form.sex">
                  <a-radio :style="radioStyle" value="Man">男</a-radio>
                  <a-radio :style="radioStyle" value="Women">女</a-radio>
                </a-radio-group>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </Modal> -->
      
    </div>
  </div>
</template>
<script>
import ContentHeader from '@/components/ContentHeader.vue'
import BasicTable from '@/components/BasicTable.vue'
import Modal from '@/components/Modal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  name: 'roleorg',
  components: {ContentHeader, BasicTable, Modal, Pagination},
  data() {
    return {
      total: 50, // 总数据条数
      pageSize: 10, // 页面数据size
      curPageNum: 1, // 当前页码

      // 配置表格各字段
      setTableColumns: [
        {type: 'checkbox', width: '60'},
        {title: '用户ID', field: 'name', showOverflow: true,},
        {title: '真实姓名', field: 'name', showOverflow: true,},
        {title: '用户姓名', field: 'name', showOverflow: true,},
        {title: '职位', field: 'role'},
        {title: '性别', field: 'sex'},
        {title: '电话', field: 'time', showOverflow: true,},
        {title: '最后登录', field: 'time', showOverflow: true,},
        {title: '访问次数', field: 'time', showOverflow: true,},
        {title: '冻结', field: 'flag', width: '70', 
          slots: {
            // 使用 JSX 渲染
            default: ({ row }) => {
              return [
                <a-switch size='small' v-model={row.flag} onClick={() => this.changeSwitch(row)}></a-switch>
              ]
            }
          }
        },
        { title: '操作', field: 'flag', 
          slots: {
            default: ({row, rowIndex}) => {
              return [
                <div class="operations">
                  <span onClick={() => this.handleAddEditUser('edit', row)}>编辑</span>
                  <span onClick={() => this.handleDelUser(row)}>删除</span>
                </div>
              ]
            }
          }
        },
      ],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '<span style="color:red">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', flag: true, time: 1600261774531, html1: '<span style="color:orange">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', flag: true, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃', flag: true, time: 1600261774531, html1: '<span style="color:blue">vxe-table从入门到废弃</span>', img1: '/vxe-table/static/other/img2.gif' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃', flag: false, time: 1600261774531, html1: '', img1: '/vxe-table/static/other/img1.gif' }
      ],
      
    }
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      this.pageSize = pageSize;
    }
  }
}
</script>
<style lang="scss" scoped>
.role-container {
  margin: 16px 24px 24px 24px;
  .role-content {
    overflow: hidden;
    flex: 1;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
  }
}
</style>