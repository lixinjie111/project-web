<template>
    <div class="dynamic-list">
        <template v-if="list.length">
            <div class="dynamic-item" v-for="(item,index) in list" :key="index">
                <div class="time">{{item.createdTime}}</div>
                <div class="info">{{item.userName}} {{item.log}}</div>
            </div>
            <Pagination v-bind="$attrs" v-on="$listeners" v-if="$attrs.total > $attrs.pageSize"></Pagination>
        </template>
        <template v-else>
            <NoData title="暂无动态"></NoData>
        </template>
    </div>
</template>

<script>
    import NoData from "./NoData";
    export default {
        name: "DynamicList",
        components: {NoData},
        props: {
            list: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

<style scoped lang="scss">
.dynamic-list {
    .dynamic-item {
        margin-bottom: 24px;

        .time {
            margin-bottom: 8px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #7C88B1;
        }

        .info {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #242F57;
        }
    }
}
</style>