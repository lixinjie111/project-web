<template>
  <div :class="overClass">
    <div v-show="!edit" :class="overClass">
      <span v-if="value" @click="handleClick">{{value}}</span>
      <span v-else>无<a class="btn" @click="handleClick">添加描述</a></span>
    </div>
    <div v-if="edit"><a-textarea v-bind="$attrs" @change="handleChange" :value="value"/></div>
    <a-row :gutter="[16, 16]" v-if="edit" class="margin">
      <a-col span="2">
        <a-config-provider :auto-insert-space-in-button="false">
           <a-button type="primary" @click="handleSave">保存</a-button>
        </a-config-provider>
      </a-col>
      <a-col span="2">
        <a-config-provider :auto-insert-space-in-button="false">
          <a-button @click="handleCancel">取消</a-button>
        </a-config-provider>
      </a-col>
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
  .margin {
    padding-top: 16px;
  }
  .btn {
    font-size: 14px;
    color: #2373FF;
    margin-left: 16px;
  }
</style>
