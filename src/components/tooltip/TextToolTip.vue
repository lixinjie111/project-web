<template>
    <div class="text-tooltip">
        <a-tooltip :visible="isShowTooltip">
            <span slot="title">{{content}}</span>
            <p :class="['over-flow', className]" @mouseenter="onMouseEnter(refName)" @mouseleave="onMouseLeave()">
                <span :ref="refName">{{content||'-'}}</span>
            </p>
        </a-tooltip>
    </div>
</template>

<script>
    export default {
        name: 'TextToolTip',
        props: {
            // 显示的文字内容
            content: {
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
            // 文字标识，在同一页面中调用多次组件，此参数不可重复
            refName: {
                type: String,
                default: () => {
                    return ''
                }
            }
        },
        data() {
            return {
                isShowTooltip: false
            }
        },
        methods: {
            onMouseEnter(ref) {
                let parentWidth = this.$refs[ref].parentNode.offsetWidth;
                let contentWidth = this.$refs[ref].offsetWidth;
                if (contentWidth > parentWidth) {
                    this.isShowTooltip = true;
                } else {
                    this.isShowTooltip = false;
                }
            },
            onMouseLeave() {
                this.isShowTooltip = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .text-tooltip {
        .over-flow {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>