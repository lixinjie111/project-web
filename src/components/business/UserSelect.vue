<template>
  <div>
    <UserIcon :value="item" v-for="(item, index) in userList" @close="handleDelete(index)"/>
    <a-popover trigger="click" placement="bottomLeft">
      <CircleButton></CircleButton>
      <template slot="content">
        <a-tree
            :checkedKeys="users"
            @check="handleChange"
            checkable
            :auto-expand-parent="autoExpandParent"
            :tree-data="dataSource"
        />
      </template>
    </a-popover>
  </div>
</template>

<script>
  import UserIcon from './UserIcon';
  import CircleButton from "@/components/buttons/CircleButton";

  export default {
    name: "UserSelect",
    components: { UserIcon, CircleButton },
    data() {
      return {
        users: [],
        dataSource: [
          {
            title: '0-0',
            key: '0-0',
            children: [
              {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                  { title: '0-0-0-0', key: '0-0-0-0' },
                  { title: '0-0-0-1', key: '0-0-0-1' },
                  { title: '0-0-0-2', key: '0-0-0-2' },
                ],
              },
              {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                  { title: '0-0-1-0', key: '0-0-1-0' },
                  { title: '0-0-1-1', key: '0-0-1-1' },
                  { title: '0-0-1-2', key: '0-0-1-2' },
                ],
              },
              {
                title: '0-0-2',
                key: '0-0-2',
              },
            ],
          },
          {
            title: '0-1',
            key: '0-1',
            children: [
              { title: '0-1-0-0', key: '0-1-0-0' },
              { title: '0-1-0-1', key: '0-1-0-1' },
              { title: '0-1-0-2', key: '0-1-0-2' },
            ],
          },
          {
            title: '0-2',
            key: '0-2',
          },
        ],
        autoExpandParent: true,
      }
    },
    props: {
      value: Array,
    },
    computed: {
      userList() {
        return this.value || this.users;
      }
    },
    methods: {
      handleChange(e) {
        console.log(e)
        this.users = e;
        this.$emit('change', e)
        this.$emit('input', e)
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
