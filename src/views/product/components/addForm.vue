<template>
    <a-form-model ref="addForm" :model="form" :rules="rules">
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
            <UserSelect v-model="form.productMaster" />
        </a-form-model-item>
        <a-form-model-item label="产品描述" prop="productDescription">
            <a-textarea v-model="form.productDescription" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入产品描述"
                        :maxLength="100"/>
        </a-form-model-item>
        <a-form-model-item label="">
            <RelatedSelect title="关联项目" :list="projectList" :selectList="form.projectList" @change="handleChangeProject"></RelatedSelect>
            <div class="form-related-list" v-for="(item,index) in form.projectList" :key="index">
                <div class="item">
                    <TextToolTip className="left" :content="item.name" :refName="'related-item' + index"></TextToolTip>
                    <p @click="handleCancelProject(item)" class="right">取消关联<i class="iconfont iconlianjiezhongduan"></i></p>
                </div>
            </div>
        </a-form-model-item>
        <a-form-model-item label="访问控制">
            <a-radio-group v-model="form.publicFlag" @change="handleChangePublic">
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
    import UserSelect from "@/components/business/UserSelect";

    export default {
        name: "addForm",
        components: {UserSelect, TextToolTip, RelatedSelect},
        data() {
            return {
                rules: {
                    productName: [
                        {required: true, message: '请输入产品名称', trigger: 'blur'}
                    ]
                },
                form: {
                    productName: '',
                    productDescription: '',
                    productCode: '',
                    productMaster: [],
                    publicFlag: 0,
                    projectList: []
                },
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                }
            }
        },
        created() {
            this.handleGetList();
        },
        computed: {
            projectList(){
                return [
                    {
                        id: 1,
                        name: "Meta-X"
                    },
                    {
                        id: 2,
                        name: "Sophia"
                    }
                ]
            },
        },
        methods: {
            handleGetList() {
                this.projectList.forEach((item)=>{
                    if (item.id == 1){
                        item.checked = true;
                    }else {
                        item.checked = false;
                    }
                });
            },
            handleChangePublic() {

            },
            handleCancelProject(item) {
                let index = this.form.projectList.findIndex(text => text.id === item.id);
                this.form.projectList.splice(index, 1);
                this.projectList.forEach((value)=>{
                    if(value.id == item.id) {
                        value.checked = false;
                    }
                })
            },
            handleChangeProject(list) {
                this.form.projectList =  list;
            },
        }
    }
</script>

<style scoped lang="scss">
.form-related-list {
    margin-top: 8px;

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #F4F7FC;
        border-radius: 4px;

        /deep/ .left {
            width: 450px;
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

            >i {
              margin-left: 8px;
              vertical-align: -2px;
            }
        }
    }
}
</style>