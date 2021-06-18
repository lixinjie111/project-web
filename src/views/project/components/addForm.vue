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
                            :inputReadOnly="true"
                            format="YYYY-MM-DD"
                            placeholder="请选择计划开始日期"/>
                </a-form-model-item>
            </a-col>
            <a-col :span="12">
                <a-form-model-item label="计划截止日期" prop="endTime">
                    <a-date-picker
                            style="width: 100%"
                            v-model="form.endTime"
                            :disabled-date="disabledEndDate"
                            :inputReadOnly="true"
                            format="YYYY-MM-DD"
                            placeholder="请选择计划截止日期"/>
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-form-model-item label="项目负责人">
            <UserSelectTreeCircle :list="form.masterList" @change="handleChangeMasterList"/>
        </a-form-model-item>
        <a-form-model-item label="项目描述" prop="projectDescription">
            <a-textarea v-model="form.projectDescription" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入项目描述"/>
        </a-form-model-item>
        <a-form-model-item label="">
            <RelatedSelect title="关联产品" :list="checkedProductList" @change="handleChangeProduct"></RelatedSelect>
            <div class="form-related-list">
                <div class="item" v-for="(item,index) in form.productList" :key="index">
                    <TextToolTip className="left" :content="item.productName" :refName="'related-item' + index"></TextToolTip>
                    <p @click="handleCancelProduct(item)" class="right">取消关联<i class="iconfont iconlianjiezhongduan"></i></p>
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
        components: {UserSelectTreeCircle, TextToolTip, RelatedSelect},
        props: {
            // 表单数据
            form: {
                type: Object,
                default: () => {
                    return {
                        projectName: '',
                        projectCode: '',
                        beginTime: '',
                        endTime: '',
                        masterList: [],
                        projectDescription: '',
                        productList: [],
                        publicFlag: 0
                    }
                }
            },
            // 关联产品列表
            productList: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                rules: {
                    projectName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ]
                },
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
                checkedProductList: JSON.parse(JSON.stringify(this.productList))
            }
        },
        created (){
            if(this.form.id){ //编辑
                // 关联产品列表选中状态
                this.checkedProductList = this.productList.map(item => {
                    // 匹配已选中的关联产品
                    let checked = this.form.productList && this.form.productList.find(i => item.id == i.productId);
                    return {
                        ...item,
                        checked: checked ? true : false
                    }
                });
            }
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
            // 取消关联产品
            handleCancelProduct(item) {
                // 取消已选关联列表
                let index = this.form.productList.findIndex(i => i.productId == item.productId);
                this.form.productList.splice(index, 1);
                // 切换关联列表选中状态
                this.checkedProductList.forEach((t) => {
                    if (t.id == item.productId) {
                        t.checked = false;
                        if (this.form.id && item.id) { //编辑
                            // 添加删除的关联项目id
                            this.form.cancelRelIds.push(item.id);
                        }
                    }
                });
            },
            // 切换关联产品
            handleChangeProduct(item) {
                if (item.checked) { //添加
                    this.form.productList.push({
                        productId: item.id,
                        productName: item.name
                    });
                } else { //取消
                    let index = this.form.productList.findIndex(i => i.productId == item.id);
                    if (this.form.id && this.form.productList[index].id) { //编辑
                        // 添加删除的关联项目id
                        this.form.cancelRelIds.push(this.form.productList[index].id);
                    }
                    this.form.productList.splice(index, 1);
                }
            },
            // 选择项目负责人
            handleChangeMasterList(list) {
                this.form.masterList = list;
            }
        }
    }
</script>

<style scoped lang="scss">
    .form-related-list {
        max-height: 100px;
        overflow-y: auto;

        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 12px;
            margin-top: 8px;
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
</style>