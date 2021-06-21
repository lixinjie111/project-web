<template>
  <span :class="'priority'+(parseInt(value)+1)" @click="$emit('click')">{{ prioritis[value] }}</span>
</template>

<script>
  import {taskPriorities} from "@/const/data";

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
        prioritis: taskPriorities,
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
  $colors: $priority-font;
  @each $color in $colors {
    $i: index($colors, $color);
    .priority#{$i} {
      display: inline-block;
      width: 36px;
      height: 24px;
      border-radius: 2px;
      border: 1px solid $color;
      color: $color;
      text-align: center;
      line-height: 24px;
      cursor: default;
    }
  }
</style>
