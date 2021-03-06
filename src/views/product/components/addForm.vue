<template>
    <a-form-model ref="addForm" :model="form" :rules="rules" class="add-from-content">
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-model-item label="产品名称" prop="productName">
                    <a-input placeholder="请输入产品名称" v-model="form.productName"/>
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="产品代号" prop="productCode">
                    <a-input placeholder="请输入产品代号" v-model="form.productCode"/>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-form-model-item label="产品负责人">
            <UserSelectTreeCircle :list="form.masterList" @change="handleChangeMasterList"/>
        </a-form-model-item>
        <a-form-model-item label="产品描述" prop="productDescription">
            <a-textarea v-model="form.productDescription" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入产品描述"/>
        </a-form-model-item>
        <a-form-model-item label="">
            <RelatedSelect title="关联项目" :list="projectList" @change="handleChangeProject"></RelatedSelect>
            <div class="form-related-list">
                <div class="item" v-for="(item,index) in form.projectList" :key="index">
                    <TextToolTip className="left" :content="item.projectName" :refName="'related-item' + index"></TextToolTip>
                    <p @click="handleCancelProject(item)" class="right">取消关联<i class="iconfont iconlianjiezhongduan"></i></p>
                </div>
            </div>
        </a-form-model-item>
        <a-form-model-item label="访问控制">
            <a-radio-group v-model="form.publicFlag">
                <a-radio :style="radioStyle" :value="0">
                    公开(全部成员可访问)
                </a-radio>
                <a-radio :style="radioStyle" :value="1">
                    私有产品(只有产品相关负责人和项目团队成员才能访问)
                </a-radio>
            </a-radio-group>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    import RelatedSelect from "@/components/forms/RelatedSelect";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import UserSelectTreeCircle from "@/components/business/UserSelectTreeCircle";

    export default {
        name: "addForm",
        props: {
            // 表单数据
            form: {
                type: Object,
                default: () => {
                    return {
                        productName: '',
                        productDescription: '',
                        productCode: '',
                        masterList: [],
                        publicFlag: 1,
                        projectList: []
                    }
                }
            }
        },
        components: {UserSelectTreeCircle, TextToolTip, RelatedSelect},
        data() {
            return {
                rules: {
                    productName: [
                        {required: true, message: '请输入产品名称', trigger: 'blur'}
                    ]
                },
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
                projectList: [] // 关联项目列表
            }
        },
        created (){
             this.getProjectList();
        },
        methods: {
            // 获取关联项目列表
            async getProjectList() {
                try {
                    let {code, data} = await this.$api.product.getBindingProjectList();
                    if (code === 0) {
                        if(this.form.id){ //编辑
                            this.projectList = data.map(item => {
                                // 匹配已选中的关联项目
                                let checked = this.form.projectList && this.form.projectList.find(i => item.id == i.projectId);
                                return {
                                    ...item,
                                    checked: checked ? true : false
                                }
                            });
                        }else { //新建
                            this.projectList = data.map(item => {
                                return {
                                    ...item,
                                    checked: false
                                }
                            });
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            // 取消关联项目
            handleCancelProject(item) {
                // 取消已选关联列表
                let index = this.form.projectList.findIndex(i => i.projectId == item.projectId);
                this.form.projectList.splice(index, 1);
                // 切换关联列表选中状态
                this.projectList.forEach((t) => {
                    if (t.id == item.projectId) {
                        t.checked = false;
                        if (this.form.id && item.id) { //编辑
                            // 添加删除的关联项目id
                            this.form.cancelRelIds.push(item.id);
                        }
                    }
                });
            },
            // 切换关联项目
            handleChangeProject(item) {
                if (item.checked) { //添加
                    this.form.projectList.push({
                        projectId: item.id,
                        projectName: item.name
                    });
                } else { //取消
                    let index = this.form.projectList.findIndex(i => i.projectId == item.id);
                    if (this.form.id && this.form.projectList[index].id) { //编辑
                        // 添加删除的关联项目id
                        this.form.cancelRelIds.push(this.form.projectList[index].id);
                    }
                    this.form.projectList.splice(index, 1);
                }
            },
            // 选择产品负责人
            handleChangeMasterList(list) {
              this.form.masterList = list;
            }
        }
    }
</script>

<style scoped lang="scss">
    .add-from-content {
        padding: 24px 24px 0 24px;

        .form-related-list {
            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 8px;
                padding: 0 12px;
                width: 100%;
                height: 40px;
                line-height: 40px;
                background: #F4F7FC;
                border-radius: 4px;

                /deep/ .left {
                    width: 400px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #242F57;
                }

                .right {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #C6CBDE;
                    cursor: pointer;

                    > i {
                        margin-left: 8px;
                        vertical-align: -2px;
                    }
                }
            }
        }
    }
</style>
