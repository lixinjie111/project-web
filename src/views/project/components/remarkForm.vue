<template>
    <a-form-model layout="inline" :ref="name" :model="form" class="remark-form-content">
        <a-form-model-item label="备注" prop="remark">
            <a-textarea v-model="form.remark" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入备注" style="width: 328px;margin-left: 16px;"/>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    export default {
        name: "remarkForm",
        props: {
            name: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                form: {
                    remark: ''
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .remark-form-content {
        /deep/ .ant-form-item {
            margin-right: 0;
        }
    }
</style>
