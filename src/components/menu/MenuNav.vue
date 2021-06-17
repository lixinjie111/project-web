<template>
  <div class="nav-container">
    <div class="nav-left">
      <div class="title"  v-if="navlist.length === 1">{{navlist[0].name}}</div>
      <slot name="nav-left"></slot>
    </div>
    <ul class="nav-list" v-if="navlist.length > 1">
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
  position: fixed;
  top: 0;
  display: flex;
  width: calc(100vw - 80px);
  min-width: 1360px;
  background: #fff;
  z-index: 1000;
  .nav-left, .nav-right {
    width: 440px;
    height: 51px;
    background: #fff;
  }
  .nav-left {
    display: flex;
    .title {
      padding: 0 24px;
      line-height: 51px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #242F57;
    }
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
