<template>
  <div class="menusider-container">
    <div class="menu-logo">
      <i class="logo-icon"></i>
    </div>
    <ul class="menu-list">
      <li :class='["menu-item", activeFirstMenu && activeFirstMenu.meta && item.meta.permissionKey === activeFirstMenu.meta.permissionKey ? "active" : ""]' v-for="(item, index) in firstMenu" :key="item.meta.authKey" @click="handleChangePage(index)">
        <i class="menu-icon"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <div class="menu-static">
      <div class="menu-setup"></div>
      <div class="menu-user"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSider',
  data(){
    return {
      
    }
  },
  computed: {
    firstMenu(){ return this.$store.state.system.topMenu; }, // 全局菜单
    activeFirstMenu(){ return this.$store.state.system.firstMenu; }, // 激活一级菜单
    activeSecondMenu(){return this.$store.state.system.secondMenu; }, // 激活二级菜单
    activeNavMenu(){return this.$store.state.system.activeNavMenu}, // 横向激活菜单 取route路径
  },
  methods: {
    handleChangePage(index) {
      this.$store.dispatch('activeFirstMenu', this.firstMenu[index]); // 修改侧边栏激活状态
      this.$store.dispatch('activeSecondMenu', this.firstMenu[index].children[0]); // 修改二级激活菜单
      this.$store.dispatch('activeThirdMenu', {}); // 修改三级菜单
      this.$store.dispatch('navMenu', this.firstMenu[index].children);
      this.$store.dispatch('activeNavMenu', this.activeSecondMenu);
      this.$router.push({path: this.activeNavMenu.path});
    }
  },
  mounted(){
    // console.log(this.firstMenu)
  }
  
}
</script>
<style lang="scss" scoped>
.menusider-container{
  width: 80px;
  height: 100vh;
  background: #0064FF;
  .menu-logo {
    padding-top: 10px;
    .logo-icon {
      display: block;
      margin: 0 auto 49px auto;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: white;
    }
  }
  .menu-list {
    min-height: 100px;
    height: calc(100vh - 222px);
    overflow: auto;
    .menu-item {
      margin: 0 0 12px 12px;
      padding: 8px 0 4px 12px;
      font-size: 0;
      cursor: pointer;
      opacity: 0.6;
      &.active, &:hover {
        background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.32) 100%);
        border-radius: 8px 0px 0px 8px;
        opacity: 1;
      }
      
      .menu-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: #fff;
      }
      >span {
        display: block;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color:  #fff;
        line-height: 20px;
      }
    }
  }
  .menu-static{
    margin-top: 20px;
    .menu-setup{
      margin: 0 auto;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: white;
      cursor: pointer;
    }
    .menu-user {
      margin: 25px auto 24px auto;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      cursor: pointer;
    }
  }
}
</style>
