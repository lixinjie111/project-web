<template>
    <div class="archive-container">
        <TaskMenu @change="handleProjectChange"/>
        <div class="archive-title">
            <ContentHeader type="title" title="附件库"></ContentHeader>
        </div>
        <div class="archive-content">
            <BasicTable :tableData="tableData" :setTableColumns="setTableColumns"></BasicTable>
            <Pagination v-if="total > pageSize" :total="total" :curPageNum="curPageNum" :pageSize="pageSize" @pagination-change-pagesize="handleChangePageSize" @pagination-change-page="handleChangePage"></Pagination>
        </div>
    </div>
</template>
<script>
    import BasicTable from '@/components/tables/BasicTable.vue'
    import TaskMenu from "./components/menu";

    export default {
        name: 'archive',
        components: {TaskMenu, BasicTable},
        data() {
            return {
                total: null, // 总数据条数
                pageSize: 10, // 页面数据size
                curPageNum: 1, // 当前页码
                tableData: [],
                setTableColumns: [
                    {
                        title: '序号',
                        field: 'id',
                        width: 60
                    },
                    {
                        title: '附件名',
                        field: 'name'
                    },
                    {
                        title: '地址',
                        field: 'link',
                        width: 280,
                        showOverflow: true
                    },
                    {
                        title: '类型',
                        field: 'attchmentType',
                        width: 120

                    },
                    {
                        title: '大小',
                        field: 'size',
                        width: 120
                    },
                    {
                        title: '上传人',
                        field: 'createdBy',
                        width: 200,
                        showOverflow: true
                    },
                    {
                        title: '添加时间',
                        field: 'createdTime'
                    },
                    {
                        title: '操作',
                        width: '110',
                        slots: {
                            default: ({row}) => {
                                return [
                                    <div class="operations">
                                        <a href={row.link} download target="_blank"><span class="iconfont iconxiazai"></span></a>
                                        <span class="iconfont iconshanchu" onClick={() => this.handleDel(row)}></span>
                                    </div>
                                ]
                            }
                        }
                    },
                ]
            }
        },
        created() {
            this.getAttachmentList();
        },
        computed: {
            projectId() {
                return parseInt(this.$route.query.id)
            }
        },
        methods: {
            handleProjectChange() {
                this.getAttachmentList();
            },
            // 切换条目数量
            handleChangePageSize(pageSize, pageNum) {
                console.log(pageSize)
                this.pageSize = pageSize;
                if(pageNum) this.curPageNum = pageNum;
                this.getAttachmentList();
            },
            // 切换当前页码
            handleChangePage(pageNum){
                this.curPageNum = pageNum;
                this.getAttachmentList();
            },
            // 查询项目附件列表
            async getAttachmentList(){
                try {
                    let {code, data} = await this.$api.task.getProjectAttachmentList(this.curPageNum, this.pageSize, this.projectId);
                    if(code === 0) {
                        let {total, records} = data;
                        this.total = total;
                        this.tableData = records;
                    }
                } catch (error) {
                    console.log(error)
                }
            },
            // 删除项目附件
            handleDel(item) {
                this.$confirms({
                    title: '提示',
                    message: `您确定要删除 ${item.name} 吗？`,
                    okText: '确认删除',
                    onOk: async () => {
                        try {
                            let {code} = await this.$api.task.delProjectAttachment(item.id);
                            if(code === 0){
                                this.$message.success('删除成功！');
                                this.getAttachmentList();
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
        }
    }
</script>
<style lang="scss" scoped>
    .archive-container {
        .archive-title {
            padding: 0 24px;
        }

        .archive-content {
            padding: 0 24px;

            .operations {
                .iconfont {
                    color: #999;

                    &.iconxiazai {
                        margin-right: 12px;
                    }
                }
            }
        }
    }
</style>