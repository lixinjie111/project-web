<template>
    <div class="basic-tabs-container">
        <div class="tabs-item" v-for="(item,index) in tabList" :key="index" :class="active == item.status ? 'active' : ''" @click="changeTab(item.status)">
            {{item.name}}
            <span v-show="active == item.status">{{item.num}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BasicTabs",
        data() {
            return {
                active: this.tabActive
            }
        },
        props: {
            tabActive: {
                type: Number,
                default: 0
            },
            tabList: {
                type: Array,
                default: () => []
            }
        },
        watch: {
            tabActive(val) {
                this.active = val;
            }
        },
        methods: {
            changeTab(status) {
                this.active = status;
                this.$emit('change', status);
            }
        }
    }
</script>

<style scoped lang="scss">
    .basic-tabs-container {
        display: flex;
        align-items: center;
        width: 100%;

        .tabs-item {
            padding: 0 16px;
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #97A0C3;
            cursor: pointer;
            line-height: 22px;

            &.active {
                color: #0064FF;
            }

            > span {
                display: inline-block;
                margin-left: 4px;
                padding: 0 8px;
                min-width: 24px;
                height: 16px;
                line-height: 16px;
                background: #FFFFFF;
                border-radius: 4px;
                border: 1px solid #EAEDF7;
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #242F57;
                text-align: center;
            }
        }
    }
</style>
