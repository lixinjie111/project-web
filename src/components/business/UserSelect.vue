<template>
  <div>
    <UserIcon v-if="multiple" :value="item.name" :key="item.id" v-for="(item, index) in userList" @close="handleDelete(index)"/>
    <a-popover trigger="click" placement="bottomLeft" v-model="showPopup">
      <template v-if="multiple">
        <CircleButton></CircleButton>
      </template>
      <template v-else-if="mode==='add'">
        <UserIcon v-if="value" :value="value.name" />
        <CircleButton v-else></CircleButton>
      </template>
      <template v-else>
        <TwoValue :title="value.name" :subtitle="subtitle" v-if="value">
          <UserIcon :value="value.name" :length="1" :size="1"/>
        </TwoValue>
        <TwoValue :subtitle="subtitle" v-else>
          <CircleButton></CircleButton>
        </TwoValue>
      </template>
      <template slot="content">
        <a-tree v-if="treeList.length" :tree-data="treeList" :replaceFields="replaceFields"
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
    name: "UserSelect",
    components: { UserIcon, CircleButton, TwoValue, Tree },
    data() {
      return {
        mode: 'user', // user/add
        userKeys: [],
        users: [],
        replaceFields: {
          key: 'id',
          value: 'name',
          title: 'name',
          children: 'children',
        },
        treeList: [
          {
            "id":"992307132",
            // "value": "万科集团",
            "name":"万科集团",
            "scopedSlots":{
              "name":"custom"
            },
          },
          {
            "id":"99230713",
            // "value": "万科集团",
            "name":"万科集团",
            // ⚠️重点这这里⚠️每一条数据上都添加scopedSlots属性
            "scopedSlots":{
              "name":"custom"
            },
            "children":[
              {
                "id":"99230992",
                // "value": "华东区域",
                "name":"华东区域",
                "scopedSlots":{
                  "name":"custom"
                },
                "children":[
                  {
                    "id":"99230112",
                    "name":"杭州万科",
                    "scopedSlots":{
                      "name":"custom"
                    },
                  }
                ],
              },
              {
                "id":"99230993",
                "name":"华南区域",
                "scopedSlots":{
                  "name":"custom"
                },
              },
              {
                "id":"99231020",
                "name":"华北区域",
                "scopedSlots":{
                  "name":"custom"
                },
              }
            ],
          },
          {
            "id":"9923071314",
            "name":"万科集团",
            "scopedSlots":{
              "name":"custom"
            },
          }
        ],
        autoExpandParent: true,
        showPopup: false,
      }
    },
    props: {
      value: Array || Object,
      multiple: {
        default: false,
        type: Boolean,
      },
      subtitle: String,
    },
    computed: {
      userList() {
        return this.value || this.users;
      }
    },
    methods: {
      getUserById(id, users) {
        for (let u of users) {
          if (u.id === id)
            return u;
          if (u.children) {
            let find = this.getUserById(id, u.children);
            if (find)
              return find;
          }
        }
        return null;
      },
      handleChange(e) {
        let users = [];
        e.forEach(id => {
          let user = this.getUserById(id, this.treeList);
          if (! user.children)
            users.push(user);
          // console.log(e, user);
        })
        this.userKeys = e;
        this.users = users;
        this.$emit('change', users)
        this.$emit('input', users)
      },
      handleSelect(e) {
        let id = e[0];
        let user = this.getUserById(id, this.treeList);
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
