<template>
    <div class="related-select-container">
        <div class="select-title" @click.stop="handleShow">
            <i class="iconfont iconjia"></i>
            <span>{{title}}</span>
        </div>
        <div class="select-options" v-show="isShow" ref="selectOptions">
            <ul>
                <li v-for="(item,index) in listData" :key="index" @click.stop="handleChangeItem(item)">
                    <TextToolTip className="name" :content="item.name" :refName="'related-select-item' + index"></TextToolTip>
                    <i class="iconfont iconxiaoyan1" v-show="item.checked"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import TextToolTip from "../tooltip/TextToolTip";
    export default {
        name: "RelatedSelect",
        components: {TextToolTip},
        data() {
            return {
                selectData: this.selectList,
                listData: this.list,
                isShow: false //下拉列表是否显示
            };
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            // 列表数据
            list: {
                type: Array,
                default: () => []
            },
            // 选中列表
            selectList: {
                type: Array,
                default: () => []
            }
        },
        mounted() {
            // 点击元素外隐藏
            document.addEventListener("click", e => {
                if (this.$refs.selectOptions) {
                    let isSelf = this.$refs.selectOptions.contains(e.target);
                    if (!isSelf) {
                        this.isShow = false;
                    }
                }
            });
        },
        watch: {
            list: {
                handler(newVal, oldVal) {
                    //选中列表
                    this.selectData = newVal.filter(function (item) {
                        return item.checked == true;
                    });
                    //列表书库
                    this.listData = newVal;
                    // 给父组件传值
                    this.$emit("change", this.selectData);
                },
                deep: true
            }
        },
        methods: {
            //控制下拉列表的显示隐藏
            handleShow() {
                this.isShow = this.isShow ? false : true;
            },
            handleChangeItem(item) {
                console.log(111);
                console.log(item);
                item.checked = item.checked ? false : true;
            }
        }
    }
</script>


<style scoped lang="scss">
    .related-select-container {
        position: relative;

        .select-title {
            padding: 0 8px;
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
            border: 1px solid #C6CBDE;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #2373FF;
            cursor: pointer;

            >i {
               vertical-align: -1px;
            }
        }

        .select-options {
            position: absolute;
            top: 40px;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 200px;
            overflow-y: auto;
            background: #FFF;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, .15);

            > ul {
                > li {
                    position: relative;
                    padding: 10px 24px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #242F57;
                    line-height: 20px;
                    cursor: pointer;

                    /deep/ .name {
                        margin-right: 24px;
                    }

                    > i {
                        position: absolute;
                        right: 24px;
                        top: 10px;
                        color: #2373FF;
                    }

                    &:hover {
                        background: #F4F7FC;
                    }
                }
            }
        }
    }
</style>