<template>
  <a-progress :percent="percent" :strokeColor="styles[`statusFont${this.status}`]" :size="size"/>
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