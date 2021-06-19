<template>
  <a-date-picker :value="mValue" @change="handleSelect" :disabledDate="disabledDate">
    <TwoValue :title="showDate" :subtitle="title" class="btn">
      <i class="iconfont" :class="icon"></i>
    </TwoValue>
  </a-date-picker>
</template>

<script>
  import TwoValue from "./TwoValue";
  import moment from "moment";

  export default {
    name: "DateSelect",
    props: ['title', 'icon', 'value', 'range'], // range: {begin, end}
    components: {TwoValue},
    data() {
      return {
        // date: null,
        // visible: false,
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
        // this.visible = false;
        this.$emit('select', val.toDate());
      },
      disabledDate(val) {
        if (this.range) {
          if (this.range.begin)
            return val.isBefore(this.range.begin, 'day');
          else if (this.range.end)
            return val.isAfter(this.range.end, 'day');
        }
        return false;
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
