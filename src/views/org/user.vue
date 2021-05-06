<template>
  <div class="userOrg-container">
    <div class="userOrg-header"></div>
    <div class="userOrg-content">
      <div class="userOrg-left">
        <Tree></Tree>
      </div>
      <div class="userOrg-right"></div>
    </div>
  </div>
</template>
<script>
import Tree from '@/components/Tree.vue';
export default {
  name: 'userorg',
  components: {Tree}
}
</script>
<style lang="scss" scoped>

</style>