<template>
  <div class="depart-container">
    <ContentHeader type="title" title="部门结构"></ContentHeader>
    <div class="depart-content">
      <div class="depart-left">
        <Tree v-if="treeList.length" :treeData="treeList" :replaceFields="replaceFields" :operation="['del']" @onSelectTreeNodes="handleGetDepartUsers" @onDeleteTreeNode="handleDeleteDepart"></Tree>
        <div v-else class="empty">添加部门</div>
      </div>
      <div class="depart-right">
        <div class="header">
          <div class="title">创建部门</div>
          <Breadcrumb :breadcrumbList="arrPath"></Breadcrumb>
        </div>
        <div class="content">
          <div class="content-left"></div>
          <div class="content-right">
            <ul class="list">
              <li class="list-item" v-for="(item, index) in list" :key="index">
                <a-input v-model="item.name"></a-input>
                <span class="plus iconfont icontianjia" @click="handleAddDepart(index+1, item.parentId)"></span>
              </li>
            </ul>
            <div class="operation">
              <a-button type="primary" @click="handleSaveDepart">保存</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Tree from '@/components/Tree.vue';
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'departorg',
  components: {Tree, Breadcrumb},
  data() {
    return {
      treeList: [],
      replaceFields: {
        key: 'id',
        value: 'name',
        title: 'name',
        children: 'children'
      },
      count: 0,
      arrPath: [], // 面包屑
      list: [], // 子部门列表
      emptyList: [
        {name: ''}, {name: ''}, {name: ''}, {name: ''}, {name: ''}, 
        {name: ''},{name: ''}, {name: ''}, {name: ''}, {name: ''}
      ]
    }
  },
  methods: {
    // 查询部门树
    async handleGetDepartTree(){
      try {
        let {code, data} = await this.$api.org.getDeptTree();
        if(code === 0){
          this.treeList = data;
          this.handleSelectSubDepart(this.treeList);
        }
      }catch(error){
        console.log(error);
      }
    },

    // tree选择部门 查询部门下子部门
    handleGetDepartUsers(departIds){
      this.count = 0;
      this.$set(this, 'arrPath', []);
      for(let i = 0; i < this.treeList.length; i++) {
        this.$set(this, 'arrPath', []);
        if(departIds.length>0) {
          let flag=this.deepFinds(this.treeList[i], departIds[0]);
          if(!flag)
            this.arrPath.pop()
          else
            break;
        } else {
          this.handleSelectSubDepart(this.treeList)
        }
      }
    },
    // 选中部门下子部门
    handleSelectSubDepart(nodeList){
      let departList = [...JSON.parse(JSON.stringify(nodeList)), ...Array.from({length: 10 - nodeList.length}).map(() => ({name: ''}))];
      let list = nodeList && nodeList.length ? departList : this.emptyList;
      list.map(item => {
        item.deptId = item.id;
        delete item?.children
      });
      this.$set(this, 'list', list);
    },
    // 递归遍历面包屑
    deepFinds(node, target) {
      this.arrPath.push({name: node.name, key: node.key, parentId: node.parentId});
      if(node.key === target) {
        this.count ++;
        this.handleSelectSubDepart(node.children); 
        return this.count > 0;
      }
      if(node.children) {
        for (let i=0;i<node.children.length;i++) {
          let flag=this.deepFinds(node.children[i],target)
          if(!flag)
            this.arrPath.pop()
          else
            break;
        }
      }
      return this.count > 0
    },
    // 新增部门
    handleAddDepart(index){
      this.list.splice(index, 0, {name: ''});
    },
    // 删除部门
    handleDeleteDepart(depart){
      console.log(depart)
       this.$confirms({
        title: '提示',
        message: `您确定要删除 ${depart.name} 分组吗？`,
        okText: '确认删除',
        onOk: async () => {
          try {
            let {code} = await this.$api.org.handleDeleteAdminDept(depart.id);
            if(code === 0) {
              this.handleGetDepartTree();
              this.$message.success('删除成功！');
            }
          }catch(error){
            console.log(error)
          }
        },
        cancelText: '取消',
        onCancel() {
        }
      });
    },
    // 保存
    async handleSaveDepart(){
      try {
        let data = this.list.filter(item => {
          if(item.name) {
            return {
              parentId: item.parentId,
              deptId: item.id,
              name: item.name
            }
          }
        });
        console.log(data)
        let {code} = await this.$api.org.handlePostAdminDept(data);
        if(code === 0) {
          this.$message.success('保存成功！');
          this.handleGetDepartTree();
        }
      }catch(error){
        console.log(error)
      }
    }
  },
  mounted() {
    this.handleGetDepartTree();
  }
}
</script>
<style lang="scss" scoped>
.depart-container{
  margin: 16px 24px 24px 24px;
  
  .depart-content {
    display: flex;
  }

  .depart-left{
    margin-right: 16px;
    padding: 24px 24px 32px 24px;
    width: 280px;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    .empty {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #C6CBDE;
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
  .depart-right {
    overflow: hidden;
    flex: 1;
    .header {
      display: flex;
      padding: 14px 24px;
      height: 56px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #242F57;
      line-height: 28px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #C6CBDE;
      .title {
        margin-right: 24px;
      }
    }
    .content {
      display: flex;
      height: calc(100vh - 219px);
      .content-left {
        margin-left: 12px;
        width: 12px;
        height: calc(50vh - 110px);
        border-left: 1px solid #C6CBDE;
        border-bottom: 1px solid #C6CBDE;
        border-radius: 0 0 0 4px;
      }
      .content-right {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-top: 16px;
        background: #FFF;
        .list {
          flex: 1;
          padding: 24px;
          overflow: auto;
          .list-item {
            margin-bottom: 16px;
            /deep/ .ant-input {
              width: 400px;
              height: 40px;
              padding: 8px 11px;
              vertical-align: top;
            }
            > .plus {
              margin: 13px 13px 13px 16px;
              display: inline-block;
              width: 14px;
              height: 14px;
              line-height: 14px;
              vertical-align: middle;
              color: #2373FF;
              text-align: center;
              cursor: pointer;
            }
          }
        }
        .operation {
          padding: 16px 24px;
          text-align: end;
          border-top: 1px solid #EAEDF7;
        }
      }
    }
  }
}
</style>