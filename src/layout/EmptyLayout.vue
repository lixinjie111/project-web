<template>
<div class="empty-layout">
  <router-view class="content"></router-view>
</div>
</template>
<script>
export default {
  name: 'EmptyLayout'
}
</script>
<style lang="scss" scoped>
.empty-layout {
  margin-top: 51px;
  width: 100%;
  height: calc(100% - 51px);
  overflow: hidden;
}
</style>