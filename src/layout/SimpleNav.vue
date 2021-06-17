<template>
  <div class="layout">
    <HeaderNav></HeaderNav>
    <router-view class="content"></router-view>
  </div>
</template>
<script>
import HeaderNav from '@/components/menu/MenuNav.vue'
export default {
  components: {HeaderNav}
}
</script>
<style lang="scss" scoped>
.layout {
  margin-top: 51px;
  height: calc(100% - 51px);
}
</style>
