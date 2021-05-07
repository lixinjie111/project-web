<template>
  <div class="content-header">
    <div class="menu">
      <span class="title" v-if="type === 'title'">{{title}}</span>
      <Breadcrumb v-if="type === 'breadcrumb'" :breadcrumbList="breadcrumbList"></Breadcrumb>
    </div>
    <div class="operation">
      <slot name="operation"></slot>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'ContentHeader',
  props: {
    type: { // type = 'title' / 'breadcrumb'
      type: String,
      default: ""
    },
    title: {//title
      type: String,
      default: ""
    },
    breadcrumbList: {
      type: Array,
      default: []
    }
  },
  components: {Breadcrumb}
}
</script>
<style lang="scss" scoped>
.content-header {
  display: flex;
  height: 64px;
  margin-bottom: 8px;
  
  .menu {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #242F57;
    }
  }
  .operation {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>