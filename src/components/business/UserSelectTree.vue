<template>
  <a-tree-select
      @select="handleSelect"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :placeholder="placeholder"
      allow-clear
      tree-data-simple-mode
      :tree-data="treeList"
      :load-data="onLoadData"
      :replace-fields="replaceFields"
  >
  </a-tree-select>
</template>

<script>
  import UserIcon from './UserIcon';
  import TwoValue from './TwoValue';
  import CircleButton from "../buttons/CircleButton";
  import Tree from "@/components/tree/Tree";
  import {getDeptTree, getDeptUserList, searchUserList} from "@/api/org";

  export default {
    userName: "UserSelectTree",
    components: { UserIcon, CircleButton, TwoValue, Tree },
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
      }
    },
    props: {
      // value: {
      //   type: [Array, Object],
      //   default: () => {return []}
      // },
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
          console.log(treeNode.dataRef)
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
      handleSelect(value, node, extra) {
        console.log(value, node.dataRef)
        this.$emit('select', node.dataRef);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
