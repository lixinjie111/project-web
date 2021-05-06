<template>
<div>
  <div @click="handleChangePage">首页</div>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  computed: {
    firstMenu(){ return this.$store.state.system.topMenu; }, // 全局菜单
    activeFirstMenu(){ return this.$store.state.system.firstMenu; }, // 激活一级菜单
    activeSecondMenu(){return this.$store.state.system.secondMenu; }, // 激活二级菜单
    activeThirdMenu(){return this.$store.state.system.thirdMenu; }, // 激活三级菜单
    activeNavMenu(){return this.$store.state.system.activeNavMenu}, // 横向激活菜单 取route路径
  },
  methods: {
    handleChangePage(){
      this.$store.dispatch('activeThirdMenu', this.activeSecondMenu.children[0])
      this.$store.dispatch('navMenu', this.activeSecondMenu);
      this.$store.dispatch('activeNavMenu', this.activeThirdMenu);
      this.$router.push({path: this.activeNavMenu.path});
    }
  }
}
</script>
<style lang="scss" scoped>

</style>