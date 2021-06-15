<template>
<div class="empty-layout">
  <router-view></router-view>
</div>
</template>
<script>
export default {
  name: 'EmptyLayout'
}
</script>
<style lang="scss" scoped>
.empty-layout {
  width: 100%;
  overflow: hidden;
}
</style>