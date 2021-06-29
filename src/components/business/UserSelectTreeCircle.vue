<template>
    <div class="users-list">
        <UserIcon class="user-icon" :value="item.userName" :key="item.userId" v-for="(item, index) in userList" closable
                  @close="handleDelete(index)"/>
        <a-popover trigger="click" placement="bottomLeft" v-model="showPopup">
            <CircleButton></CircleButton>
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
    import CircleButton from "../buttons/CircleButton";

    export default {
        userName: "UserSelectCircle",
        components: {UserIcon, CircleButton},
        data() {
            return {
                userList: this.list,
                treeList: [],
                showPopup: false,
                replaceFields: {
                    key: 'id',
                    value: 'id',
                    title: 'name',
                    pId: 'parentId',
                    children: 'children',
                },
                selectedKeys: [],
                expandedKeys: []
            }
        },
        props: {
            list: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },
        created() {
            this.handleGetDepartTree();
            this.userList && this.userList.forEach((item)=>{
                this.selectedKeys.push('user-' + item.userId);
            });
        },
        methods: {
            // 查询部门树
            async handleGetDepartTree() {
                try {
                    let {code, data} = await this.$api.org.getDeptTree();
                    if (code === 0) {
                        this.treeList = this.handlePreData(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            // 预处理树形结构
            handlePreData(data) {
                Array.isArray(data) && data.map(item => {
                    item.selectable = false; // 树形是否可点击
                    // item.slots={icon: ''};
                    if (item.children) {
                        this.handlePreData(item.children);
                    }
                });
                return data;
            },
            handleSelect(selectedKeys, e) {
                let selectUser = e.node.dataRef;
                this.showPopup = false;
                let index = this.userList ? this.userList.findIndex(i => i.userId == selectUser.userId) : -1;
                if (index < 0) {
                    this.userList.push({
                        userName: selectUser.name,
                        userId: selectUser.userId,
                    });
                    this.selectedKeys.push('user-' + selectUser.userId);
                } else {
                    let selectedKeysIndex = this.selectedKeys.findIndex(i => i == selectUser.id);
                    this.userList.splice(index, 1);
                    this.selectedKeys.splice(selectedKeysIndex, 1);
                }
                this.$emit('change', this.userList);
            },
            handleClick(event, treeNode){
                // console.log(treeNode)
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
            handleDelete(index) {
                let selectedKeysIndex = this.selectedKeys.findIndex(i => i == 'user-' + this.userList[index].userId);
                this.userList.splice(index, 1);
                this.selectedKeys.splice(selectedKeysIndex, 1);
                this.$emit('change', this.userList);
            },
            onLoadData(treeNode) {
                return new Promise(resolve => {
                    const {id} = treeNode.dataRef;
                    this.$api.org.getDeptUserList(id).then(res => {
                        if (res.code === 0 && res.data) {
                            let users = res.data.map(item => {
                                return {
                                    id: 'user-' + item.userId,
                                    name: item.realName,
                                    isLeaf: true,
                                    parentId: id,
                                    userId: item.userId,
                                    userName: item.realName,
                                    roleName: item.roleName,
                                    scopedSlots: {icon: 'user'}
                                }
                            });
                            if (treeNode.dataRef.children)
                                treeNode.dataRef.children = treeNode.dataRef.children.concat(users);
                            else
                                treeNode.dataRef.children = users;
                            resolve();
                        }
                    }).catch(err => {
                    })
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .tree-list {
        width: 160px;
        max-height: 300px;
        overflow: auto;

        /deep/ .ant-tree li.dept{

            // 修改选中背景颜色
            .ant-tree-node-content-wrapper{
                height: 22px;
                line-height: 22px;
                .ant-tree-node-selected {
                    background: #F0F8FF;
                }
                .iconfont {
                    font-size: 12px;
                }
            }

            span.ant-tree-switcher{
                width:12px;
                height:12px;
                margin: 4px;
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
                        background: #fff;
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
                        background: #fff;
                    }
                    i{
                        display: none;
                    }
                }
            }
        }

        .icona-renyuan-tianchong {
            color: #7c88b1;
            font-size: 16px;
        }
    }

    .users-list {
        display: flex;
        align-items: center;

        .user-icon {
            margin-right: 4px;
        }
    }
</style>
