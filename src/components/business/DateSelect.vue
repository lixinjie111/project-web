<template>
  <a-date-picker :value="mValue" @change="handleSelect" :disabledDate="disabledDate" v-bind="$attrs">
    <TwoValue :title="showDate" :subtitle="title" class="btn" v-if="!original">
      <i class="iconfont" :class="icon"></i>
    </TwoValue>
  </a-date-picker>
</template>

<script>
  import TwoValue from "./TwoValue";
  import moment from "moment";

  export default {
    name: "DateSelect",
    props: ['title', 'icon', 'value', 'range', 'original'], // range: {begin, end}   original: 使用原生的日期选择控件
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

<style lang="scss">
  .date-pop {
    width: 290px;
  }
  .btn {
    .icon {
      width: 36px;
      height: 36px;
      border: 1px solid #EAEDF7;
      border-radius: 18px;
      display: flex;
      justify-content: center;
      align-items: center;

    }
    &:hover {
      .icon {
        border-color: #0064FF;
      }
      .iconfont {
        color: #0064FF;
      }
    }
    .iconfont {
      color: #C6CBDE;
    }
  }
</style>
