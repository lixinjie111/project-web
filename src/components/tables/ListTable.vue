<template>
    <div class="list-table-container">
        <template v-if="data.length">
            <div class="item-tr" v-for="(dataItem,dataIndex) in data" :key="dataIndex" @click="handleJump(dataItem)">
                <div class="item-td" v-for="(columnsItem,columnsIndex) in columns" :key="columnsIndex"
                     :style="{width: columnsItem.width}">
                    <template v-if="columnsItem.key == 'index'">
                        <div class="item-td-index">{{dataIndex + 1}}</div>
                    </template>
                    <template v-else-if="columnsItem.slot">
                        <slot :name="columnsItem.slot" :row="{...dataItem,ellipsis: columnsItem.ellipsis,index:dataIndex}"></slot>
                    </template>
                    <template v-else>
                        <TextToolTip v-if="columnsItem.ellipsis" className="item-td-value" :content="dataItem[columnsItem.key]"
                                     :refName="'tip' + dataIndex + columnsIndex"
                                     :ellipsis="columnsItem.ellipsis"></TextToolTip>
                        <div v-else class="item-td-value">{{dataItem[columnsItem.key]||'-'}}</div>
                        <div class="item-td-title">{{columnsItem.title}}</div>
                    </template>
                </div>
            </div>
        </template>
        <template v-else>
            <NoData title="暂无数据"></NoData>
        </template>
    </div>
</template>

<script>
    import TextToolTip from "../tooltip/TextToolTip";
    import NoData from "../others/NoData";

    export default {
        name: "ListTable",
        components: {NoData, TextToolTip},
        props: {
            // 表格列名
            columns: {
                type: Array,
                default: () => []
            },
            // 表格数据
            data: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            handleJump(item) {
                this.$emit('jump',item);
            }
        }
    }
</script>

<style scoped lang="scss">
    .list-table-container {
        .item-tr {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            padding: 24px;
            width: 100%;
            height: 96px;
            background: #FFFFFF;
            box-shadow: 0px 0px 8px 0px rgba(124, 136, 177, 0.12);
            border-radius: 8px;

            .item-td {
                padding: 0 24px;
                border-right: 1px solid #EAEDF7;

                .item-td-index {
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #242F57;
                }

                /deep/ .item-td-value {
                    font-size: 16px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #242F57;
                }

                .item-td-title {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #7C88B1;
                }

                &:first-child {
                    padding-left: 0;
                    border-right: none;
                }

                &:last-child {
                    padding-right: 0;
                    border-right: none;
                }
            }
        }
    }
</style>
