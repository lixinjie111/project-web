<template>
  <a-button class="flat-button" type="link" @click="emit('click')">
    <slot name="icon"/>
    <slot />
  </a-button>
</template>

<script>
  export default {
    name: "FlatButton"
  }
</script>

<style lang="scss">
  .flat-button {
    color: #636E95;
    .iconfont {
      margin-right: 6px;
    }
  }
</style>
