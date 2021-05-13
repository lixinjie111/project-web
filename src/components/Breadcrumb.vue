<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index" :class="item.iconposition === 'before'? 'mr-r': 'mr-l'">
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
      required: true,
      default: () => []
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
  > span{
    &.mr-r {
      &:first-child {
        .anticon {
          margin-right: 16px;
        }
      }
      &:nth-child(n+2) {
        .anticon {
          margin-right: 6px;
        }
      }
    }
    &.mr-l {
      &:first-child {
        .anticon {
          margin-left: 16px;
        }
      }
      &:nth-child(n+2) {
        .anticon {
          margin-left: 6px;
        }
      }
    }
  }
  .anticon {
    font-size: 16px;
  }
  .ant-breadcrumb-link {
    color: #242F57;
  }
}
</style>