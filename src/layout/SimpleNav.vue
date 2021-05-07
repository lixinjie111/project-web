<template>
  <div class="layout">
    <HeaderNav></HeaderNav>
    <router-view></router-view>
  </div>
</template>
<script>
import HeaderNav from '@/components/MenuNav.vue'
export default {
  components: {HeaderNav}
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100vh;
}
</style>
