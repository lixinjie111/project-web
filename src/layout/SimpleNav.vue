<template>
  <div class="simple-layout">
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
.simple-layout {
  margin-top: 51px;
  height: calc(100% - 51px);
  .content {
    height: 100%;
  }
}
</style>
