<template>
  <span :class="'priority'+(parseInt(value) + 1)">{{ prioritis[value] }}</span>
</template>

<script>
  export default {
    name: "Priority",
    props: {
      value: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        prioritis: [
          '高',
          '中',
          '低',
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bgColors: #FEDFE1, #D3E3FF, #DFF8F6;
  $colors: #FF4C60, #2373FF, #1DCEC3;
  @each $bg in $bgColors {
    $i: index($bgColors, $bg);
    .priority#{$i} {
      display: inline-block;
      width: 36px;
      height: 24px;
      border-radius: 2px;
      border: 1px solid $bg;
      color: nth($colors, $i);
      text-align: center;
      line-height: 24px;
    }
  }
</style>
