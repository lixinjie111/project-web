<template>
    <div class="users-list">
        <UserIcon class="user-icon" :value="item.userName" :key="item.userId" v-for="(item, index) in userList" closable
                  @close="handleDelete(index)"/>
        <a-popover trigger="click" placement="bottomLeft" v-model="showPopup">
            <CircleButton></CircleButton>
            <div slot="content" class="tree-list">
                <a-tree v-if="treeList.length"
                        show-line
                        multiple
                        :load-data="onLoadData"
                        :tree-data="treeList"
                        :replaceFields="replaceFields"
                        :selectedKeys="selectedKeys"
                        @select="handleSelect"/>
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
                selectedKeys: []
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

        /deep/ .ant-tree li {
            // 修改选中背景颜色
            .ant-tree-node-content-wrapper{
                height: 22px;
                line-height: 22px;
                .ant-tree-node-selected {
                    background: #F0F8FF;
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
                        content: '\e653;';
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
                        content: '\e651';
                        background: #fff;
                    }
                    i{
                        display: none;
                    }
                }
                &.ant-tree-switcher-noop {
                    width: 6px;
                    height: 6px;
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

    .user-icon {
        margin-right: 4px;
    }
</style>
