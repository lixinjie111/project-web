<template>
  <div class="menusider-container">
    <div class="menu-logo">
      <i class="logo-icon"></i>
    </div>
    <ul class="menu-list">
      <li :class="['menu-item', item.id === activeFirstMenu.id ? 'active' : '']" v-for="(item, index) in firstMenu" :key="index" @click="handleChangePage(index)">
        <i class="menu-icon">
          <img :src="item.icon"/>
        </i>
        <span>{{item.name}}</span>
      </li>
    </ul>
    <div class="menu-static">
      <a-popover v-model="visible" overlayClassName="set" placement="rightTop" trigger="click">
        <template slot="content">
          <p class="set-item" @click="handleShowModal">修改密码</p>
          <p class="set-item" @click="handleLogout">退出登录</p>
        </template>
        <div class="menu-setup iconfont iconshezhi"></div>
      </a-popover>
      <div class="menu-user">{{username.substring(username.length-2, username.length)}}</div>
    </div>
    <ForgetForm :isShow="isShowModal" @closePwd="isShowModal = false"></ForgetForm>
  </div>
</template>

<script>
import ForgetForm from './components/ForgetForm.vue'

export default {
  name: 'MenuSider',
  components: {ForgetForm},
  data(){
    return {
      visible: false,
      isShowModal: false,
      username: this.$store.state.users.userInfo.realName
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
    },
    // 修改密码
    handleShowModal() {
      this.visible = false; // 关闭气泡框
      this.isShowModal = true;
    },
    // 退出登录
    handleLogout(){
      this.visible = false; // 关闭气泡框
      this.$confirms({
        title: '提示',
        message: `您确定要退出登录吗？`,
        okText: '确认',
        onOk: async () => {
          try {
            let {code} = await this.$api.login.handleLogout();
            if(code === 0) {
              this.$store.dispatch('logOut').then(() => {
                this.$router.push({ path: '/login' })
              });
              this.$message.success('退出成功！');
            }
            
          }catch(error){
            console.log(error)
          }
        },
        cancelText: '取消',
        onCancel() {
        }
      });
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
      background: url('../../assets/images/logo.png') 100% / 100% no-repeat;
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
        margin: 0 2px;
        display: inline-block;
        width: 24px;
        height: 24px;
        text-align: center;
        img {
          padding: 2px 0;
          width: 24px;
          text-align: center;
        }
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
      font-size: 22px;
      color: white;
      cursor: pointer;
    }
    .menu-user {
      margin: 25px auto 24px auto;
      width: 40px;
      height: 40px;
      line-height: 38px;
      text-align: center;
      border-radius: 50%;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      background: #75B1FF;
      border: 1px solid #FFF;
      // cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.set {
  .ant-popover-inner {
    border-radius: 8px;
  }
  .ant-popover-inner-content {
    padding: 0 8px;

    .set-item {
      padding: 0 8px;
      line-height: 40px;
      cursor: pointer;
      &:nth-child(n + 2){
        border-top: 1px solid #EAEDF7;
      }
    }
  }
}
</style>
