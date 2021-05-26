<template>
    <a-form-model ref="addForm" :model="form" :rules="rules">
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-model-item label="项目名称" prop="projectName">
                    <a-input placeholder="请输入项目名称" v-model="form.projectName"/>
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="项目代号" prop="projectCode">
                    <a-input placeholder="请输入项目代号" v-model="form.projectCode"/>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-row :gutter="16">
            <a-col :span="12">
                <a-form-model-item label="计划开始日期" prop="beginTime">
                    <a-date-picker
                            style="width: 100%"
                            v-model="form.beginTime"
                            :disabled-date="disabledStartDate"
                            format="YYYY-MM-DD"
                            placeholder="请选择计划开始日期"
                    />
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="计划截止日期" prop="endTime">
                    <a-date-picker
                            style="width: 100%"
                            v-model="form.endTime"
                            :disabled-date="disabledEndDate"
                            format="YYYY-MM-DD"
                            placeholder="请选择计划截止日期"
                    />
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-form-model-item label="项目负责人">
            <UserSelect v-model="form.projectMaster"/>
        </a-form-model-item>
        <a-form-model-item label="项目描述" prop="projectDescription">
            <a-textarea v-model="form.projectDescription" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入项目描述"/>
        </a-form-model-item>
        <a-form-model-item label="">
            <RelatedSelect title="关联产品" :list="productList" :selectList="form.productList"
                           @change="handleChangeProject"></RelatedSelect>
            <div class="form-related-list" v-for="(item,index) in form.productList" :key="index">
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
                    projectName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ]
                },
                form: {
                    projectName: '',
                    projectDescription: '',
                    projectCode: '',
                    projectMaster: [],
                    publicFlag: 0,
                    productList: [],
                    beginTime: null,
                    endTime: null
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
            productList() {
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
            disabledStartDate(startValue) {
                const endValue = this.form.endTime;
                if (!startValue || !endValue) {
                    return false;
                }
                return startValue.valueOf() > endValue.valueOf();
            },
            disabledEndDate(endValue) {
                const startValue = this.form.beginTime;
                if (!endValue || !startValue) {
                    return false;
                }
                return startValue.valueOf() >= endValue.valueOf();
            },
            handleGetList() {
                this.productList.forEach((item) => {
                    if (item.id == 1) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                });
            },
            handleChangePublic() {

            },
            handleCancelProject(item) {
                let index = this.form.productList.findIndex(text => text.id === item.id);
                this.form.productList.splice(index, 1);
                this.productList.forEach((value) => {
                    if (value.id == item.id) {
                        value.checked = false;
                    }
                })
            },
            handleChangeProject(list) {
                this.form.productList = list;
            }
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

                > i {
                    margin-left: 8px;
                    vertical-align: -2px;
                }
            }
        }
    }
</style>