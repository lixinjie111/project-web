<template>
  <div>
    <UserIcon v-if="multiple" :value="item.userName" :key="item.userId" v-for="(item, index) in userList" closable @close="handleDelete(index)"/>
    <a-popover trigger="click" placement="bottomLeft" v-model="showPopup">
      <template v-if="multiple">
        <CircleButton></CircleButton>
      </template>
      <template v-else-if="mode==='add'">
        <UserIcon v-if="value" :value="value.userName" />
        <CircleButton v-else></CircleButton>
      </template>
      <template v-else>
        <TwoValue :title="value.userName" :subtitle="subtitle" v-if="value">
          <UserIcon :value="value.userName" :length="1" :size="1"/>
        </TwoValue>
        <TwoValue :subtitle="subtitle" v-else>
          <CircleButton></CircleButton>
        </TwoValue>
      </template>
      <template slot="content">
        <a-tree v-if="treeList.length" :tree-data="options || treeList" :replaceFields="replaceFields"
                :checkedKeys="userKeys"
                @select="handleSelect"
              @check="handleChange"
              :checkable="multiple"
              :selectable="!multiple" />
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
        userKeys: [],
        users: [],
        replaceFields: {
          key: 'userId',
          value: 'userName',
          title: 'userName',
          children: 'children',
        },
        treeList: [
          {
            "userId":"992307132",
            // "value": "万科集团",
            "userName":"万科集团",
            "scopedSlots":{
              "userName":"custom"
            },
          },
          {
            "userId":"99230713",
            // "value": "万科集团",
            "userName":"万科集团",
            // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
            "scopedSlots":{
              "userName":"custom"
            },
            "children":[
              {
                "userId":"99230992",
                // "value": "华东区域",
                "userName":"华东区域",
                "scopedSlots":{
                  "userName":"custom"
                },
                "children":[
                  {
                    "userId":"99230112",
                    "userName":"杭州万科",
                    "scopedSlots":{
                      "userName":"custom"
                    },
                  }
                ],
              },
              {
                "userId":"99230993",
                "userName":"华南区域",
                "scopedSlots":{
                  "userName":"custom"
                },
              },
              {
                "userId":"99231020",
                "userName":"华北区域",
                "scopedSlots":{
                  "userName":"custom"
                },
              }
            ],
          },
          {
            "userId":"9923071314",
            "userName":"万科集团",
            "scopedSlots":{
              "userName":"custom"
            },
          }
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
        this.userKeys = e;
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
        console.log(e, user);
        this.users = user;
        this.$emit('change', user)
        this.$emit('input', user)
      },
      handleDelete(index) {
        this.users.splice(index, 1);
        this.$emit('change', this.users)
        this.$emit('input', this.users)
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
