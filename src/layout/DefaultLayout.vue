<template>
    <section class="main-container">
        <div class="sider-container">
            <MenuSider></MenuSider>
        </div>
        <section class="layout-container">
            <router-view></router-view>
        </section>
    </section>
</template>
<script>
import menuList from '@/utils/menu.js'
import MenuSider from '@/components/MenuSider.vue'
export default {
    name: 'layout',
    components: {MenuSider},
    methods: {
        getRoutes() { // 请求接口 按照接口去掉不需要字段
            this.$store.dispatch('initTopMenu', menuList);
            this.$store.dispatch('initPermission', ['operation', 'member'])
            this.$store.dispatch('activeFirstMenu', menuList[0]);
            this.$store.dispatch('activeSecondMenu', this.$store.state.system.firstMenu.children[0]); // 修改横向nav激活菜单
            this.$store.dispatch('navMenu', this.$store.state.system.firstMenu.children);
            this.$store.dispatch('activeNavMenu', this.$store.state.system.secondMenu);
            
            this.$router.replace({path: this.$store.state.system.activeNavMenu.path});
            // for (let i = 0; i < this.$router.options.routes.length; i++) {
            //     if (this.$router.options.routes[i].name === "home") {
            //         this.$store.dispatch('initTopMenu', this.$router.options.routes[i].children);
            //         this.$store.dispatch('activeFirstMenu', this.$router.options.routes[i].children[0]);
            //         this.$store.dispatch('activeSecondMenu', this.$store.state.system.firstMenu.children[0]); // 修改横向nav激活菜单
            //         this.$store.dispatch('navMenu', this.$store.state.system.firstMenu.children);
            //         this.$store.dispatch('activeNavMenu', this.$store.state.system.secondMenu);
                    
            //         this.$router.replace({path: this.$store.state.system.activeNavMenu.path});
            //     }
            // }
        }
    },
    mounted() {
        let { topMenu } = this.$store.state.system;
        !topMenu.length && this.getRoutes(); // vuex已经缓存菜单
        
    }
}
</script>
<style lang="scss" scoped>
.main-container{
    // position: relative;
    display: flex;
    // .sider-container{
    //     position: fixed;
    //     left: 0;
    //     top: 0;
    //     width: 80px;
    //     height: 100vh;
    // }
    .layout-container{
        // margin-left: 80px;
        // min-width: 1360px;
        width: calc(100vw - 80px);
        min-width: 1360px;
        min-height: 100vh;
        // overflow-x: auto;
        background: #F4F7FC;;
    }
}
</style>