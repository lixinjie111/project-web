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

        </a-form-model-item>
        <a-form-model-item label="产品描述" prop="productDescription">
            <a-textarea v-model="form.productDescription" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入产品描述"
                        :maxLength="100"/>
        </a-form-model-item>
        <a-form-model-item label="访问控制">
            <a-radio-group v-model="form.publicFlag" @change="onChange">
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
    export default {
        name: "addForm",
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
                    publicFlag: 0
                },
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                },
            }
        },
        methods: {
            onChange() {

            }
        }
    }
</script>

<style scoped lang="scss">

</style>