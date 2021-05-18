<template>
    <a-locale-provider :locale="locale">
        <div id="app">
            <router-view></router-view>
        </div>
    </a-locale-provider>
</template>

<script>
    import zhCN from 'x-intelligent-ui/lib/locale-provider/zh_CN';
    export default {
        name: 'App',
        data() {
            return {
                locale: zhCN,
            };
        },
    };
</script>
