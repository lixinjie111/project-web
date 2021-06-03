<template>
    <div class="report-notarchive-container">
        <div class="header">
            <div class="left">
                <a-radio-group v-model="val" size="large" @change="handelChange">
                    <a-radio-button v-for="(item) in tab" :key="item.type" :value="item.type">{{item.name}}</a-radio-button>
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
        data(){
            return {
                val: '',
                tab: [
                    {name: '工作进度', type: 'schedule'},
                    {name: '重点项目', type: 'project'},
                    {name: '月度计划', type: 'plan'},
                    {name: '月度交付物验收', type: 'deliverables'}
                ]
            }
        },
        methods: {
            handelChange(e) {
                this.$router.push({
                    path: `/report/notarchive/${e.target.value}`,
                    query: {}
                })
            }
        },
        beforeRouteEnter(to, from, next) {
            let reg = /\/(\S{0,})\/(\S{0,})\/(\S{0,})/ig;
            console.log(to.path, RegExp.$1, RegExp.$2, RegExp.$3)
            
            next(vm => {
                //因为当钩子执行前，组件实例还没被创建
                // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
                if(reg.test(to.path)) {
                    vm.val = RegExp.$3;
                    vm.$router.push(to.path)
                }else {
                    vm.val = vm.tab[0].type;
                    vm.$router.push(`${to.path}/${vm.val}`)
                }
            });
            
        }
    }
</script>

<style scoped lang="scss">
    .report-notarchive-container {
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
        }
    }
</style>