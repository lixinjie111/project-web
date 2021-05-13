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
          <Tree v-if="treeList.length" :treeData="treeList" @onSelectTreeNodes="handleGetDepartUsers"></Tree>
          <div v-else class="empty">暂无部门</div>
        </div>
        <div class="btn" @click="handleGotoPage">管理部门结构</div>
      </div>
      <div class="userorg-right">
        <BasicTable :tableData="tableData" :setTableColumns="setTableColumns"></BasicTable>
      </div>
      <Modal :isShow="isShowModal" :title="modal.modalTitle" :okText="modal.okText" :cancelText="modal.cancelText" headeralgin="center" @modal-sure="handleSubmit">
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
      </Modal>
    </div>
  </div>
</template>
<script>
import Tree from '@/components/Tree.vue';
import ContentHeader from '@/components/ContentHeader.vue'
import BasicTable from '@/components/BasicTable.vue'
import Modal from '@/components/Modal.vue'
export default {
  name: 'userorg',
  components: {Tree, ContentHeader, BasicTable, Modal},
  data() {
    return {
      total: 50, // 总数据条数
      pageSize: 10, // 页面数据size
      curPageNum: 1, // 当前页码

      treeList: [
        {
          "key":"992307132",
          "value": "万科集团",
          "title":"万科集团",
          "scopedSlots":{
              "title":"custom"
          },
        },
        {
            "key":"99230713",
            "value": "万科集团",
            "title":"万科集团",
            // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
            "scopedSlots":{
                "title":"custom"
            },
            "children":[
                {
                    "key":"99230992",
                    "value": "华东区域",
                    "title":"华东区域",
                    "scopedSlots":{
                        "title":"custom"
                    },
                    "children":[
                        {
                            "key":"99230112",
                            "value":"杭州万科",
                            "title":"杭州万科",
                            "scopedSlots":{
                                "title":"custom"
                            },
                            "children":[],
                        }
                    ],
                },
                {
                    "key":"99230993",
                    "value":"华南区域",
                    "title":"华南区域",
                    "scopedSlots":{
                        "title":"custom"
                    },
                    "children":[],
                },
                {
                    "key":"99231020",
                    "value":"华北区域",
                    "title":"华北区域",
                    "scopedSlots":{
                      "title":"custom"
                    },
                    "children":[],
                }
            ],
        },
        {
          "key":"9923071314",
          "value":"万科集团",
          "title":"万科集团",
        }
      ],

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
      
      isShowModal: false, // 编辑 新增modal
      modal: {
        modalTitle: '新增用户', // modal title
        cancelText: '取消', 
        okText: '保存'
      },

      radioStyle: {
        display: 'inline-block',
        height: '30px',
        lineHeight: '30px',
      }, 
      // form数据
      form: {
        username: '',
        name: '',
        depart: '',
        password: '',
        tel: '',
        position: '',
        role: [],
        sex: 1
      },
       rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '用户名长度3 到 5', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '真实姓名长度3 到 5', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    // 路由跳转
    handleGotoPage() {
      this.$router.push('/org/depart')
    },

    // tree选择部门 查询部门下人员
    handleGetDepartUsers(departIds){
      console.log(departIds)
    },

    // 切换冻结状态
    changeSwitch(row){
      console.log(row)
    },

    // 新增、编辑用户条目
    handleAddEditUser(type, row) {
      let reset = type == 'add' ? 
        {username: '', name: '', depart: '', password: '', tel: '', position: '', role: [], sex: 1} 
        : {id: row.id, username: row.name, name: row.name, depart: '', password: '', tel: '', position: '', role: [], sex: row.sex};
      this.$set(this, 'form', reset);

      this.isShowModal = true;
    },

    // 校验新增 编辑用户信息
    handleSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          alert('submit!');
          // 接口提交成功 isShow
        } else {
          return false;
        }
      });
    },

    // 删除用户条目
    handleDelUser(row) {
      console.log('row', row)
    },
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
    flex: 1;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    .operations {

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
}
  
</style>