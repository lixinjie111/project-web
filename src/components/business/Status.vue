<template>
  <span :class="'status'+(parseInt(value) + 1)"><i class="iconfont" :class="icons[value]"></i>{{ taskStatuses[value] }}</span>
</template>

<script>
  import {taskStatuses} from "@/const/data";

  export default {
    name: "Status",
    props: {
      value: {
        type: Number,
        default: 0,
      }
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
    }
  }
</script>

<style lang="scss" scoped>
  $bgColors: #F4F7FC, #FFE6DE, #D8F3E7, #FEDFE1, #FFF6DC;
  $colors: #242F57,#FE774B,#08BD6C,#FF4C60,#EDBA1D;
  @each $bg in $bgColors {
    $i: index($bgColors, $bg);
    .status#{$i} {
      display: inline-block;
      width: 72px;
      height: 24px;
      background: $bg;
      border-radius: 2px;
      color: nth($colors, $i);
      text-align: center;
      line-height: 24px;
      cursor: default;
    }
  }

  .iconfont {
    margin-right: 4px;
  }
</style>
