<template>
  <div class="operation-container">
    <ContentHeader type="breadcrumb" :breadcrumbList="breadcrumbList">
      <a-button slot="operation" type="primary" @click="handleSave">保存</a-button>
    </ContentHeader>
    <div class="operation-content">
      <a-checkbox-group v-model="checkedList">
        <!-- 一级树全展示 竖形列表 -->
        <div class="level-1" v-for="(item, index1) in treeList" :key="item.id">
          <div class="checkbox-item">
            <span :class="['expand', 'iconfont', item.isExpand ? 'iconxia1' : 'iconyou1']" v-show="item.children.length" @click="handleExpand(index1)"></span>
            <a-checkbox :value="item.id" @change="handleCheckbox(item, false)">{{item.name}}</a-checkbox>
          </div>
          <!-- 二级树全展示 一行展示 不存在单选 -->
          <div class="level-2" v-show="item.isExpand">
            <div class="level-2-parent">
              <div class="checkbox-item" v-for="(level2, index2) in item.children" :key="level2.id">
                <span :class="['expand', 'iconfont', level2.isExpand ? 'iconxia1' : 'iconyou1']" v-show="level2.children.length" @click="handleExpand(index1, index2)"></span>
                <a-checkbox :value="level2.id" @change="handleCheckbox(level2, item)">{{level2.name}}</a-checkbox>
              </div>
            </div>
            <template v-for="(level2, index2) in item.children" >
              <!-- 下拉展开显示 三级菜单 -->
              <div class="level-3" v-show="level2.children && level2.isExpand"  :key="`level-3${level2.id}`">
                <div class="level-3-parent">
                  <div class="checkbox-item" v-for="(level3, index3) in level2.children" :key="level3.id">
                    <span :class="['expand', 'iconfont', level3.isExpand ? 'iconxia1' : 'iconyou1']" v-show="level3.children.length" @click="handleExpand(index1, index2, index3)"></span>
                    <a-checkbox :value="level3.id" @change="handleCheckbox(level3, item)">{{level3.name}}</a-checkbox>
                  </div>
                </div>
                <template v-for="(level3) in level2.children">
                  <!-- 下拉展开显示 四级菜单 -->
                  <div class="level-4" v-show="level3.children && level3.isExpand" :key="`level-4${level3.id}`">
                    <div class="checkbox-item" v-for="(level4) in level3.children" :key="level4.id">
                      <span class="expand iconfont iconyou1" v-show="level4.children.length"></span>
                      <a-checkbox :value="level4.id" @change="handleCheckbox(level4, item)">{{level4.name}}</a-checkbox>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </a-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'operation',
  components: {},
  data() {
    return {
      roleId: '', // 角色id
      breadcrumbList: [
        {name: '角色分组', icon: 'iconjiantouzuo', iconposition: 'before', path: '/org/role'},
        {name: '项目经理', icon: 'iconsuoding', iconposition: 'after'},
      ],
      treeList:  [],
      checkedList: []
    }
  },
  created(){
    let {roleId, roleName} = this.$route.query;
    this.breadcrumbList[1].name = roleName;
    this.roleId = roleId;
  },
  methods: {
    // 关联父级选中 取消
    handleCheckbox(node, parent) {
      console.log(this.checkedList)
      let methods = this.checkedList.includes(node.id) ? 'del' : 'add';
      node?.children?.length && this.handleSubCheckList(node.children, methods);
      setTimeout(() => {
        if(parent){
          let checkList = this.handleParentCheckboxList(parent);
          this.$set(this, 'checkedList', [...new Set(checkList)]);
        }
      }, 0)
    },
    // 修改父节点选中状态
    handleParentCheckboxList(rootNode) {
      let nodeList = [], parentList = [], parentCheckedList = [];
      const depthEach=function(item){
        if(item.children){
          for(let k in item.children){
            depthEach(item.children[k]);
            nodeList.push(item.children[k]);
            parentList.push(item.children[k].parentId);
          }
        }
      }
      depthEach(rootNode);
      nodeList.map(item => (this.checkedList.includes(item.id) || parentCheckedList.includes(item.id)) && parentCheckedList.push(item.parentId));
      parentList = [...new Set(parentList)]; // 全部parentId
      parentCheckedList = [...new Set(parentCheckedList)]; // 选中parentId
      parentCheckedList = parentCheckedList?.length>1 ? parentCheckedList : [];
      const diff = function(arr1, arr2) {
        return arr1.filter((i) => arr2.indexOf(i) < 0)
      }
      let diffList = diff(parentList, parentCheckedList);
      let checkList = diff([...this.checkedList, ...parentCheckedList], diffList)
      return checkList;
    },
    // 修改子节点
    handleSubCheckList(nodeList, methods){
      if(methods === 'add'){
        nodeList?.map(item => {
          this.checkedList.push(item.id);
          item?.children?.length && this.handleSubCheckList(item.children, methods);  
        })
      }else if(methods === 'del'){
        nodeList?.map(item => {
          let index = this.checkedList.findIndex(ele => ele === item.id);
          this.checkedList.includes(item.id) && this.checkedList.splice(index, 1);
          item?.children?.length && this.handleSubCheckList(item.children, methods)
        });
      }
    },
    // 预处理树形结构
    handlePreData(data){
      Array.isArray(data) && data.map(item=>{
        item.isExpand = false; // 树形是否展开
        if(item.children){
          this.handlePreData(item.children);
        }
      });
      return data;
    },
    // 点击展开
    handleExpand(level1, level2, level3){
      if(arguments.length === 1){
        this.treeList.splice(level1, 1, {...this.treeList[level1], ...{isExpand: !this.treeList[level1].isExpand}});
      }else if(arguments.length === 2) {
        let data = this.treeList[level1].children;
        let bool = !data[level2].isExpand;
        this.handlePreData(data);
        data.splice(level2, 1, {...data[level2], ...{isExpand: bool}});
      }else if(arguments.length === 3) {
        let data = this.treeList[level1].children[level2].children;
        console.log(data)
        let bool = !data[level3].isExpand;
        this.handlePreData(data);
        data.splice(level3, 1, {...data[level3], ...{isExpand: bool}});
      }
      
    },
    // 请求菜单及页面操作handleGetMenuTree列表
    async handleGetMenuList() {
      try{
        let {code, data, msg} = await this.$api.org.handleGetMenuTree();
        if(code === 0){
          this.handlePreData(data)
          this.treeList = data;
        }
      }catch(err){
        console.log(err)
      }
    },
    // 请求用户已勾选
    async handleGetRoleMenuTree(){
      try {
        let {code, data} = await this.$api.org.handleGetRoleMenuTree(this.roleId);
        if(code === 0){
          this.checkedList = data ? data : [];
        }
      }catch(err) {
        console.log(err)
      }
    },
    // 保存
    async handleSave(){
      console.log(this.checkedList)
      debugger
      try {
        let {code} = await this.$api.org.handlePutRoleMenu(this.roleId, this.checkedList?.join(','));
        if(code === 0){
          this.$message.success('保存成功！');
        }
      }catch(error){
        console.log(error);
      }
    }
  },
  mounted() {
    // 查询菜单列表
    this.handleGetMenuList()
    // 查询角色已配置菜单
    this.handleGetRoleMenuTree();
  }
}
</script>
<style lang="scss" scoped>
.operation-container {
  margin: 16px 24px 24px 24px;
  .operation-content {
    overflow: auto;
    padding: 0 20px;
    width: 100%;
    height: calc(100vh - 163px);
    background: #fff;
    border-radius: 4px;
    border: 1px solid #EAEDF7;
    /deep/ .ant-checkbox-group {
      width: 100%;
      .ant-checkbox-wrapper {
        line-height: 54px;
      }
    }
    .level-1 {
      width: 100%;
      border-bottom: 1px solid #EAEDF7;
      .level-2 {
        margin-left: 20px;
        border-top: 1px solid #EAEDF7;
        .level-2-parent {
          display: flex;
          overflow-x: auto;
          // .checkbox-item {
          //   width: 224px;
          //   &:nth-child(n+2){
          //     margin-left: 20px;
          //   }
          // }
        }
        .level-3 {
          margin-left: 20px;
          border-top: 1px solid #EAEDF7;
          .level-3-parent {
            display: flex;
            overflow-x: auto;
          }
          .level-4 {
            display: flex;
            flex-wrap: wrap;
            border-top: 1px solid #EAEDF7;
            overflow-x: auto;
            // .checkbox-item:first-child {
            //   width: 224px;
            //   margin-left: 20px;
            // }
          }
        }
      }
    }
    .checkbox-item {
      width: 244px;
      height: 54px;
      flex-shrink: 0;
      .expand {
        display: inline-block;
        margin: 18px 0 16px 0;
        width: 20px;
        height: 20px;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>