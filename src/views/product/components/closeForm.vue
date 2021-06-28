<template>
    <a-form-model layout="inline" ref="closeForm" :model="form" class="close-form-content">
        <a-form-model-item label="备注" prop="remark">
            <a-textarea v-model="form.remark" :autoSize='{ minRows: 4, maxRows: 6}' placeholder="请输入备注" style="width: 328px;margin-left: 16px;"/>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
    export default {
        name: "closeForm",
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
.close-form-content {
    /deep/ .ant-form-item {
        margin-right: 0;
    }
}
</style>
