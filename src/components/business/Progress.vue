<template>
  <a-progress :class="[`statusFont${status}`]" :percent="percent" :strokeColor="styles[`statusFont${status}`]" :size="size" :format="percent => `${percent}%`" />
</template>
<script>
import styles from '@/assets/css/variables.scss'
export default {
  name: 'Progress',
  props: {
    percent:{
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: Number|String,
      required: true,
      default: 0
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      styles
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .ant-progress-status-success .ant-progress-text, /deep/ .ant-progress-text {
  color: rgba(0, 0, 0, 0.45);
}
.ant-progress {
  font-size: 14px !important;
}
</style>