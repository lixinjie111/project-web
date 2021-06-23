<template>
  <div class="tree">
    <a-tree show-line :blockNode="true" 
    :default-selected-keys="defaultSelectedKeys" :default-expanded-keys="defaultExpandKeys" 
    :selectedKeys="selectedKeyList" :expandedKeys="expandedKeys"
    :treeData="treeData" 
    @select="onSelect" @expand="onExpand">
      <template slot="custom" slot-scope="item">
        <div class="tree-view-item">
          <span class="tree-view-left">{{ item.title }}</span>
          <div class="tree-view-right">
            <!-- <span class="tree-view-operation iconfont iconxiezuo" v-if="operation.indexOf('edit') !== -1" @click.stop="onHandleEdit(item)"></span> -->
            <span class="tree-view-operation iconfont iconshanchu" v-if="operation.indexOf('del') !== -1" @click.stop="onHandleDelete(item)"></span>
          </div>
        </div>
      </template>
    </a-tree>
  </div>
</template>
<script>
export default {
  name: 'tree',
  props: {
    // 替换树形结构字段
    replaceFields: {
      type: Object, 
      required: true
    },
    // 树形结构数据
    treeData: { 
      type: Array,
      required: true,
      default: () => []
    },
    // 操作列表
    operation: {
      type: Array,
      required: false,
      default: () => []
    },
    // 默认选中节点
    defaultSelectedKeys: {
      type: Array,
      default: () => []
    },
    // 默认展开指定的树节点
    defaultExpandKeys: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data(){
    return {
      selectedKeyList: [], 
      expandedKeys: []
    }
  },
  watch: {
    treeData: {
      handler(list) {
        this.handleData(list);
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSelect(selectedKeys, obj){
      let {expandedKeys, selectedKeyList} = this;
      //选中的状态
      if (obj.selected) {
          //判断是否已经展开，未展开就添加到 expandedKeys 中
          //已经展开就不用管
          let index = expandedKeys.indexOf(selectedKeys[0])
          if (index === -1) {
              expandedKeys.push(selectedKeys[0])
              this.expandedKeys = expandedKeys;
          } 
          this.selectedKeyList = selectedKeys;
      } else {
        //selectedKey 是上次选中的元素 在 expandedKeys 肯定是存在的
        let index = expandedKeys.indexOf(selectedKeyList[0])
        if (index !== -1) {
          //过渡掉子类元素
          expandedKeys = expandedKeys.filter((ele) => ele!==(selectedKeyList[0]))
          this.expandedKeys = expandedKeys;
        } 
        this.selectedKeyList = [];
      }
      this.$emit('onSelectTreeNodes', selectedKeys, obj.selectedNodes)
    },
 
    //展开的回调
    onExpand(expandedKey, obj){
        let {expandedKeys} = this;
        //展开的状态
        if (obj.expanded) {
            this.expandedKeys = expandedKey;
            // this.selectedKeyList = [];
        } else {
            //expandedKey 返回的是当前已经展开的元素 expandedKeys 是上次展开的元素
            //比较两个数组中缺少的元素得出当前被收起的是哪个元素
            let removeArray = this.diffArray(expandedKey, expandedKeys)
            //收起的时候需要把里面展开的元素一并移除，不然会造成收起动作无效
            expandedKeys = expandedKeys.filter((ele) => !removeArray.includes(ele) )
            this.expandedKeys = expandedKeys;
            // this.selectedKeyList = [];
        }
    },
 
    //比较出2个数组中不一样的元素
    diffArray(arr1, arr2) {
      let diff1 = arr1.filter((i) => arr2.indexOf(i) < 0);
      let diff2 = arr2.filter((i) => arr1.indexOf(i) < 0)
      return [...diff1, ...diff2];
    },
    // 编辑处理
    onHandleEdit(item){
      this.$emit('onEditTreeNode', item);
    },
    // 删除处理
    onHandleDelete(item){
      this.$emit('onDeleteTreeNode', item);
    },
    // 递归处理数据
    handleData(data){
      let {key, title, value, children} = this.replaceFields;
      data.map((item, index) => {
        if(this.operation.length) {
          item['scopedSlots'] = {title: 'custom'}
        }
        item['key'] = item[key];
        item['value'] = item[value ? value : key];
        item['title'] = item[title];
        if(item[children]) item['children'] = item[children];
        if(item['children'] && item['children'].length){
          this.handleData(item['children'])
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tree {
  width: 100%;
  height: 100%;
  overflow: auto;
  /deep/ .ant-tree li {
    // span.ant-tree-iconEle {
    //   display: none;
    // }
    
    // 修改选中背景颜色
    .ant-tree-node-content-wrapper{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      .ant-tree-node-selected {
        background: #F0F8FF;
      }
    }
    span.ant-tree-switcher{
      width:16px;
      height:16px;
      margin: 6px 4px;
      line-height: 16px;
      overflow: hidden;
      // 修改树结构合起的icon
      &.ant-tree-switcher_close{
        &:before {
          display: inline-block;
          color: #97A0C3;
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          content: '\e658;';
          background: none;
        }
        i{
          display: none;
        }
      }
      // 修改树结构展开的icon
      &.ant-tree-switcher_open{
        &:before{
          display: inline-block;
          color: #97A0C3;
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          content: '\e657';
          background: none;
        }
        i{
          display: none;
        }
      }
      &.ant-tree-switcher-noop {
        width: 8px;
        height: 8px;
        margin:  11px 8px;
        border-radius: 50%;
        background: #C6CBDE;
        i{
          display: none;
        }
      }
    }
  }
}
.tree-view-item {
  display: flex;
  .tree-view-left {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tree-view-right {
    text-align: right;
    display: none;
    .tree-view-operation {
      display: inline-block;
      margin: 0 4px;
      vertical-align: middle;
      img {
        width: 16px;
      }
    }
  }
  // hover显示操作
  &:hover {
    .tree-view-right {
      display: block;
    }
  }
}
</style>