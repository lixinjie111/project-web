<template>
  <button class="wrapper" @click="$emit('click')">
    <div class="circle">
      <i class="iconfont iconjia"></i>
    </div>
    <div class="slot" v-if="$slots.length > 0">
      <slot />
    </div>
  </button>
</template>

<script>
  export default {
    name: "CircleButton"
  }
</script>

<style scoped>
  .wrapper {
    display: inline-flex;
    /*justify-content: space-evenly;*/
    align-items: center;
    font-size: 14px;
    border: none;
    outline: none;
    background: transparent;
    padding: 0;
  }
  .slot {
    margin-left: 8px;
  }
.circle {
  width: 32px;
  height: 32px;
  line-height: 32px;
  border: 1px dashed #C6CBDE;
  border-radius: 16px;
  text-align: center;
}
</style>
