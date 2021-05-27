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
            <span class="tree-view-operation iconfont iconxiezuo" v-if="operation.indexOf('edit') !== -1" @click.stop="onHandleEdit(item)"></span>
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
    // 默认展开指定的树节点
    defaultExpandKeys: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data(){
    return {
      slots: {}
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
    onSelect(selectedKeys, e){
      this.$emit('onSelectTreeNodes', selectedKeys, e.selectedNodes)
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
    // 修改选中背景颜色
    .ant-tree-node-content-wrapper{
      height: 30px;
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
        // background:url('//assets.2dfire.com/frontend/b415e20fc703838e5a028437366ff22a.png') no-repeat;
        // background-size:contain;
        &:before {
          display: inline-block;
          color: #97A0C3;
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          content: '\e653;';
          background: #fff;
        }
        i{
          display: none;
        }
      }
      // 修改树结构展开的icon
      &.ant-tree-switcher_open{
        // background: #fff;
        // background:url('//assets.2dfire.com/frontend/568ca02f82eee05829d276881363c22a.png') no-repeat;
        // background-size:contain;
        &:before{
          display: inline-block;
          color: #97A0C3;
          font-family: "iconfont" !important;
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          content: '\e651';
          background: #fff;
        }
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