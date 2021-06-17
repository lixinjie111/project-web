<template>
  <a-modal :visible="isShow"
    :body-style="bodyStyle"
    :width="Number(width)" :closable="closable" :centered="true" :destroyOnClose="true"
    :footer="null" @cancel="handleCancel">
    <div slot="closeIcon" class="iconfont iconshanchu_xiao"></div>

    <div slot="title" class="modal-header">
      <div v-if="title" :class="headeralgin">{{title}}</div>
      <slot name="title"></slot>
    </div>
    
    <slot name="content"></slot>
  </a-modal>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    width: { // modal 宽度
      type: String | Number,
      default: 600
    },
    bodyStyle: {
      type: Object,
      default: () => {}
    },
    headeralgin: { // title支持两种对齐 left center right
      type: String,
      default: 'left'
    },
    title: { // 是否有title
      type: String,
      default: ''
    },
    closable: { // 是否显示关闭按钮
      type: Boolean,
      default: true
    },
  },
  methods: {
    handleCancel(){
      this.$emit('modal-cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
  color: #636E95;
}
.modal-header {
  > div {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #242F57;
    &.left {
      text-align: left;
    }
    &.center {
      text-align: center;
    }
    &.right {
      text-align: right;
    }
  }
}
/deep/ .ant-modal-content {
  border-radius: 8px;
  .ant-modal-header {
    border-radius: 8px 8px 0 0;
  }
}
</style>
