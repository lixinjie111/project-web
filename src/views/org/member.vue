<template>
  <div class="member-container">
    <ContentHeader type="breadcrumb" :breadcrumbList="breadcrumbList">
      <a-button slot="operation" type="primary" @click="handleSave">保存</a-button>
    </ContentHeader>
    <div class="member-content">
      <div class="member-left">
        <div class="member-tree">
          <Tree v-if="treeList.length" :treeData="treeList" :replaceFields="replaceFields" :defaultSelectedKeys="defaultSelectedKeys" @onSelectTreeNodes="handleGetDepartUsers"></Tree>
          <div v-else class="empty">暂无部门</div>
        </div>
        <div class="btn" @click="handleGotoPage">管理部门结构</div>
      </div>
      <div class="member-right">
        <div class="member-join" v-if="joinUsers.length">
          <div class="check-title">
            <a-checkbox :indeterminate="indeterminateJoin" :checked="checkAllJoin" @change="(e) => onCheckAllChange(e, 'Join')">已加入</a-checkbox>
          </div>
          <a-checkbox-group v-model="checkJoinList" @change="(e) => onChange(e, 'Join')">
            <div class="checkbox-item" v-for="(item) in joinUsers" :key="item.userId">
              <a-checkbox :value="item.userId">{{item.realName}}</a-checkbox>
            </div>
          </a-checkbox-group>
          <div class="line"></div>
        </div>
        <div class="member-unjoin" v-if="unJoinUsers.length">
          <div class="check-title">
            <a-checkbox :indeterminate="indeterminateUnJoin" :checked="checkAllUnJoin" @change="(e) => onCheckAllChange(e, 'UnJoin')">未加入</a-checkbox>
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
import Tree from '@/components/tree/Tree.vue'
export default {
  name: 'operation',
  components: {Tree},
  data() {
    return {
      roleId: '', // 角色id
      breadcrumbList: [
        {name: '组员管理', icon: 'iconjiantouzuo', iconposition: 'before', path: '/org/role'},
        {name: '', icon: 'iconsuoding', iconposition: 'after'},
      ],
      treeList: [],
      replaceFields: {
        key: 'id',
        value: 'name',
        title: 'name',
        children: 'children',
      },
      defaultSelectedKeys: [], // 默认选中节点

      joinUsers: [],
      unJoinUsers: [],
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
  },
  methods: {
    // 路由跳转
    handleGotoPage() {
      this.$router.push('/org/depart')
    },
    // 选中部门信息
    handleGetDepartUsers(departIds){
      departIds.length && this.handleGetDeptRoleList(departIds[0])
    },
    // 请求部门树
    handleGetDeptTree() {
      try{
        this.$store.dispatch('initDeptTree').then(() => {
          this.$set(this, 'treeList', this.$store.state.deptTree);
          this.handleGetDeptRoleList(this.treeList?.[0].id);
          this.defaultSelectedKeys = [this.treeList?.[0].id]
        })
      }catch(err){
        console.log(err)
      }
    },
    // 请求部门 分组成员列表
    async handleGetDeptRoleList (deptId){
      try{
        let {code, data, msg} = await this.$api.org.handleGetDeptRoleList(this.roleId, deptId);
        if(code === 0){
          this.indeterminateJoin = false; // 已加入 全选
          this.checkAllJoin = true;
          this.joinUsers = data.joinUsers;
          this.indeterminateUnJoin = false; // 未加入 全选
          this.checkAllUnJoin = false;
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
        // console.log(diff, this.allJoinUserIdList, this.checkJoinList, this.allUnJoinUserIdList, this.checkUnJoinList)

        let {code} = await this.$api.org.handlePostModifyUserRole(this.roleId, this.checkUnJoinList, diff);
        if(code === 0 ){
          this.$message.success('保存成功！');
        } 
      }catch(err) {
        console.log(err)
      }
      
    }
  },
  mounted() {
    this.handleGetDeptTree();
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
        width: 140px;
        height: 46px;
        line-height: 46px;
        &:last-child {
          margin-right: auto;
        }
        /deep/ .ant-checkbox-wrapper {
          vertical-align: top;
          .ant-checkbox{
            display: inline-block;
            vertical-align: middle;
          }
          >span:nth-child(2) {
            display: inline-block;
            width: 100px;
            vertical-align: middle;
            font-size: 14px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>