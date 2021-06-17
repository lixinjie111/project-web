<template>
  <div :class="overClass">
    <a-tooltip placement="topLeft">
      <div @click="handleClick" v-show="!edit" :class="overClass">
        <slot />
      </div>
      <template slot="title">点击即可编辑</template>
    </a-tooltip>
    <div v-if="edit"><a-textarea v-bind="$attrs" @change="handleChange" :value="value"/></div>
    <a-row :gutter="[16, 16]" v-if="edit">
      <a-col span="2"><a-button type="primary" @click="handleSave">保存</a-button></a-col>
      <a-col span="2"><a-button @click="handleCancel">取消</a-button></a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "ToggleArea",
    props: ['overClass', 'value'],
    data() {
      return {
        oldValue: '',
        edit: false,
      }
    },
    methods: {
      handleChange(e) {
        this.$emit('input', e.target.value);
      },
      handleClick() {
        this.oldValue = this.value;
        this.edit = true;
      },
      handleSave() {
        this.edit = false;
        this.$emit('commit');
      },
      handleCancel() {
        this.$emit('input', this.oldValue);
        this.edit = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
