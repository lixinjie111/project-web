<template>
    <div>
        <div class="header">
            <div class="left">
                <a-radio-group default-value="a" size="large" @change="handelChange">
                    <a-radio-button value="schedule" class="all">
                        工作进度
                    </a-radio-button>
                    <a-radio-button value="project">
                        重点项目
                    </a-radio-button>
                    <a-radio-button value="plan">
                        月度计划
                    </a-radio-button>
                    <a-radio-button value="deliverables">
                        月度交付物验收
                    </a-radio-button>
                </a-radio-group>
            </div>
            <div>
                <FlatButton>
                    设置
                    <MyIcon slot="icon" name="iconshezhi"/>
                </FlatButton>
                <a-divider type="vertical" />
                <FlatButton>
                    归档
                    <MyIcon slot="icon" name="iconwendangjiazi"/>
                </FlatButton>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import FlatButton from '@/components/buttons/FlatButton';
    import MyIcon from "@/components/others/MyIcon";

    export default {
        name: "notarchive",
        components: { FlatButton, MyIcon},
        methods: {
            handelChange(e) {
                // console.log(e.target.value);
                this.$router.push({
                    path: `/report/notarchive/${e.target.value}`,
                    query: {}
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        border-top: 1px solid #EAEDF7;
        border-bottom: 1px solid #EAEDF7;
        padding: 0 8px;
        margin-bottom: 16px;

        .left {
            display: flex;
            align-items: center;
        }
        .all {
            span {
                line-height: 16px;
                border-radius: 4px;
                border: 1px solid #EAEDF7;
                padding: 0 8px;
                width: 8px;
                height: 16px;
                font-size: 12px;
                font-weight: 400;
                color: #242F57;
                margin-left: 4px;
            }
        }
    }
</style>