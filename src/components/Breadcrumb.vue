<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <a v-if="item.path" :href="item.path">
        <a-icon v-if="item.iconposition === 'before'" :type="item.icon" />
        <span>{{item.name}}</span>
        <a-icon v-if="item.iconposition === 'after'" :type="item.icon" />
      </a>
      <template v-else>
        <a-icon v-if="item.iconposition === 'before'" :type="item.icon" />
        <span>{{item.name}}</span>
        <a-icon v-if="item.iconposition === 'after'" :type="item.icon" />
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>

/*
breadcrumbList: [
        {name: '角色分组', icon: 'home', iconposition: 'before', path: '/'},
        {name: '项目经理', icon: 'home', iconposition: 'after'},
      ]
*/
export default {
  name: "Breadcrumb",
  props: {
    breadcrumbList: {
      type: Array,
      default: []
    }
  }
}
</script>
<style lang="scss" scoped>
.ant-breadcrumb {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #97A0C3;
  .anticon {
    font-size: 16px;
  }
  .ant-breadcrumb-link {
    color: #242F57;
  }
}
</style>