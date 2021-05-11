<template>
  <!-- <a-tree show-line :default-expanded-keys="[]" @select="onSelect">
    <a-icon slot="switcherIcon" type="down" />
    <a-tree-node switcherIcon="down" key="0-0" title="parent 1 parent 1 parent 1 parent 1 parent 1 parent 1 parent 1 parent 1 ">
      
    </a-tree-node>
    <a-tree-node key="0-1" title="leaf" />
  </a-tree> -->
  <div class="tree">
    <a-tree show-line :blockNode="true" :default-expanded-keys="defaultExpandKeys" :treeData="treeData" @select="onSelect">
      <template slot="custom" slot-scope="item">
        <div class="tree-view-item">
          <span class="tree-view-left">{{ item.title }}</span>
          <div class="tree-view-right">
            <span class="tree-view-operation" v-if="operation.indexOf('edit') !== -1" @click.stop="onHandleEdit(item)">
              <img src="//assets.2dfire.com/frontend/a7a2aed48cbeac93209d8cf12abb7120.png" alt="编辑"/>
            </span>
            <span class="tree-view-operation" v-if="operation.indexOf('del') !== -1" @click.stop="onHandleDelete(item)">
              <img src="//assets.2dfire.com/frontend/ddb26080b4607970693a064ceef5a672.png" alt="删除"/>
            </span>
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
    // 树形结构数据
    treeData: { 
      type: Array,
      default: []
    },
    // 操作列表
    operation: {
      type: Array,
      default: []
    },
    // 默认展开指定的树节点
    defaultExpandKeys: {
      type: Array,
      default: []
    }
  },
  methods: {
    onSelect(selectedKeys){
      this.$emit('onSelectTreeNodes', selectedKeys)
    },
    // 编辑处理
    onHandleEdit(item){
      this.$emit('onEditTreeNode', item);
    },
    // 删除处理
    onHandleDelete(item){
      this.$emit('onDeleteTreeNode', item);
    }
  }
}
</script>
<style lang="scss" scoped>
.tree {
  /deep/ .ant-tree li {
    // 修改选中背景颜色
    .ant-tree-node-content-wrapper.ant-tree-node-selected {
      background: #F0F8FF;
    }
    span.ant-tree-switcher{
      width:16px;
      height:16px;
      margin:4px;
      // 修改树结构合起的icon
      &.ant-tree-switcher_close{
        background:url('//assets.2dfire.com/frontend/b415e20fc703838e5a028437366ff22a.png') no-repeat;
        background-size:contain;
        i{
          display: none;
        }
      }
      // 修改树结构展开的icon
      &.ant-tree-switcher_open{
        background:url('//assets.2dfire.com/frontend/568ca02f82eee05829d276881363c22a.png') no-repeat;
        background-size:contain;
        i{
          display: none;
        }
      }
      &.ant-tree-switcher-noop {
        width: 8px;
        height: 8px;
        margin: 8px;
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