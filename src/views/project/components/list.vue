<template>
    <div class="list-container">
        <ListTable :columns="columns" :data="list" @jump="handelJump">
            <div slot="projectName" slot-scope="data" class="table-status">
                <div class="table-status-bg" :style="'background:' + styles[`statusFont${data.row.status}`]"></div>
                <TextToolTip className="table-name" :content="data.row.projectName"
                             :refName="'table-name' + data.row.index"></TextToolTip>
                <p class="table-status-text">
                    <span class="circle" :style="'background:' + styles[`statusFont${data.row.status}`]"></span>
                    <span class="text" :style="'color:' + styles[`statusFont${data.row.status}`]">{{data.row.statusDesc}}</span>
                    <IconToolTip v-if="data.row.remark" class="table-tip" iconName="icontishi" :content="data.row.remark"></IconToolTip>
                </p>
            </div>
            <div slot="progress" slot-scope="data" class="table-progress">
                <div class="table-progress-text">{{data.row.progress}}%</div>
                <Progress :percent="Number(data.row.progress)" :status="data.row.status"/>
            </div>
            <div slot="action" slot-scope="data" class="table-action">
                <!--未开始的可以开始，搁置的不能搁置，完成的的不能完成、删除、搁置-->
                <IconToolTip iconName="iconbofang" :disabled="data.row.status > 0" content="开始" @action="handleStart(data.row)" v-if="isInPermission('business_product_operate')"></IconToolTip>
                <!--<IconToolTip iconName="iconyanqi" content="延期" @action="handleDelay(data.row)"></IconToolTip>-->
                <IconToolTip iconName="iconzanting" :disabled="data.row.status == 2 || data.row.status == 4" content="搁置" @action="handlePause(data.row)" v-if="isInPermission('business_product_operate')"></IconToolTip>
                <IconToolTip iconName="iconkaiguan" :disabled="data.row.status == 2" content="完成" @action="handleFinish(data.row)" v-if="isInPermission('business_product_operate')"></IconToolTip>
                <a-divider type="vertical" v-if="isInPermission('business_product_operate')"/>
                <IconToolTip iconName="iconxiezuo" content="编辑" @action="handleEdit(data.row)" v-if="isInPermission('business_project_edit')"></IconToolTip>
                <IconToolTip iconName="iconshanchu" :disabled="data.row.status == 2" content="删除" @action="handleDel(data.row)" v-if="isInPermission('business_project_del')"></IconToolTip>
            </div>
        </ListTable>
        <Pagination v-bind="$attrs" v-on="$listeners" v-if="$attrs.total > $attrs.pageSize"></Pagination>
        <Modal :isShow="showEditModal" :title="editModal.modalTitle" :okText="editModal.okText" :cancelText="editModal.cancelText" headeralgin="left" @modal-sure="handleEditSubmit" @modal-cancel="handleEditCancel">
            <AddForm ref="addForm" slot="content" :form="form" :productList="productList"></AddForm>
        </Modal>
        <Modal :width="420" :isShow="showStartModal" :title="startModal.modalTitle" :okText="startModal.okText" :cancelText="startModal.cancelText" headeralgin="left" @modal-sure="handleStartSubmit" @modal-cancel="handleStartCancel">
            <RemarkForm slot="content" name="startForm" ref="startForm"></RemarkForm>
        </Modal>
        <Modal :width="420" :isShow="showPauseModal" :title="pauseModal.modalTitle" :okText="pauseModal.okText" :cancelText="pauseModal.cancelText" headeralgin="left" @modal-sure="handlePauseSubmit" @modal-cancel="handlePauseCancel">
            <RemarkForm slot="content" name="pauseForm" ref="pauseForm"></RemarkForm>
        </Modal>
        <Modal :width="420" :isShow="showFinishModal" :title="finishModal.modalTitle" :okText="finishModal.okText" :cancelText="finishModal.cancelText" headeralgin="left" @modal-sure="handleFinishSubmit" @modal-cancel="handleFinishCancel">
            <RemarkForm slot="content" name="finishForm" ref="finishForm"></RemarkForm>
        </Modal>
    </div>
</template>

<script>
    import ListTable from "@/components/tables/ListTable";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import IconToolTip from "@/components/tooltip/IconToolTip";
    import Progress from "@/components/business/Progress"
    import Modal from '@/components/Modal/Modal.vue'
    import AddForm from "./addForm";
    import RemarkForm from "./remarkForm";
    import {formatDate} from '@/utils/common.js'
    import {isInPermission} from '@/utils/common.js';
    import styles from '@/assets/css/variables.scss'

    export default {
        name: "list",
        components: {RemarkForm, AddForm, Modal, IconToolTip, TextToolTip, ListTable, Progress},
        props: {
            list: {
                type: Array,
                default: () => []
            },
            productList: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                styles,
                columns: [
                    {
                        slot: 'projectName',
                        width: '17%',
                        ellipsis: true
                    },
                    {
                        title: '项目负责人',
                        key: 'projectMaster',
                        width: '16%',
                        ellipsis: true
                    },
                    {
                        title: '截止时间',
                        key: 'endTime',
                        width: '12%'
                    },
                    {
                        title: '工时/预计',
                        key: 'planHour',
                        width: '10%'
                    },
                    {
                        title: '工时/消耗',
                        key: 'actualHour',
                        width: '10%'
                    },
                    {
                        title: '工时/剩余',
                        key: 'restHour',
                        width: '10%'
                    },
                    {
                        slot: 'progress',
                        width: '10%'
                    },
                    {
                        slot: 'action',
                        width: '15%'
                    }
                ],
                showEditModal: false,
                editModal: {
                    modalTitle: '编辑项目',
                    okText:'保存',
                    cancelText:'取消'
                },
                showStartModal: false,
                startModal: {
                    modalTitle: '开始项目',
                    okText:'开始',
                    cancelText:'取消'
                },
                showPauseModal: false,
                pauseModal: {
                    modalTitle: '搁置项目',
                    okText:'搁置',
                    cancelText:'取消'
                },
                showFinishModal: false,
                finishModal: {
                    modalTitle: '完成项目',
                    okText:'完成',
                    cancelText:'取消'
                },
                form: {},
                startItem: {},
                pauseItem: {},
                finishItem: {},
            }
        },
        methods: {
            isInPermission,
            handelJump(item) {
                this.$router.push({ path:'/task/home', query: {id: item.id} });
            },
            // 开始项目
            handleStart(item) {
                this.showStartModal = true;
                this.startItem = item;
            },
            // 延期项目
            // handleDelay(item) {
            //
            // },
            // 搁置项目
            handlePause(item) {
                this.showPauseModal = true;
                this.pauseItem = item;
            },
            // 完成项目
            handleFinish(item) {
                this.showFinishModal = true;
                this.finishItem = item;
            },
            // 编辑项目
            async handleEdit(item) {
                try {
                    let {code, data} = await this.$api.project.getProjectDetail(item.id);
                    if(code === 0){
                        this.form = {...data, cancelRelIds: []};
                        this.showEditModal = true;
                    }
                }catch(error){
                    console.log(error)
                }
            },
            // 删除项目
            handleDel(item) {
                this.$confirms({
                    title: '提示',
                    message: `您确定要删除 ${item.projectName} 吗？`,
                    okText: '确认删除',
                    onOk: async () => {
                        try {
                            let {code} = await this.$api.project.delProject(item.id);
                            if(code === 0){
                                this.$message.success('删除成功！');
                                this.$parent.resetList();
                            }else{
                                this.$message.error('删除失败！');
                            }
                        }catch(error){
                            console.log(error)
                        }
                    },
                    cancelText: '取消',
                    onCancel() {

                    }
                });
            },
            // 编辑项目保存
            async handleEditSubmit() {
                this.$refs.addForm.$refs.addForm.validate(async (valid) => {
                    if (valid) {
                        let params = this.$refs.addForm.$refs.addForm.model;
                        params.beginTime = formatDate(params.beginTime);
                        params.endTime = formatDate(params.endTime,'end');
                        let {code} = await this.$api.project.editProject(params);
                        if(code === 0){
                            this.$parent.resetList();
                            this.showEditModal = false;
                        }
                    } else {
                        console.log('提交失败!');
                        return false;
                    }
                });
            },
            // 编辑项目取消
            handleEditCancel() {
                this.showEditModal = false;
            },
            // 开始项目保存
            async handleStartSubmit() {
                try {
                    let remark = this.$refs.startForm.$refs.startForm.model.remark;
                    let {code} = await this.$api.project.startProject(this.startItem.id, remark);
                    if(code === 0){
                        this.$message.success('开始成功！');
                        this.$parent.resetList();
                        this.showStartModal = false;
                    }
                }catch(error){
                    console.log(error);
                }
            },
            // 开始项目取消
            handleStartCancel() {
                this.showStartModal = false;
            },
            // 搁置项目保存
            async handlePauseSubmit() {
                try {
                    let remark = this.$refs.pauseForm.$refs.pauseForm.model.remark;
                    let {code} = await this.$api.project.suspendProject(this.pauseItem.id, remark);
                    if(code === 0){
                        this.$message.success('搁置成功！');
                        this.$parent.resetList();
                        this.showPauseModal = false;
                    }
                }catch(error){
                    console.log(error);
                }
            },
            // 搁置项目取消
            handlePauseCancel() {
                this.showPauseModal = false;
            },
            // 完成项目保存
            async handleFinishSubmit() {
                try {
                    let remark = this.$refs.finishForm.$refs.finishForm.model.remark;
                    let {code} = await this.$api.project.closeProject(this.finishItem.id, remark);
                    if(code === 0){
                        this.$message.success('完成成功！');
                        this.$parent.resetList();
                        this.showFinishModal = false;
                    }
                }catch(error){
                    console.log(error);
                }
            },
            // 完成项目取消
            handleFinishCancel() {
                this.showFinishModal = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .list-container {
        /deep/ .item-tr {
            .item-td {
                cursor: pointer;

                &:first-child {
                    border-right: 1px solid #EAEDF7;
                }
            }
        }

        .table-status {
            position: relative;

            .table-status-bg {
                position: absolute;
                left: -24px;
                top: -24px;
                width: 4px;
                height: 96px;
                border-radius: 4px 0 0 4px;
            }

            /deep/ .table-name {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #242F57;
            }

            .table-status-text {
                height: 24px;
                line-height: 24px;

                .circle {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .text {
                    margin-left: 4px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                }

                /deep/ .table-tip{
                    display: inline-block;
                    margin-left: 6px;
                    vertical-align: -1px;
                }
            }
        }

        .table-progress {
            .table-progress-text {
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #242F57;
            }

            /deep/ .ant-progress-text {
                display: none;
            }

            /deep/ .ant-progress-show-info .ant-progress-outer {
                margin-right: 0;
                padding-right: 0;
            }
        }

        .table-action {
            display: flex;
            justify-content: center;
            align-items: center;

            .icon-tooltip {
                display: inline-block;

                /deep/ > i {
                    padding: 6px;
                }
            }

            /deep/ .ant-divider {
                background: #EAEDF7;
            }
        }
    }
</style>