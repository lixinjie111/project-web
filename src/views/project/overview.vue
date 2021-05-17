<template>
    <div class="overview-container">
        <ContentHeader type="title" title="产品">
            <div slot="operation">
                <a-button class="mr-16">
                    <span class="iconfont icondaochu"></span>
                    导出
                </a-button>
                <a-button type="primary">
                    <span class="iconfont iconjia"></span>
                    添加产品
                </a-button>
            </div>
        </ContentHeader>
        <div class="overview-content">

        </div>
    </div>
</template>
<script>
    import ContentHeader from '@/components/ContentHeader.vue'

    export default {
        name: 'userorg',
        components: {ContentHeader},
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .overview-container{
        margin: 16px 24px 24px 24px;

        .mr-16 {
            margin-right: 16px;
        }
    }
</style>