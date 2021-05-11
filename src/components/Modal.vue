<template>
  <a-modal v-model="isShow" 
    :width="width" :closable="closable" 
    :okText="okText" :okType="okType" :cancelText="cancelText" :cancelType="cancelType"
    @ok="handleOk">
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
    cancelText: { // 取消按钮文案
      type: String,
      default: ''
    },
    cancelType: {
      type: String,
      default: 'text'
    },
    okText: { // 确定按钮文案
      type: String,
      default: ''
    },
    okType: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    handleOk() {
      this.$emit('modal-sure')
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>