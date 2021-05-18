<template>
    <div class="list-table-container">
        <div class="item-tr" v-for="(dataItem,dataIndex) in data" :key="dataIndex">
            <div class="item-td" v-for="(columnsItem,columnsIndex) in columns" :key="columnsIndex"
                 :style="{width:columnsItem.width}">
                <template v-if="columnsItem.key == 'index'">
                    <div class="item-td-index">{{dataIndex + 1}}</div>
                </template>
                <template v-if="columnsItem.slot">
                    <slot :name="columnsItem.slot" :row="{...dataItem,index:dataIndex}"></slot>
                </template>
                <template v-else>
                    <div class="item-td-value">{{dataItem[columnsItem.key]}}</div>
                    <div class="item-td-title">{{columnsItem.title}}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListTable",
        props: {
            columns: {
                type: Array,
                default: () => []
            },
            data: {
                type: Array,
                default: () => []
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

                .item-td-value {
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