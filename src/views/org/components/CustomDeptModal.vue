<template>
  <ModalNoFooter width="708" :isShow="true" :bodyStyle="{padding: 0}" title="自定义可见部门" @modal-cancel="$emit('modal-cancel')">
    <div class="modal-content" slot="content">
      <section class="left">
        <a-tree
          v-model="checkedKeys"
          :blockNode="true"
          checkable
          checkStrictly
          :selectable="false"
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="treeList"
          @expand="onExpand"
          @check="onCheck"
        />
      </section>
      <section class="right">
        <div class="right-content">
          <div class="has-data" v-if="selectList.length">
            <div class="title">已选择了 {{selectList.length}} 个部门</div>
            <ul class="list">
              <li class="item" v-for="(item, index) in selectList" :key="item.id">
                 <TextToolTip class="dept" :content="item.title" :refName="'related-select-item' + index"></TextToolTip>
                <span class="iconfont iconjianshao" @click="handleDel(item)"></span>
              </li>
            </ul>
          </div>
          <div class="no-data" v-else>请选择需要查看的部门</div>
        </div>
        <div class="footer">
          <a-button class="cancel" type="link" @click="$emit('modal-cancel')">取消</a-button>
          <a-button type="primary" @click="handleSave">保存</a-button>
        </div>
      </section>
    </div>
  </ModalNoFooter>
</template>
<script>
import ModalNoFooter from '@/components/Modal/ModalNoFooter.vue'
import TextToolTip from "@/components/tooltip/TextToolTip";
export default {
  name: 'CustomDeptModal',
  components: {ModalNoFooter, TextToolTip},
  data(){
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      treeList: [], // 部门树
      replaceFields: {
          key: 'id',
          value: 'id',
          title: 'name',
          children: 'children'
      },
      selectList: [],
      count: 0, // 深度遍历
      // arrPath: []
    }
  },
  watch: {
    'checkedKeys.checked': {
      handler(newVal,oldVal){
        let result = this.handleSelectNode(this.treeList, []);
        this.selectList = result || [];
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 查询部门树
    handleGetDepartTree(){
      try {
        this.$store.dispatch('initDeptTree', true).then(() => {
          this.$set(this, 'treeList', this.handleData(this.$store.state.deptTree));
        })
      }catch(error){
        console.log(error);
      }
    },
    handleData(data){
      let {key, title, value, children} = this.replaceFields;
      data.map((item, index) => {
        item['key'] = item[key];
        item['value'] = item[value ? value : key];
        item['title'] = item[title];
        if(item[children]) item['children'] = item[children];
        if(item['children']?.length){
          this.handleData(item['children'])
        }
      });
      return data;
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys, {checked, checkedNodes, node, event}) {
      // console.log(checkedKeys, checked, checkedNodes, node)
      node?.dataRef?.children.length && this.handleSubCheckList(node.dataRef.children, checked ? 'add' : 'del');
      setTimeout(()=> {
        let {parentId} = node?.dataRef;
        let checkedList = this.handleParentCheckList(parentId);
        while(this.checkedKeys.checked.length){
          this.checkedKeys.checked.pop();
        }
        this.checkedKeys.checked.push(...checkedList);
      }, 0);
      
      // let list = [];
      // checkedNodes.map(item => {
      //   let {id, isLock, name, parentId, title, value, children} = item.data.props.dataRef;
      //   list.push({id, isLock, name, parentId, title, value, children})
      // });
      // this.selectList = list || [];

      let index = this.expandedKeys.findIndex(item => item === node.dataRef.id);
      if(index !== -1){
        this.expandedKeys.splice(index, 1);
      }else {
        this.expandedKeys.push(node.dataRef.id)
      }
    },
    // 父节点全选中全取消->修改子节点
    handleSubCheckList(nodeList, methods){
      if(methods === 'add'){
        nodeList?.map(item => {
          !this.checkedKeys.checked.includes(item.id) && this.checkedKeys.checked.push(item.id);
          item?.children?.length && this.handleSubCheckList(item.children, methods);
        })
      }else if(methods === 'del'){
        nodeList?.map(item => {
          let index = this.checkedKeys.checked.findIndex(ele => ele === item.id);
          this.checkedKeys.checked.includes(item.id) && this.checkedKeys.checked.splice(index, 1);
          item?.children?.length && this.handleSubCheckList(item.children, methods)
        });
      }
    },
    // 子节点选中取消->修改父节点
    handleParentCheckList(parentId){
      let checked = this.checkedKeys?.checked || [];
      console.log(checked)
      let nodeList = [], parentList = [], parentCheckedList = [];
      const depthEach=(node, parentId, nodeList, parentList) => {
        nodeList.push(node);
        parentList.push(node.id);
        if(node.id === parentId) {
          this.count ++;
          return this.count > 0;
        }
        if(node.children) {
          for (let i=0;i<node.children.length;i++) {
            let flag=depthEach(node.children[i], parentId, nodeList, parentList)
            if(!flag){
              nodeList?.pop()
              parentList?.pop()
            }else
              break;
          }
        }
        return this.count > 0
      }
      for(let i = 0; i< this.treeList.length; i++){
        let bool = depthEach(this.treeList[i], parentId, nodeList, parentList);
        if(!bool){
          nodeList?.pop()
          parentList?.pop()
        }else{
          this.count = 0;
          break;
        }
      };
      // 数组拉平
      let dethNode = (nodelist, arrPath) => {
        arrPath.push(nodelist);
        nodelist?.children.map(item=>dethNode(item, arrPath));
        return arrPath;
      }
      let flatNodeList = nodeList?.[0] && dethNode(nodeList[0], []) || [];
      let rootNode = flatNodeList.length > 1 ? flatNodeList[0].parentId : null;
      flatNodeList.map(item => {
        if((checked.includes(item.id) || parentCheckedList.includes(item.parentId)) && item.parentId !== rootNode) {
          parentCheckedList.push(item.parentId)
        }
      });
      parentList = [...new Set(parentList)]; // 全部parentId
      parentCheckedList = [...new Set(parentCheckedList)]; // 选中parentId
      // console.log(parentList, parentCheckedList)
      parentCheckedList = parentCheckedList?.length>=1 ? parentCheckedList : [];
      const diff = function(arr1, arr2) {
        return arr1.filter((i) => arr2.indexOf(i) < 0);
      }
      let diffList = diff(parentList, parentCheckedList); // 待移除父节点
      let checkList = parentCheckedList.length ? diff([...new Set([...checked, ...parentCheckedList])], diffList) : diff(checked, diffList);
      console.log('parent', parentList, parentCheckedList, diffList, checked ,checkList)
      return checkList;
    },
    handleDel(item) {
      let {id, parentId} = item;
      
      let index = this.checkedKeys?.checked.findIndex(ele => ele === id);
      index!==-1 && this.checkedKeys?.checked.splice(index, 1);
      
      this.handleDelParent(parentId);
      this.handleDelChild(item.children);
      

      
      
      // let select = []
      // this.checkedKeys?.checked.map(ele => {
      //   let selectIndex = this.selectList.findIndex(item => item.id === ele);
      //   selectIndex !== -1 && select.push(this.selectList[selectIndex]);
      // });
      // this.selectList = select;
    },
    // 删除父节点
    handleDelParent(parentId) {
      // this.count = 0;
      // let arrPath = [];
      // for(let i = 0; i < this.treeList.length; i++) {
      //   arrPath = [];
      //   if(parentId) {
      //     let flag=this.deepFinds(this.treeList[i], parentId, arrPath);
      //     if(!flag)
      //       arrPath?.pop()
      //     else
      //       break;
      //   }
      // }
      // arrPath?.map(ele => {
      //   let index = this.checkedKeys.checked.findIndex(id => ele === id);
      //   index !== -1 && this.checkedKeys.checked.splice(index, 1); 
      // });
      let checkedList = this.handleParentCheckList(parentId);
      while(this.checkedKeys.checked.length){
        this.checkedKeys.checked.pop();
      }
      this.checkedKeys.checked.push(...checkedList);
    },
    // 递归遍历
    deepFinds(node, target, arrPath) {
      arrPath.push(node.id);
      if(node.id === target) {
        this.count ++;
        return this.count > 0;
      }
      if(node.children) {
        for (let i=0;i<node.children.length;i++) {
          let flag=this.deepFinds(node.children[i],target, arrPath)
          if(!flag)
            arrPath?.pop()
          else{
            // this.count = 0;
            break;
          }
        }
      }
      return this.count > 0
    },
    // 删除子节点
    handleDelChild(list){
      list?.map(ele => {
        let {id, children} = ele;
        let index = this.checkedKeys.checked.findIndex(ele => ele === id);
        index!==-1 && this.checkedKeys.checked.splice(index, 1);
        children?.length && this.handleDelChild(children);
      })
    },
    // 右侧显示节点
    handleSelectNode(list, result){
      list.map(item => {
        let {id, isLock, name, parentId, title, value, children} = item;
        let {checked} = this.checkedKeys;
        if(checked?.length && checked.includes(id)){
          result.push({id, isLock, name, parentId, title, value, children});
        }
        
        if(item?.children.length) {
          this.handleSelectNode(item.children, result)
        }
      });
      return result;
    },
    handleSave(){

    }
  },
  mounted(){
    this.handleGetDepartTree();
  }
}
</script>
<style lang="scss" scoped>
.modal-content {
  display: flex;
  height: 584px;
  .left {
    padding: 0 24px;
    width: 340px;
    overflow: auto;
    border-right: 1px solid #EAEDF7;
    /deep/ .ant-tree{
      position: relative;
      >li{
        .ant-tree-switcher {
          margin-left: 24px;
        }
        // .ant-tree-switcher-noop {
        //   width: 0;
        // }
        span.ant-tree-checkbox {
          position: absolute;
          left: 0px;
        }
        .ant-tree-title {
          display: inline-block;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .right {
    flex: 1;
    .right-content{
      padding: 18px 24px;
      height: calc(100% - 64px);
      overflow: auto;
      .no-data, .title {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #7C88B1;
        line-height: 20px;
      }
      .list {
        margin-top: 10px;
        .item {
          height: 40px;
          line-height: 40px;
          font-size: 0;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #242F57;
          .dept {
            display: inline-block;
            width: calc(100% - 30px);
            line-height: 40px;
            font-size: 14px;
            // overflow: hidden;
            // white-space: nowrap;
            // text-overflow: ellipsis;
          }
          .iconfont {
            display: inline-block;
            width: 20px;
            margin-left: 10px;
            vertical-align: top;
            font-size: 14px;
            text-align: end;
            color: #333;
            cursor: pointer;
          }
        }
      } 
    }
    .footer{
      padding: 16px 24px;
      flex-shrink: 0;
      text-align: end;
      border-top: 1px solid #EAEDF7;
      .cancel {
        margin-right: 10px;
        color: #636E95;
      }
    }
  }
}
</style>