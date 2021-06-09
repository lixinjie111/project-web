<template>
    <div class="list-container">
        <ListTable :columns="columns" :data="list" class="mt-25" @jump="handelJump">
            <div slot="projectName" slot-scope="data" class="table-status">
                <div class="table-status-bg" :style="'background:' + statusColor(data.row.status)"></div>
                <TextToolTip className="table-name" :content="data.row.projectName"
                             :refName="'table-name' + data.row.index"></TextToolTip>
                <p class="table-status-text">
                    <span class="circle" :style="'background:' + statusColor(data.row.status)"></span>
                    <span class="text" :style="'color:' + statusColor(data.row.status)">{{data.row.statusDesc}}</span>
                </p>
            </div>
            <div slot="progress" slot-scope="data" class="table-progress">
                <div class="table-progress-text">{{data.row.progress}}%</div>
                <a-progress :percent="data.row.progress" :strokeColor="statusColor(data.row.status)"/>
            </div>
            <div slot="action" slot-scope="data" class="table-action">
                <IconToolTip iconName="iconbofang" content="开始" @action="handleStart(data.row)"></IconToolTip>
                <!--<IconToolTip iconName="iconbofang" :disabled="true" content="开始"></IconToolTip>-->
                <!--<IconToolTip iconName="iconyanqi" content="延期" @action="handleDelay(data.row)"></IconToolTip>-->
                <IconToolTip iconName="iconzanting" content="搁置" @action="handlePause(data.row)"></IconToolTip>
                <IconToolTip iconName="iconkaiguan" content="完成" @action="handleFinish(data.row)"></IconToolTip>
                <IconToolTip iconName="iconxiezuo" content="编辑" @action="handleEdit(data.row)"></IconToolTip>
                <IconToolTip iconName="iconshanchu" content="删除" @action="handleDel(data.row)"></IconToolTip>
            </div>
        </ListTable>
        <Pagination v-bind="$attrs" v-on="$listeners" v-if="$attrs.total > $attrs.pageSize"></Pagination>
        <Modal :isShow="showEditModal" :title="editModal.modalTitle" :okText="editModal.okText" :cancelText="editModal.cancelText" headeralgin="left" @modal-sure="handleEditSubmit" @modal-cancel="handleEditCancel">
            <AddForm slot="content"></AddForm>
        </Modal>
        <Modal :width="420" :isShow="showStartModal" :title="startModal.modalTitle" :okText="startModal.okText" :cancelText="startModal.cancelText" headeralgin="left" @modal-sure="handleStartSubmit" @modal-cancel="handleStartCancel">
            <RemarkForm slot="content" name="startForm"></RemarkForm>
        </Modal>
        <Modal :width="420" :isShow="showPauseModal" :title="pauseModal.modalTitle" :okText="pauseModal.okText" :cancelText="pauseModal.cancelText" headeralgin="left" @modal-sure="handlePauseSubmit" @modal-cancel="handlePauseCancel">
            <RemarkForm slot="content" name="pauseForm"></RemarkForm>
        </Modal>
        <Modal :width="420" :isShow="showFinishModal" :title="finishModal.modalTitle" :okText="pauseModal.okText" :cancelText="finishModal.cancelText" headeralgin="left" @modal-sure="handleFinishSubmit" @modal-cancel="handleFinishCancel">
            <RemarkForm slot="content" name="finishForm"></RemarkForm>
        </Modal>
    </div>
</template>

<script>
    import ListTable from "@/components/tables/ListTable";
    import TextToolTip from "@/components/tooltip/TextToolTip";
    import IconToolTip from "@/components/tooltip/IconToolTip";
    import Modal from '@/components/Modal.vue'
    import AddForm from "./addForm";
    import RemarkForm from "./remarkForm";

    export default {
        name: "list",
        components: {RemarkForm, AddForm, Modal, IconToolTip, TextToolTip, ListTable},
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                columns: [
                    {
                        slot: 'projectName',
                        width: '16%',
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
                        key: 'workHour',
                        width: '10%'
                    },
                    {
                        title: '工时/消耗',
                        key: 'usedHour',
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
                        width: '16'
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
                }
            }
        },
        methods: {
            // 设置不同项目状态的颜色
            statusColor(status) {
                switch (status) {
                    // 0：未开始，1：进行中，2：已完成，3：已延期，4：已搁置
                    case 0: //未开始
                        return '#1DCEC3';
                        break;
                    case 1: //进行中
                        return '#0064FF';
                        break;
                    case 2: //已完成
                        return '#7C88B1';
                        break;
                    case 3: //已延期
                        return '#FF4C60';
                        break;
                    default:  //已搁置
                        return '#F9AD69';
                }
            },
            handelJump(item) {
                this.$router.push({ path:'/task/home', query: {id: item.id} });
            },
            // 开始项目
            handleStart(item) {
                this.showStartModal = true;
            },
            // 延期项目
            // handleDelay(item) {
            //
            // },
            // 搁置项目
            handlePause(item) {
                this.showPauseModal = true;
            },
            // 完成项目
            handleFinish(item) {
                this.showFinishModal = true;
            },
            // 编辑项目
            handleEdit(item) {
                this.showEditModal = true;
            },
            // 删除项目
            handleDel(item) {
                this.$confirms({
                    title: '提示',
                    message: `您确定要删除 ${item.projectName} 吗？`,
                    okText: '确认删除',
                    onOk(){

                    },
                    cancelText: '取消',
                    onCancel() {

                    }
                });
            },
            // 编辑项目保存
            handleEditSubmit() {
                this.showEditModal = false;
            },
            // 编辑项目取消
            handleEditCancel() {
                this.showEditModal = false;
            },
            // 开始项目保存
            handleStartSubmit() {
                this.showStartModal = false;
            },
            // 开始项目取消
            handleStartCancel() {
                this.showStartModal = false;
            },
            // 搁置项目保存
            handlePauseSubmit() {
                this.showPauseModal = false;
            },
            // 搁置项目取消
            handlePauseCancel() {
                this.showPauseModal = false;
            },
            // 完成项目保存
            handleFinishSubmit() {
                this.showFinishModal = false;
            },
            // 完成项目取消
            handleFinishCancel() {
                this.showFinishModal = false;
            },
        }
    }
</script>

<style scoped lang="scss">
    .list-container {
        margin-top: 25px;

        /deep/ .item-td {
            cursor: pointer;
        }

        .table-status {
            position: relative;

            .table-status-bg {
                position: absolute;
                left: -24px;
                top: -26px;
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
                .circle {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .text {
                    margin-left: 4px;
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
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
            .icon-tooltip {
                display: inline-block;
                margin-right: 10px;
            }

            /deep/ .iconxiezuo {
                padding-left: 8px;
                border-left: 1px solid #EAEDF7;
            }
        }
    }
</style>