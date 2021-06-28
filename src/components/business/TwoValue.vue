<template>
  <div class="two-v">
    <div class="icon">
      <slot />
    </div>
    <div class="cont">
      <div :class="['title',title=='-'?'empty':'']">{{title}}</div>
      <div class="subtitle" v-if="subtitle">{{subtitle}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TwoValue",
    props: ['title', 'subtitle'],
  }
</script>

<style lang="scss" scoped>
  .two-v {
    display: flex;
    align-items: center;
  }
.cont {
  margin-left: 8px;
  .title {
    height: 18px;
    font-size: 14px;
    color: #242F57;
    line-height: 18px;

    &.empty {
      color: #7c88b1;
    }
  }
  .subtitle {
    height: 16px;
    font-size: 12px;
    color: #97A0C3;
    line-height: 16px;
  }
}
</style>
