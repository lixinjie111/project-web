<template>
    <div class="report-notarchive-container">
        <div class="header">
            <div class="left">
                <a-radio-group v-model="val" size="large" @change="handelChange">
                    <a-radio-button v-for="(item) in tab" :key="item.type" :value="item.type">{{item.name}}</a-radio-button>
                </a-radio-group>
            </div>
            <div>
                <FlatButton v-if="isInPermission('business_jobproject_add')" @click="handleSet">
                    设置
                    <MyIcon slot="icon" name="iconshezhi"/>
                </FlatButton>
                <a-divider type="vertical" v-if="isInPermission('business_jobproject_add') && isInPermission('business_weekreport_archive') && archiveId"/>
                <FlatButton v-if="isInPermission('business_weekreport_archive') && archiveId" @click="handleArchive">
                    归档
                    <MyIcon slot="icon" name="iconwendangjiazi"/>
                </FlatButton>
            </div>
        </div>
        <router-view class="child-content"></router-view>
        <SetModal v-if="isShow" @modal-cancel="isShow = false"></SetModal>
    </div>
</template>

<script>
    import {isInPermission} from '@/utils/common.js'
    import FlatButton from '@/components/buttons/FlatButton';
    import MyIcon from "@/components/others/MyIcon";
    import SetModal from './notarchive/components/SetModal'

    export default {
        name: "notarchive",
        components: { FlatButton, MyIcon, SetModal},
        data(){
            return {
                val: '',
                tab: [
                    {name: '工作进度', type: 'schedule'},
                    {name: '重点项目', type: 'project'},
                    {name: '月度计划', type: 'plan'},
                    {name: '月度交付物验收', type: 'deliverables'}
                ],
                isShow: false,
            }
        },
        computed: {
            archiveId(){ // 归档id
                return this.$store.state.report.archiveId
            }
        },
        methods: {
            isInPermission,
            handelChange(e) {
                this.$router.push({
                    path: `/report/notarchive/${e.target.value}`,
                    query: {}
                })
            },
            handleSet(){
                this.isShow = true;
            },
            handleArchive(){
                this.$nextTick(() => {
                    this.$confirms({
                        title: '提示',
                        message: `归档后周报内容不支持修改，您确定要归档吗？`,
                        okText: '确认',
                        onOk: async () => {
                            try {
                                let {code} = await this.$api.report.handlePostExecute(this.archiveId);
                                if(code === 0) {
                                    this.$message.success('归档成功！');
                                    this.$store.dispatch('initArchiveId', '');
                                    this.$router.go(0);
                                }
                            }catch(error){
                                console.log(error)
                            }
                        },
                        cancelText: '取消',
                        onCancel() {
                        }
                    });
                });
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
                }else {
                    vm.val = vm.tab[0].type;
                    vm.$router.replace(`${to.path}/${vm.val}`)
                }
            });
        },
        beforeRouteUpdate(to, from, next){
            if(to.path === '/report/notarchive'){
                this.val = this.tab[0].type;
                next(`${to.path}/${this.val}`)
            }else{
                next()
            }
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

            .left {
                display: flex;
                align-items: center;
            }
        }

        .child-content {
            padding: 24px 16px;
        }
    }
</style>