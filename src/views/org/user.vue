<template>
  <div class="userorg-container">
    <ContentHeader type="title" title="用户管理">
      <div slot="operation">
        <a-button type="primary" @click="handleAddUserITem">添加用户</a-button>
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
        <div slot="content">haha</div>
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
        // {
        //   "key":"992307132",
        //   "title":"万科集团",
        //   "scopedSlots":{
        //       "title":"custom"
        //   },
        // },
        // {
        //     "key":"99230713",
        //     "title":"万科集团",
        //     // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
        //     "scopedSlots":{
        //         "title":"custom"
        //     },
        //     "children":[
        //         {
        //             "key":"99230992",
        //             "title":"华东区域",
        //             "scopedSlots":{
        //                 "title":"custom"
        //             },
        //             "children":[
        //                 {
        //                     "key":"99230112",
        //                     "title":"杭州万科",
        //                     "scopedSlots":{
        //                         "title":"custom"
        //                     },
        //                     "children":[],
        //                 }
        //             ],
        //         },
        //         {
        //             "key":"99230993",
        //             "title":"华南区域",
        //             "scopedSlots":{
        //                 "title":"custom"
        //             },
        //             "children":[],
        //         },
        //         {
        //             "key":"99231020",
        //             "title":"华北区域",
        //             "scopedSlots":{
        //               "title":"custom"
        //             },
        //             "children":[],
        //         }
        //     ],
        // },
        // {
        //   "key":"992307131",
        //   "title":"万科集团",
        // }
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
                  <span onClick={() => this.handleEditUserItem(row)}>编辑</span>
                  <span onClick={() => this.handleDelUserItem(row)}>删除</span>
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
      
      isShowModal: true, // 编辑 新增modal
      modal: {
        modalTitle: '新增用户', // modal title
        cancelText: '取消', 
        okText: '保存'
      }
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

    // 新增用户条目
    handleAddUserItem() {

    },

    // 编辑用户条目
    handleEditUserItem() {

    },

    // 校验新增 编辑用户信息
    handleSubmit() {

    },

    // 删除用户条目
    handleDelUserItem(row) {
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
  
</style>