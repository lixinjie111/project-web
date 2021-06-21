<template>
  <div :class="overClass">
    <a-tooltip placement="top">
      <div @click="handleClick" v-show="!edit" :class="overClass">
        <slot />
      </div>
      <template slot="title">点击即可编辑</template>
    </a-tooltip>
    <a-input :value="value" v-show="edit" v-bind="$attrs" @input="handleChange" @blur="handleEnd" @pressEnter="handleEnd" placeholder="输入任务名称" :class="overClass" />
  </div>
</template>

<script>
  export default {
    name: "ToggleInput",
    props: ['value', 'overClass'],
    data() {
      return {
        edit: false,
      }
    },
    methods: {
      handleChange(e) {
        this.$emit('input', e.target.value);
      },
      handleClick() {
        this.edit = true;
      },
      handleEnd() {
        this.edit = false;
        this.$emit('commit');
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
