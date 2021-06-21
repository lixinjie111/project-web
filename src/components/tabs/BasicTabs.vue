<template>
    <div class="basic-tabs-container">
        <div class="tabs-content">
            <div class="item" v-for="(item,index) in tabList" :key="index" :class="tabActive == index + 1 ? 'active' : ''" @click="changeTab(index+1,item.status)">{{item.name}}<span v-show="tabActive == index + 1">{{item.num}}</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BasicTabs",
        data() {
            return {
                tabActive: 1,
                tabTop: 0
            }
        },
        props: {
            tabList: {
                type: Array,
                default: () => []
            }
        },
        mounted() {
            // this.resizeScroll();
        },
        methods: {
            resizeScroll() {
                setTimeout(() => {
                    let tabContainer = document.querySelector('.basic-tabs-container');
                    let origOffsetY = tabContainer.offsetTop;
                    this.tabTop = origOffsetY;
                    document.addEventListener('scroll', () => {
                        window.scrollY >= origOffsetY ? tabContainer.classList.add('sticky') : tabContainer.classList.remove('sticky');
                    });
                },1000);
            },
            changeTab(index,status) {
                // window.scrollTo(0, this.tabTop - 100);
                this.tabActive = index;
                this.$emit('change', status);
            }
        }
    }
</script>

<style scoped lang="scss">
    .basic-tabs-container {
        background: #F4F7FC;
        width: 100%;
        z-index: 999;

        .tabs-content {
            position: relative;

            .item {
                position: relative;
                z-index: 10;
                margin-right: 16px;
                padding: 14px 16px;
                display: inline-block;
                vertical-align: top;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #97A0C3;
                cursor: pointer;
                line-height: 22px;

                &.active {
                    padding: 14px 0;
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
    }

    .sticky {
        position: fixed;
        top: 80px;
        margin-left: -24px;

        .item {
            &:first-child {
                margin-left: 24px;
            }
        }
    }
</style>