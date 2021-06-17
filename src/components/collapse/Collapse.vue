<template>
    <div class="collapse-container">
        <div :class="['collapse-header', show ? '' : 'collapse-header-bg']" @click="handleOpen">
            <i :class="['iconfont', 'iconyoujiantou-fang', show ? 'down' : 'right']"></i>
            <span>{{title}}</span>
        </div>
        <transition name="fade">
            <div class="collapse-content" v-show="show">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Collapse",
        data() {
            return {
                show: true
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            handleOpen() {
                this.show = this.show ? false : true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .collapse-container {
        margin-bottom: 26px;
        cursor: pointer;

        .collapse-header {
            padding: 10px 16px;

            &.collapse-header-bg {
                background: #E7E9F2;
            }

            > i {
                margin-right: 10px;
                font-size: 15px;
                color: #7C88B1;

                &.down {
                    display: inline-block;
                    transform: rotate(90deg);
                }

                &.right {
                    display: inline-block;
                    transform: rotate(0deg);
                }
            }

            > span {
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #7C88B1;
            }
        }

        .collapse-content {
            cursor: default;
        }

        .fade-enter-active {
            transition: all .2s ease;
        }

        .fade-leave-active {
            transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }
</style>