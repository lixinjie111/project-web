<template>
    <!-- <vxe-table
      border
      resizable
      ref="xTable"
      :data="tableData">
      <vxe-table-column v-for="(item, index) in setTableField" :key="index"
        :type="item.type" :title="item.title" :field="item.field" :width="item.width"
        :cell-render="{content: item.render, events: {}}">
      </vxe-table-column>
    </vxe-table> -->
    <vxe-grid
        border
        resizable
        ref="table"
        :row-class-name="rowClassName"
        :data="tableData"
        :tree-config ="treeConfig"
        :edit-config="{trigger: 'click', mode: 'cell'}"
        :span-method="spanMethod"
        :columns="setTableColumns">
    </vxe-grid>
</template>

<script>
    export default {
        name: 'BasicTable',
        props: {
            setTableColumns: {
                type: Array,
                required: true,
                default: () => []
            },
            tableData: {
                type: Array,
                required: true,
                default: () => []
            },
            treeConfig: {
                type: Object,
                required: false,
                default: () => {}
            },
            rowClassName: {
                type: String | Function,
                default: ''
            },
            spanMethod: {
                type: Function,
                default: null
            }
        },
        data() {
            return {}
        },
        watch: {
            // 解决数据刷新 默认展开失效
            tableData: {
                handler(){
                    if(this.treeConfig?.expandAll){
                        this.$nextTick(() => this.$refs.table.setAllTreeExpand(true));
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss">
    .vxe-table--tooltip-wrapper {
        &.theme--dark {
            font-size: 14px !important;
            padding: 6px 8px !important;
            background-color: rgba(36, 47, 87, 0.8) !important;
            border-radius: 4px !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;

            &.placement--top {
                .vxe-table--tooltip-arrow {
                    border-top-color: rgba(36, 47, 87, 0.8) !important;

                    &:before {
                        border-top-color: rgba(36, 47, 87, 0.8) !important;
                    }
                }
            }

            &.placement--bottom {
                .vxe-table--tooltip-arrow {
                    border-bottom-color: rgba(36, 47, 87, 0.8) !important;

                    &:before {
                        border-bottom-color: rgba(36, 47, 87, 0.8) !important;
                    }
                }
            }
        }
    }
</style>