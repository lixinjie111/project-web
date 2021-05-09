<template>
  <a-button @click="emit('click')">
    <slot />
  </a-button>
</template>

<script>
  export default {
    name: "FlatButton"
  }
</script>

<style scoped>

</style>
