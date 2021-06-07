<template>
  <div class="header">
    <div class="header-container">
      <span class="title">{{title}}</span>
      <span class="date">
        <i class="iconfont iconrili"></i>
        {{date}}
      </span>
    </div>
    <div class="select-container">
      <DeptTree @selected-tree="handleSelected"></DeptTree>
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
import DeptTree from '@/components/tree/DeptTree.vue'
export default {
  name: 'Header',
  props: {
    title: '',
    date: '',
  },
  components: {DeptTree},

  methods: {
    // 选中
    handleSelected(value) {
      this.$emit('selected-tree', value)
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  padding: 0 8px;
}
.header-container {
  height: 44px;
  line-height: 44px;
  .title {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #242F57;
    &:after {
      display: inline-block;
      content: '';
      width: 13px;
      height: 16px;
      margin-right: 12px;
      border-right: 1px solid #EAEDF7;
    }
  }
}

.select-container {
  height: 60px;
  padding: 14px 0;
}
</style>