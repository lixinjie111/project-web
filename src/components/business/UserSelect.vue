<template>
  <div class="user-align">
    <UserIcon v-if="multiple" :value="item.userName" :key="item.userId" v-for="(item, index) in userList" closable @close="handleDelete(index)" class="margin"/>
    <a-popover trigger="click" placement="bottomLeft" overlay-class-name="user-sel-popover" v-model="showPopup">
      <template v-if="multiple">
        <CircleButton></CircleButton>
      </template>
      <template v-else-if="mode==='add'">
        <UserIcon v-if="value" :value="value.userName" />
        <CircleButton v-else></CircleButton>
      </template>
      <template v-else>
        <TwoValue :title="value.userName || '-'" :subtitle="subtitle" v-if="value">
          <UserIcon :value="value.userName" :length="1" :size="1"/>
        </TwoValue>
        <TwoValue title="-" :subtitle="subtitle" v-else>
          <CircleButton></CircleButton>
        </TwoValue>
      </template>
      <template slot="content">
        <a-tree v-if="(options || treeList).length" :tree-data="options || treeList" :replaceFields="replaceFields"
                :checkedKeys="userKeys"
                @select="handleSelect"
              @check="handleChange"
              :checkable="multiple"
              :selectable="!multiple" />
        <div class="no-user" v-else>请在【团队】页面先添加项目成员</div>
      </template>
    </a-popover>
  </div>
</template>

<script>
  import UserIcon from './UserIcon';
  import TwoValue from './TwoValue';
  import CircleButton from "../buttons/CircleButton";
  import Tree from "@/components/tree/Tree";

  export default {
    userName: "UserSelect",
    components: { UserIcon, CircleButton, TwoValue, Tree },
    data() {
      return {
        mode: 'user', // user/add
        users: [],
        replaceFields: {
          key: 'userId',
          value: 'userName',
          title: 'userName',
          children: 'children',
        },
        treeList: [
        ],
        autoExpandParent: true,
        showPopup: false,
      }
    },
    props: {
      value: {
        type: [Array, Object],
        default: () => {return []}
      },
      multiple: {
        default: false,
        type: Boolean,
      },
      subtitle: String,
      options: {
        type: Array,
        default: () => {return []}
      },
    },
    computed: {
      userList() {
        return this.value || this.users;
      },
      userKeys() {
        if (Array.isArray(this.userList))
        return this.userList.map(item => item.userId)
        else
          return [this.userList.userId]
      }
    },
    methods: {
      getUserById(userId, users) {
        for (let u of users) {
          if (u.userId === userId)
            return u;
          if (u.children) {
            let find = this.getUserById(userId, u.children);
            if (find)
              return find;
          }
        }
        return null;
      },
      handleChange(e) {
        console.log('handleChange', e);
        let users = [];
        e.forEach(userId => {
          let user = this.options ? this.getUserById(userId, this.options) : this.getUserById(userId, this.treeList);
          if (! user.children)
            users.push(user);
        })
        // this.userKeys = e;
        this.users = users;
        this.$emit('change', users)
        this.$emit('input', users)
      },
      handleSelect(e) {
        let userId = e[0];
        let user = this.options ? this.getUserById(userId, this.options) : this.getUserById(userId, this.treeList);
        if (user.children) {
          return;
        }
        this.showPopup = false;
        // console.log(e, user);
        this.users = user;
        this.$emit('change', user)
        this.$emit('input', user)
      },
      handleDelete(index) {
        let users = this.userList;
        users.splice(index, 1);
        this.$emit('change', users)
        this.$emit('input', users)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .margin {
    margin-right: 6px;
  }
  .user-align {
    display: flex;
    align-items: center;
    height: 40px;
  }
  .no-user {
    color: #636E95;
    font-size: 14px;
  }
</style>
<style lang="scss">
.user-sel-popover {
  .ant-popover-inner-content {
    max-width: 200px;
    max-height: 280px;
    overflow-y: auto;
  }

  .ant-tree li span.ant-tree-switcher.ant-tree-switcher-noop {
    display: none;
  }
}
</style>
