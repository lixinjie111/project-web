<template>
  <!-- <a-tree-select
      @select="handleSelect"
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :placeholder="placeholder"
      allow-clear
      tree-data-simple-mode
      :tree-data="treeList"
      :load-data="onLoadData"
      :replace-fields="replaceFields"
  >
  </a-tree-select> -->
  <div class="users-select">
        <a-popover trigger="click" overlay-class-name="user-sel-tree-popover" placement="bottomLeft" v-model="showPopup">
          <div :class="['select', showPopup ? 'select-open': 'select-close']">
            <p>{{username}}</p>
            <span class="icon iconfont iconxia"></span>
          </div>
            <div slot="content" class="tree-list">
                <a-tree v-if="treeList.length"
                        multiple
                        :showIcon="true"
                        :load-data="onLoadData"
                        :tree-data="treeList"
                        :replaceFields="replaceFields"
                        :selectedKeys="selectedKeys"
                        :expandedKeys="expandedKeys"
                        @select="handleSelect"
                        @click="handleClick"
                        @expand="handleExpand">
                    <span slot="user" class="iconfont icona-renyuan-tianchong"></span>
                </a-tree>
            </div>
        </a-popover>
    </div>
</template>

<script>
  import UserIcon from './UserIcon';
  import TwoValue from './TwoValue';
  import {getDeptTree, getDeptUserList, searchUserList} from "@/api/org";

  export default {
    userName: "UserSelectTree",
    components: { UserIcon, TwoValue },
    data() {
      return {
        mode: 'user', // user/add
        userKeys: [],
        users: [],
        replaceFields: {
          key: 'id',
          value: 'id',
          title: 'name',
          pId: 'parentId',
          children: 'children',
        },
        treeList: [
        ],
        autoExpandParent: true,
        showPopup: false,

        username: '',
        selectedKeys: [],
        expandedKeys: []
      }
    },
    props: {
      value: {
        type: [Array, Object],
        default: () => {return []}
      },
      // multiple: {
      //   default: false,
      //   type: Boolean,
      // },
      placeholder: String,
    },
    mounted() {
      this.loadDept();
    },
    methods: {
      onLoadData(treeNode) {
        return new Promise(resolve => {
          // console.log(treeNode.dataRef)
          const { id } = treeNode.dataRef;
          getDeptUserList(id).then(res => {
            if (res.code === 0 && res.data) {
              let users = res.data.map(item => {
                return {
                  id: 'user-'+item.userId,
                  name: item.realName,
                  isLeaf: true,
                  parentId: id,
                  userId: item.userId,
                  userName: item.realName,
                  roleName: item.roleName,
                  scopedSlots: {icon: 'user'}
                }
              });

              // this.treeList = this.treeList.concat(users);
              if (treeNode.dataRef.children)
                treeNode.dataRef.children = treeNode.dataRef.children.concat(users);
              else
                treeNode.dataRef.children = users;
              resolve();
            }
          }).catch(err => {})
            // this.treeData = this.treeData.concat([
            //   this.genTreeNode(id, false),
            //   this.genTreeNode(id, true),
            // ]);
        });
      },

      loadDept() {
        getDeptTree().then(res => {
          if (res.code === 0 && res.data) {
            this.treeList = this.parseData(res.data);
          }
        }).catch(err =>{});

        // searchUserList('曹从心');
      },
      parseData(data) {
        if (data && data.length>0){
          data.forEach(item => {
            item.selectable = false;
            this.parseData(item.children);
          })
        }
        return data;
      },
      handleSelect(value, event, extra) {
        this.$nextTick(() => {
          this.username = event.node.dataRef.userName;
          this.selectedKeys =  value;
          this.showPopup = false; // 关闭弹窗
          this.$emit('select', event.node.dataRef);
        });
      },
      handleClick(event, treeNode){
          let {expandedKeys} = this;
          let id = treeNode?.dataRef.id;
          let index = expandedKeys.indexOf(id);
          if (index === -1) {
              expandedKeys.push(id)
              this.expandedKeys = expandedKeys;
          }else{
              this.expandedKeys.splice(index, 1);
          }
      },
      handleExpand(expandedKey, obj){
          let {expandedKeys} = this;
          //展开的状态
          if (obj.expanded) {
              this.expandedKeys = expandedKey;
          } else {
              //expandedKey 返回的是当前已经展开的元素 expandedKeys 是上次展开的元素
              //比较两个数组中缺少的元素得出当前被收起的是哪个元素
              let removeArray = this.diffArray(expandedKey, expandedKeys)
              //收起的时候需要把里面展开的元素一并移除，不然会造成收起动作无效
              expandedKeys = expandedKeys.filter((ele) => !removeArray.includes(ele) )
              this.expandedKeys = expandedKeys;
          }
      },
      //比较出2个数组中不一样的元素
      diffArray(arr1, arr2) {
          let diff1 = arr1.filter((i) => arr2.indexOf(i) < 0);
          let diff2 = arr2.filter((i) => arr1.indexOf(i) < 0)
          return [...diff1, ...diff2];
      },
    }
  }
</script>

<style lang="scss" scoped>
.users-select {
  .select {
    width: 100%;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #C6CBDE;
    border-top-width: 1.02px;
    border-radius: 4px;
    display: flex;
    p {
      padding: 0 5px;
      flex: 1;
    }
    .icon{
      display: inline-block;
      padding: 0 5px;
      color: #97A0C3;
      transition: all 500ms;
    }
    &.select-open {
      .icon {
        transform: rotate(-180deg);
      }
    }
    &.select-close {
      .icon {
        transform: rotate(0deg);
      }

    }
  }
}
.tree-list {
  .icona-renyuan-tianchong {
    color: #7c88b1;
    font-size: 16px;
  }
}
</style>
<style lang="scss">
    .user-sel-tree-popover {
        .ant-popover-inner-content {
            max-width: 200px;
            max-height: 300px;
            overflow: auto;
        }
    }
</style>
