<template>
  <a-popover trigger="click" v-model="visible" placement="bottomLeft">
    <TwoValue :title="showDate" :subtitle="title" class="btn">
      <i class="iconfont" :class="icon"></i>
    </TwoValue>
      <template slot="content">
        <a-calendar :fullscreen="false" @select="handleSelect" />
      </template>
  </a-popover>
</template>

<script>
  import TwoValue from "./TwoValue";
  import moment from "moment";

  export default {
    name: "DateSelect",
    props: ['title', 'icon'],
    components: {TwoValue},
    data() {
      return {
        date: null,
        visible: false,
      }
    },
    computed: {
      showDate() {
        if (!this.date)
          return '----';
        return moment(this.date).format('MM月DD日');
      }
    },
    methods: {
      handleSelect(val) {
        this.date = val;
        this.visible = false;
        this.$emit('select', val);
      }
    }
  }
</script>

<style lang="scss" scoped>
.btn {
  cursor: default;
}
</style>
