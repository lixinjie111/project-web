<template>
  <a-dropdown :trigger="['click']" overlay-class-name="status-menu">
    <TwoValue :title="taskStatuses[value]" subtitle="当前状态">
      <span :class="'status'+(parseInt(value) + 1)">
        <i class="iconfont" :class="icons[value]"></i>
      </span>
    </TwoValue>
    <a-menu slot="overlay" @click="handleSelect">
      <a-menu-item v-for="(prio,index) in taskStatuses" :key="index">
        <Status :value="index"/>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
  import TwoValue from "./TwoValue";
  import Status from "@/components/business/Status";
  import {taskStatuses} from "@/const/data";

  export default {
    name: "StatusSelect",
    components: {Status, TwoValue},
    props: {
      value: Number,
    },
    data() {
      return {
        icons: [
          'iconjianshao',
          'iconshijian',
          'iconxiaoyan',
          'iconlishijilu',
          'iconzanting',
        ],
        taskStatuses
      }
    },
    methods: {
      handleSelect(e) {
        this.$emit('input', e.key);
        this.$emit('change', e.key);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.two-v {
  // $colors: #242F57, #FE774B, #08BD6C, #FF4C60, black;
  $colors: $status-font;
  @each $color in $colors {
    $i: index($colors, $color);
    .status#{$i} {
      display: inline-block;
      width: 36px;
      height: 36px;
      /*border-radius: 2px;*/
      color: $color;
      text-align: center;
      line-height: 36px;
      cursor: default;

      .iconfont {
        font-size: 36px;
    }
  }
}
}
.row {
  margin: 6px 0;
}
</style>
<style lang="scss">
  .status-menu {
    .ant-dropdown-menu {
      padding: 6px;
    }
  }
</style>
