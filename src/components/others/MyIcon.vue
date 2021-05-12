<template>
  <span class="iconfont" :class="iconName">+</span>
</template>

<script>
  export default {
    name: "MyIcon",
    props: ['name'],
    computed: {
      iconName() {
        return 'icon-' + this.name;
      }
    }
  }
</script>

<style scoped>

</style>
