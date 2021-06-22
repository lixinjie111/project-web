<template>
  <a-modal :visible="isShow"
    :width="Number(width)" :closable="closable" :centered="true" :destroyOnClose="true"
    @ok="handleOk" @cancel="handleCancel">
    <div slot="closeIcon" class="iconfont iconguanbi"></div>

    <div slot="title" class="modal-header">
      <div v-if="title" :class="headeralgin">{{title}}</div>
      <slot name="title"></slot>
    </div>

    <slot name="content"></slot>

    
    <div slot="footer" class="footer">
      <a-button class="back" type="link" @click="handleCancel">{{cancelText}}</a-button>
      <a-button class="submit" type="primary" @click="handleOk"><span>{{okText}}</span></a-button>
    </div>
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
  methods: {
    handleOk() {
      this.$emit('modal-sure');
    },
    handleCancel(){
      this.$emit('modal-cancel')
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 16px;
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
.footer {
  padding: 6px 8px;
  .back {
    color: #636E95;
  }
  .submit{
    min-width: 96px;
  }
}
</style>
