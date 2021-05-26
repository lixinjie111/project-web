<template>
  <div class="member-container">
    <ContentHeader type="breadcrumb" :breadcrumbList="breadcrumbList">
      <a-button slot="operation" type="primary" @click="handleSave">保存</a-button>
    </ContentHeader>
    <div class="member-content">
      <div class="member-left">
        <div class="member-tree">
          <Tree v-if="treeList.length" :treeData="treeList" :replaceFields="replaceFields" @onSelectTreeNodes="handleGetDepartUsers"></Tree>
          <div v-else class="empty">暂无部门</div>
        </div>
        <div class="btn" @click="handleGotoPage">管理部门结构</div>
      </div>
      <div class="member-right">
        <div class="member-join">
          <div class="check-title">
            <a-checkbox :indeterminate="indeterminateJoin" :checked="checkAllJoin" @change="onCheckAllChange(e, 'Join')">已加入</a-checkbox>
          </div>
          <a-checkbox-group v-model="checkJoinList" @change="(e) => onChange(e, 'Join')">
            <div class="checkbox-item" v-for="(item) in joinUsers" :key="item.userId">
              <a-checkbox :value="item.userId">{{item.realName}}</a-checkbox>
            </div>
          </a-checkbox-group>
          <div class="line"></div>
        </div>
        <div class="member-unjoin">
          <div class="check-title">
            <a-checkbox :indeterminate="indeterminateUnJoin" :checked="checkAllUnJoin" @change="onCheckAllChange(e, 'UnJoin')">未加入</a-checkbox>
          </div>
          <a-checkbox-group v-model="checkUnJoinList" @change="(e) => onChange(e, 'UnJoin')">
            <div class="checkbox-item" v-for="(item) in unJoinUsers" :key="item.userId">
              <a-checkbox :value="item.userId">{{item.realName}}</a-checkbox>
            </div>
          </a-checkbox-group>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tree from '@/components/Tree.vue'

import * as api from '@/api/index'
export default {
  name: 'operation',
  components: {Tree},
  data() {
    return {
      roleId: '', // 角色id
      breadcrumbList: [
        {name: '组员管理', icon: 'iconjiantouzuo', iconposition: 'before', path: '/org/role'},
        {name: '项目经理', icon: 'iconsuoding', iconposition: 'after'},
      ],
      treeList: [
        {
            "id":"99230713",
            // "value": "万科集团",
            parent: '1',
            "name":"万科集团",
            // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
            "children":[
                {
                    "id":"99230992",
                    // "value": "华东区域",
                    "name":"华东区域",
                    "children":[
                        {
                            "id":"99230112",
                            "name":"杭州万科",
                            "children":[],
                        }
                    ],
                },
                {
                    "id":"99230993",
                    "name":"华南区域",
                    "children":[],
                },
                {
                    "id":"99231020",
                    "name":"华北区域",
                    "children":[],
                }
            ],
        },
        {
          "id":"9923071314",
          "name":"万科集团",
        }
      ],
      replaceFields: {
        key: 'id',
        value: 'name',
        title: 'name',
        children: 'children',
      },
      joinUsers: [
        {"joinFlag": 1, "realName": "admin1", "userId": 1, "username": "admin"},
        {"joinFlag": 1, "realName": "admin2", "userId": 2, "username": "admin"},
        {"joinFlag": 1, "realName": "admin3", "userId": 3, "username": "admin"},
        {"joinFlag": 1, "realName": "admin4", "userId": 4, "username": "admin"},
        {"joinFlag": 1, "realName": "admin1", "userId": 11, "username": "admin"},
        {"joinFlag": 1, "realName": "admin2", "userId": 22, "username": "admin"},
        {"joinFlag": 1, "realName": "汤姆", "userId": 33, "username": "admin"},
        {"joinFlag": 1, "realName": "才栋梁", "userId": 44, "username": "admin"},
      ],
      unJoinUsers: [
        {"joinFlag": 1, "realName": "admin1", "userId": 5, "username": "admin"},
        {"joinFlag": 1, "realName": "admin2", "userId": 6, "username": "admin"},
        {"joinFlag": 1, "realName": "admin3", "userId": 7, "username": "admin"},
        {"joinFlag": 1, "realName": "admin4", "userId": 8, "username": "admin"}
      ],
      indeterminateJoin: false, // 已加入 全选
      checkAllJoin: true,
      checkJoinList: [],
      allJoinUserIdList: [],

      indeterminateUnJoin: false, // 未加入 全选
      checkAllUnJoin: false,
      checkUnJoinList: [],
      allUnJoinUserIdList: [],
    }
  },
  created(){
    let {roleName, roleId} = this.$route.query;
    this.breadcrumbList[1].name = roleName;
    this.roleId = roleId;
    this.allJoinUserIdList = this.handleAllUserIds(this.joinUsers);
    this.checkJoinList = this.allJoinUserIdList;
    this.allUnJoinUserIdList = this.handleAllUserIds(this.unJoinUsers);
    console.log(this.checkJoinList)
  },
  methods: {
    // 路由跳转
    handleGotoPage() {
      this.$router.push('/org/depart')
    },
    // 选中部门信息
    handleGetDepartUsers(departIds){
      this.handleGetDeptRoleList(departIds[0])
    },
    // 请求部门树
    async handleGetDeptTree() {
      try{
        let {code, data, msg} = await this.$api.org.getDeptTree();
        if(code === 0) {
          this.treeList = data;
        }else{
          this.$message.error(msg)
        }
      }catch(err){
        console.log(err)
      }
    },
    // 请求部门 分组成员列表
    async handleGetDeptRoleList (deptId){
      try{
        let {code, data, msg} = await this.$api.org.handleGetDeptRoleList(this.roleId, deptId);
        if(code === 0){
          this.joinUsers = data.joinUsers;
          this.unJoinUsers = data.unJoinUsers;
          this.allJoinUserIdList = this.handleAllUserIds(this.joinUsers);
          this.checkJoinList = this.allJoinUserIdList;
          this.allUnJoinUserIdList = this.handleAllUserIds(this.unJoinUsers);
        }else{
          this.$message.error(msg)
        }
      }catch(err){
        console.log(err)
      }
    },
    // 遍历所有分组用户id
    handleAllUserIds(data){
      let ids = [];
      data.map(item=>ids.push(item.userId));
      return ids;
    },
    onChange(checkedList, type) {
      this[`indeterminate${type}`] = !!checkedList.length && checkedList.length < this[`all${type}UserIdList`].length;
      this[`checkAll${type}`] = checkedList.length === this[`all${type}UserIdList`].length;
    },
    onCheckAllChange(e, type) {
      Object.assign(this, {
        [`check${type}List`]: e.target.checked ? this[`all${type}UserIdList`] : [],
        [`indeterminate${type}`]: false,
        [`checkAll${type}`]: e.target.checked,
      });
    },
    // 保存
    async handleSave(){
      try {
        let diff = this.allJoinUserIdList.filter(item=>!this.checkJoinList.some(ele=>ele===item));
        let {code, data, msg} = await this.$api.org.handlePostModifyUserRole(this.roleId, this.checkUnJoinList, diff);
        if(code === 0 ){
          this.$message.success(msg);
        } else {
          this.$message.error(msg);
        }
      }catch(err) {
        console.log(err)
      }
      
    }
  }
}
</script>
<style lang="scss" scoped>
.member-container {
  margin: 16px 24px 24px 24px;
  .member-content {
    display: flex;
    // height: calc(100vh - 163px);

    .member-left{
      margin-right: 16px;
      padding: 24px 24px 32px 24px;
      width: 280px;
      height: calc(100vh - 163px);
      background: #fff;
      border-radius: 4px;
      border: 1px solid #EAEDF7;
      .member-tree {
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
    .member-right {
      flex: 1;
      height: calc(100vh - 163px);
      background: #fff;
      border-radius: 4px;
      .member-join{
        padding: 12px 0 8px 0;
        .line {
          margin: 0 24px;
          height: 1px;
          background: #EAEDF7;
        }
      }
      .check-title {
        padding-left: 24px;
        width: 120px;
        height: 46px;
        line-height: 46px;
        margin-right: 8px;
      }
      .checkbox-item {
        float: left;
        padding-left: 24px;
        width: 120px;
        height: 46px;
        line-height: 46px;
        &:last-child {
          margin-right: auto;
        }
      }
    }
  }
}
</style>