<template>
  <span :class="'priority'+(parseInt(value)+1)" @click="$emit('click')">{{ prioritis[value] }}</span>
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
      return { // （0：低，1：中，2：高）
        prioritis: [
          '低',
          '中',
          '高',
        ],
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bgColors: #DFF8F6, #D3E3FF, #FEDFE1;
  $colors: #1DCEC3, #2373FF, #FF4C60;
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
      cursor: default;
    }
  }
</style>
