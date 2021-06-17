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
import MenuSider from '@/components/menu/MenuSider.vue'
export default {
    name: 'layout',
    components: {MenuSider},
    methods: {
    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
.main-container{
    position: relative;
    display: flex;
    height: 100%;
    // overflow: hidden;
    .sider-container{
        position: fixed;
        left: 0;
        top: 0;
        width: 80px;
        height: 100vh;
        z-index: 100;
    }
    .layout-container{
        position: relative;
        margin-left: 80px;
        min-width: 1360px;
        width: calc(100vw - 80px);
        min-width: 1360px;
        height: 100%;
        max-height: 100%;
        overflow: auto;
        background: #F4F7FC;
    }
}
</style>