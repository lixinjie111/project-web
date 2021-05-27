<template>
    <div class="icon-tooltip" :class="className">
        <a-tooltip :destroyTooltipOnHide="true">
            <span slot="title">{{content}}</span>
            <i :class="['iconfont', iconName, disabled ? 'disabled' : '']" @click="handleAction"></i>
        </a-tooltip>
    </div>
</template>

<script>
    export default {
        name: 'IconToolTip',
        props: {
            // 显示的文字内容
            content: {
                type: String,
                default: () => {
                    return ''
                }
            },
            // iconfont名称
            iconName: {
                type: String,
                default: () => {
                    return ''
                }
            },
            // 外层框的样式 需要加/deep/
            className: {
                type: String,
                default: () => {
                    return ''
                }
            },
            // 是否可点击
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleAction() {
                this.$emit('action');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .icon-tooltip {
        > i {
            cursor: pointer;
            color: #7C88B1;
            font-size: 16px;

            &.disabled {
                color: #C6CBDE;
            }
        }
    }
</style>