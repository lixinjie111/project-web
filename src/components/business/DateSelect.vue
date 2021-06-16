<template>
  <a-popover trigger="click" v-model="visible" placement="bottomLeft" overlayClassName="date-pop">
    <TwoValue :title="showDate" :subtitle="title" class="btn">
      <i class="iconfont" :class="icon"></i>
    </TwoValue>
      <template slot="content">
        <a-calendar :fullscreen="false" @select="handleSelect" :value="mValue" />
      </template>
  </a-popover>
</template>

<script>
  import TwoValue from "./TwoValue";
  import moment from "moment";

  export default {
    name: "DateSelect",
    props: ['title', 'icon', 'value'],
    components: {TwoValue},
    data() {
      return {
        // date: null,
        visible: false,
      }
    },
    computed: {
      showDate() {
        if (!this.value)
          return '----';
        return moment(this.value).format('MM月DD日');
      },
      mValue() {
        if (!this.value)
          return null;
        return moment(this.value);
      }
    },
    methods: {
      handleSelect(val) {
        // this.date = val;
        this.visible = false;
        this.$emit('select', val.toDate());
      }
    }
  }
</script>

<style lang="scss" scoped>
.btn {
  cursor: default;
}
</style>

<style>
  .date-pop {
    width: 290px;
  }
</style>
