<template>
  <div class="nav-container">
    <slot name="nav-left"></slot>
    <ul class="nav-list">
      <li :class='["nav-item", activeNavMenu && activeNavMenu.meta && item.meta.permissionKey === activeNavMenu.meta.permissionKey ? "active" : ""]' v-for="(item, index) in navlist" :key="index" @click="handleChangePage(index)">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    navlist() { return this.$store.state.system.navMenu; }, // 当前nav列表
    activeNavMenu(){return this.$store.state.system.activeNavMenu}, // 激活nav
  },
  methods: {
    handleChangePage(index) {
      this.$store.dispatch('activeNavMenu', this.navlist[index])
      this.$router.push({
        path: this.activeNavMenu.path
      });
    }
  },
  mounted(){
   
  }
}
</script>
<style lang="scss" scoped>
.nav-container {
  width: calc(100vw - 80px);
  background: #fff;
  .nav-list {
    display: flex;
    height: 51px;
    justify-content: center;
    .nav-item {
      position: relative;
      margin: 0 22px;
      color: #97A0C3;
      cursor: pointer;
      > span {
        line-height: 51px;
      }
      &:hover, &.active{
        color: #242F57;
        &:after {
          position: absolute;
          line-height: 0;
          width: 100%;
          height: 2px;
          content: '';
          bottom: 0;
          left: 0;
          background: #0064FF;
        }
      }
    }
  }
}
</style>