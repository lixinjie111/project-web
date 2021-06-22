<template>
  <a-dropdown :trigger="['click']" overlay-class-name="priority-menu">
    <Priority :value="value"/>
    <a-menu slot="overlay" @click="handleSelect">
      <a-menu-item v-for="(prio,index) in prioritis" :key="index">
        <Priority :value="index"/>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
  import Priority from "./Priority";
  import {taskPriorities} from "@/const/data";

  export default {
    name: "PrioritySelect",
    components: {Priority},
    props: {
      value: Number,
    },
    data() {
      return {
        prioritis: taskPriorities,
      }
    },
    methods: {
      handleSelect(e) {
        this.$emit('input', e.key);
        this.$emit('change', e.key);
      }
    }
  }
</script>

<style lang="scss" scoped>
.row {
  margin: 6px 0;
}
</style>
<style lang="scss">
  .priority-menu {
    .ant-dropdown-menu {
      padding: 6px;
      width: 120px;
    }
  }
</style>
