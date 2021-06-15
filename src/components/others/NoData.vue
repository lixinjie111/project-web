<template>
    <div class="no-data">
        <img src="@/assets/images/report/no-data.png"/>
        <div class="title">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "NoData",
        props: {
            title: {
                type: String,
                default: '暂无数据'
            }
        }
    }
</script>

<style scoped lang="scss">
    .no-data {
        padding: 64px 0;
        text-align: center;
        background: #FFFFFF;
        border-radius: 4px;

        > img {
            margin: 0 auto;
            width: 102px;
            height: 102px;
        }

        .title {
            height: 50px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #7C88B1;
            line-height: 50px;
        }
    }
</style>