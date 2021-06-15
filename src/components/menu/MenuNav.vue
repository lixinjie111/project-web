<template>
  <div class="nav-container">
    <div class="nav-left">
      <slot name="nav-left"></slot>
    </div>
    <ul class="nav-list">
      <li :class='["nav-item", item.path === activeNavMenu.path ? "active" : ""]' v-for="(item, index) in navlist" :key="index" @click="handleChangePage(index)">
        <span>{{item.name}}</span>
      </li>
    </ul>
    <div class="nav-right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MenuNav',
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
      this.$store.dispatch('activeNavMenu', this.navlist[index]);
      let {params, query} = this.$route;
      this.$router.push({
        path: this.activeNavMenu.path,
        params, 
        query
      });
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss" scoped>
.nav-container {
  display: flex;
  width: calc(100vw - 80px);
  min-width: 1360px;
  background: #fff;
  .nav-left, .nav-right {
    width: 440px;
    height: 51px;
    background: #fff;
  }
  .nav-list {
    flex: 1;
    display: flex;
    height: 51px;
    flex-shrink: 0;
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
