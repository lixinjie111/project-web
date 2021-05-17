<template>
  <a-dropdown :trigger="['click']">
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

  export default {
    name: "PrioritySelect",
    components: {Priority},
    props: {
      value: Number,
    },
    data() {
      return {
        prioritis: [
          '高',
          '中',
          '低',
        ],
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
